"use strict";
const Path = require("path");
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../api/errors/sports-field-error.js");
const Warnings = require("../api/warnings/sports-field-warning.js");
const Constants = require("../constants.js");


class SportsFieldAbl {

  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("sportsField");
  }

  async create(awid, dtoIn) {

    let uuAppErrorMap = {};

    //validace dtoin
    const validationResult = this.validator.validate("sportsFieldCreateDtoInType", dtoIn);
    
    uuAppErrorMap = ValidationHelper.processValidationResult(
        dtoIn,
        validationResult,
        uuAppErrorMap,
        Warnings.Create.UnsupportedKeys.code,
        Errors.Create.InvalidDtoIn
    );

    // Call sportsField DAO create
    dtoIn.awid = awid;
    // dtoIn.sportsFieldName: "Tenisový kurt 1"; // jméno sportoviště
    // dtoIn.sportsFieldDesc: "Nejlepší tenisový kurt široko daleko.", // popis sportoviště
    // dtoIn.galleryId: "123456789", //id galerií obrázků pro sportoviště
    let sportsField = await this.dao.create(dtoIn);

    let dtoOut = { ...sportsField, uuAppErrorMap };
    return dtoOut;
  }

  async get(awid, dtoIn) {
    let uuAppErrorMap = {};

    //validace dtoin
    const validationResult = this.validator.validate("sportsFieldGetDtoInType", dtoIn);
    
    uuAppErrorMap = ValidationHelper.processValidationResult(
        dtoIn,
        validationResult,
        uuAppErrorMap,
        Warnings.Get.UnsupportedKeys.code,
        Errors.Get.InvalidDtoIn
    );
   // Verify that sports field exists
    let sportsField = await this.dao.get(awid, dtoIn.id);
    if (!sportsField) {
      throw new Errors.Get.SportsFieldDoesNotExist({ uuAppErrorMap }, { sportsFieldId: dtoIn.id });
    }
    let dtoOut = { ...sportsField, uuAppErrorMap };
    return dtoOut;
  }

}

module.exports = new SportsFieldAbl();
