"use strict";
const Path = require("path");
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../api/errors/review-error.js");
const Warnings = require("../api/warnings/review-warning.js");

class ReviewAbl {

  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("review");
    this.sportsFieldDao = DaoFactory.getDao("sportsField");
  }

  async listBySportsField(awid, dtoIn) {

    let uuAppErrorMap = {};


    //validace dtoin
    const validationResult = this.validator.validate("reviewListTypes", dtoIn)

    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      uuAppErrorMap,
      Warnings.list.UnsupportedKeys.code,
      Errors.list.InvalidDtoIn
    );

    if (!dtoIn.pageInfo) { 
      dtoIn.pageInfo = {};
      dtoIn.pageInfo.pageIndex = 0;
      dtoIn.pageInfo.pageSize = 10;
  }


    //kontrola existence sportsField
    let sportsField = await this.sportsFieldDao.get(awid, dtoIn.sportsFieldId);
    // if (!sportsField) {
    //   throw new Errors.list.SportsFieldDoesNotExist({ uuAppErrorMap }, { sportsFieldId: dtoIn.sportsFieldId });
    // }

    let itemList = await this.dao.listBySportsField(awid, dtoIn.sportsFieldId, dtoIn.pageInfo);

    let dtoOut = {...itemList, uuAppErrorMap}
    
    return dtoOut;

  }

}

module.exports = new ReviewAbl();
