"use strict";
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const moment = require("moment");
const Errors = require("../api/errors/reservation-error.js");
const Warnings = require("../api/warnings/reservation-warning.js");
const Constants = require("../constants.js");

class ReservationAbl {
  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("reservation");
    this.sportsFieldDao = DaoFactory.getDao("sportsField");
  }

  async listOwn(awid, dtoIn, session) {

    let uuAppErrorMap = {};
    
    // validation of dtoIn
    const validationResult = this.validator.validate("reservationListOwnDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      uuAppErrorMap,
      Warnings.ListOwn.UnsupportedKeys.code,
      Errors.ListOwn.InvalidDtoIn
    );

    // default pageInfo
    if (!dtoIn.pageInfo) { 
      dtoIn.pageInfo = {};
    }
    if (!dtoIn.pageInfo.pageIndex) {
      dtoIn.pageInfo.pageIndex = 0;
    }
    if (!dtoIn.pageInfo.pageSize) {
      dtoIn.pageInfo.pageSize = 25;
    }

    let itemList = await this.dao.listByUuIdentity(awid, session.getIdentity().getUuIdentity(), dtoIn.pageInfo );

    let dtoOut = {...itemList,  uuAppErrorMap}

    return dtoOut;
  }

  async create(awid, dtoIn, session) {
    let uuAppErrorMap = {};

    // validation of dtoIn
    const validationResult = this.validator.validate("reservationCreateDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      uuAppErrorMap,
      Warnings.Create.UnsupportedKeys.code,
      Errors.Create.InvalidDtoIn
    );

    // Verify that sports field exists
    let sportsField = await this.sportsFieldDao.get(awid, dtoIn.sportsFieldId);
    if (!sportsField) {
      throw new Errors.Create.SportsFieldDoesNotExist({ uuAppErrorMap }, { sportsFieldId: dtoIn.sportsFieldId });
    }

    let startMoment = moment(dtoIn.startTs);
    let endMoment = moment(dtoIn.endTs);

    // Check that dtoIn.startTs is earlier than dtoIn.endTs
    if (!startMoment.isBefore(endMoment)) {
      throw new Errors.Create.EndTsCannotBeSameOrBeforeStartTs(
        { uuAppErrorMap },
        { startTs: dtoIn.startTs, endTs: dtoIn.endTs }
      );
    }

    // Check that the reservation is upcoming. dtoIn.startTs should be in the future.
    if (startMoment.isBefore()) {
      throw new Errors.Create.StartTsCannotBeInPast(
        { uuAppErrorMap },
        { startTs: dtoIn.startTs, currentTs: moment().toISOString() }
      );
    }

    // Validate that timestamps are rounded to half an hour
    if (startMoment.valueOf() % Constants.HALF_HOUR_MILLISECONDS !== 0 ||
        endMoment.valueOf() % Constants.HALF_HOUR_MILLISECONDS !== 0) {
      throw new Errors.Create.TimestampNotRounded({ uuAppErrorMap });
    }

    // Check that the duration of the reservation is not longer than MAX_RESERVATION_DURATION hours.
    let duration = endMoment.diff(startMoment, "hours", true);
    if (duration > Constants.MAX_RESERVATION_DURATION) {
      throw new Errors.Create.DurationIsTooLong({ uuAppErrorMap }, { startTs: dtoIn.startTs, endTs: dtoIn.endTs });
    }

    // Check that the reservation doesn't overlap with any existing reservation for the same sports field.
    let overlapsCount = await this.dao.countOverlaps(awid, dtoIn.sportsFieldId, startMoment.toDate(), endMoment.toDate());
    if (overlapsCount > 0) {
      throw new Errors.Create.ReservationOverlaps({ uuAppErrorMap });
    }

    // Call reservation DAO create
    dtoIn.awid = awid;
    dtoIn.uuIdentity = session.getIdentity().getUuIdentity();
    dtoIn.startTs = startMoment.toDate();
    dtoIn.endTs = endMoment.toDate();
    dtoIn.state = "valid";
    dtoIn.cancelReason = "";
    let reservation = await this.dao.create(dtoIn);

    let dtoOut = { ...reservation, uuAppErrorMap };
    return dtoOut;
  }
}

module.exports = new ReservationAbl();
