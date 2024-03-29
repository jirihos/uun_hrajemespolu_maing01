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

  async cancelByUser(awid, dtoIn) {
    let uuAppErrorMap = {};

    // validation of dtoIn
    const validationResult = this.validator.validate("reservationCancelByUserDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      uuAppErrorMap,
      Warnings.CancelByUser.UnsupportedKeys.code,
      Errors.CancelByUser.InvalidDtoIn
    );

    let reservation = await this.dao.get(awid, dtoIn.id);
    if (!reservation) {
      throw new Errors.CancelByUser.reservationDoesNotExist({ uuAppErrorMap }, { reservationId: dtoIn.id });
    }
    let uuObject = {awid, id: dtoIn.id, state: "cancelledByUser", cancelReason: ""} 
    
    let reservationUpdate = await this.dao.update(uuObject)

    let dtoOut = { ...reservationUpdate, uuAppErrorMap}
    return dtoOut
  }

  async cancelByAdmin(awid, dtoIn) {
    let uuAppErrorMap = {};

    // validation of dtoIn
    const validationResult = this.validator.validate("reservationCancelByAdminTypes", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      uuAppErrorMap,
      Warnings.CancelByAdmin.UnsupportedKeys.code,
      Errors.CancelByAdmin.InvalidDtoIn
    );

    let reservation = await this.dao.getById(awid, dtoIn.id);

    if (!reservation) {
      throw new Errors.CancelByAdmin.ReservationNotFound({ uuAppErrorMap }, { id: dtoIn.id });
    } else if (reservation.state === "cancelledByUser" || reservation.state === "cancelledByAdmin") {
      throw new Errors.CancelByAdmin.ReservationAlreadyCancelled({ uuAppErrorMap }, { id: dtoIn.id })
    }

    let cancelledReservation = await this.dao.cancelByAdmin(awid, dtoIn.id, reservation, dtoIn.cancelReason)
    
    let dtoOut = {...cancelledReservation, uuAppErrorMap}

    return dtoOut;
  }

  async listBySportsField(awid, dtoIn, authorizationResult) {
    let isExecutive = authorizationResult.getAuthorizedProfiles().includes(Constants.EXECUTIVES_PROFILE);
    let uuAppErrorMap = {};

    // validation of dtoIn
    const validationResult = this.validator.validate("reservationListBySportsFieldDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      uuAppErrorMap,
      Warnings.ListBySportsField.UnsupportedKeys.code,
      Errors.ListBySportsField.InvalidDtoIn
    );

    // default values
    dtoIn.fromTs ??= new Date();
    dtoIn.toTs ??= Constants.MAX_DATE;

    dtoIn.loadFull ??= false;

    dtoIn.state ??= "valid";

    if (!dtoIn.pageInfo) { 
      dtoIn.pageInfo = {};
    }
    if (!dtoIn.pageInfo.pageIndex) {
      dtoIn.pageInfo.pageIndex = 0;
    }
    if (!dtoIn.pageInfo.pageSize) {
      dtoIn.pageInfo.pageSize = 25;
    }

    // verify that sports field exists
    let sportsField = await this.sportsFieldDao.get(awid, dtoIn.sportsFieldId);
    if (!sportsField) {
      throw new Errors.ListBySportsField.SportsFieldDoesNotExist({ uuAppErrorMap }, { sportsFieldId: dtoIn.sportsFieldId });
    }

    let fromMoment = moment(dtoIn.fromTs);
    let toMoment = moment(dtoIn.toTs);

    // Check that dtoIn.fromTs is earlier than dtoIn.toTs
    if (!fromMoment.isBefore(toMoment)) {
      throw new Errors.ListBySportsField.ToTsCannotBeSameOrBeforeFromTs(
        { uuAppErrorMap },
        { fromTs: dtoIn.fromTs, toTs: dtoIn.toTs }
      );
    }

    // verify permissions
    if (!isExecutive) {
      if (dtoIn.loadFull) {
        throw new Errors.ListBySportsField.UserNotAuthorized(
          { uuAppErrorMap },
          { loadFull: dtoIn.loadFull }
        );
      }
      if (dtoIn.state !== "valid") {
        throw new Errors.ListBySportsField.UserNotAuthorized(
          { uuAppErrorMap },
          { state: dtoIn.state }
        );
      }
    }

    // load reservations
    let state = dtoIn.state !== "all" ? dtoIn.state : undefined;
    let reservations = await this.dao.listBySportsField(awid, dtoIn.sportsFieldId, state, new Date(dtoIn.fromTs), new Date(dtoIn.toTs), dtoIn.pageInfo);

    if (!dtoIn.loadFull) {
      reservations.itemList.forEach((reservation) => {
        delete reservation.uuIdentity;
        delete reservation.cancelReason;
      });
    }

    let dtoOut = { ...reservations,  uuAppErrorMap }
    return dtoOut;
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

    let reservations = await this.dao.listByUuIdentity(awid, session.getIdentity().getUuIdentity(), dtoIn.pageInfo);

    // add sportsFieldName
    let sportsFieldMap = {};
    for (let reservation of reservations.itemList) {
      let { sportsFieldId } = reservation;
      let sportsField = sportsFieldMap[sportsFieldId];

      if (sportsField === undefined) {
        let uuObject = await this.sportsFieldDao.get(awid, sportsFieldId);
        if (uuObject === undefined) {
          uuObject = null;
        }

        sportsFieldMap[sportsFieldId] = uuObject;
        sportsField = uuObject;
      }

      let { sportsFieldName } = sportsField;

      if (!sportsFieldName) {
        sportsFieldName = null;
      }

      reservation.sportsFieldName = sportsFieldName;
    }

    let dtoOut = { ...reservations,  uuAppErrorMap };

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

    // Check whether the reservation is max one year away
    if (endMoment.diff(moment(), "years") >= 1) {
      throw new Errors.Create.MoreThanYearAway({ uuAppErrorMap }, { endTs: dtoIn.endTs });
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

    // Check that the reservation is within open hours
    if (startMoment.hours() < Constants.OPEN_HOURS_FROM ||
        endMoment.clone().subtract("1", "milliseconds").hours() >= Constants.OPEN_HOURS_TO ) {
      throw new Errors.Create.ReservationOutsideOpenHours({ uuAppErrorMap }, { startTs: dtoIn.startTs, endTs: dtoIn.endTs });
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
