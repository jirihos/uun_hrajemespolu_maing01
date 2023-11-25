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
  }

  async list(awid, dtoIn) {

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

    return await this.dao.list(awid, dtoIn.sportsFieldId);

  }

}

module.exports = new ReviewAbl();
