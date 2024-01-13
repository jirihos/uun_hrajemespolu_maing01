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
    this.galleryDao = DaoFactory.getDao("gallery");
  }

  async delete(awid, dtoIn) {
    let uuAppErrorMap = {};

    // validation of dtoIn
    const validationResult = this.validator.validate("sportsFieldDeleteDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      uuAppErrorMap,
      Warnings.Delete.UnsupportedKeys.code,
      Errors.Delete.InvalidDtoIn
    );

    let sportsField = await this.dao.get(awid, dtoIn.id);

    if (!sportsField) {
      throw new Errors.Delete.SportsFieldDoesNotExist({ uuAppErrorMap }, { sportsFieldId: dtoIn.id });
    }

    await this.dao.delete(sportsField);

    return { uuAppErrorMap };


  }

  async list(awid, dtoIn) {
    let uuAppErrorMap = {};

    // validation of dtoIn
    const validationResult = this.validator.validate("sportsFieldListDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      uuAppErrorMap,
      Warnings.List.UnsupportedKeys.code,
      Errors.List.InvalidDtoIn
    );

    // default values
    if (!dtoIn.pageInfo) {
      dtoIn.pageInfo = {};
    }
    if (!dtoIn.pageInfo.pageIndex) {
      dtoIn.pageInfo.pageIndex = 0;
    }
    if (!dtoIn.pageInfo.pageSize) {
      dtoIn.pageInfo.pageSize = 30;
    }

    let sportsFields = await this.dao.list(awid, dtoIn.pageInfo);

    let galleryMap = {};
    for (let sportsField of sportsFields.itemList) {
      let { galleryId } = sportsField;
      let gallery = galleryMap[galleryId];

      if (gallery === undefined) {
        let uuObject = await this.galleryDao.get(awid, galleryId);
        if (uuObject === undefined) {
          uuObject = null;
        }

        galleryMap[galleryId] = uuObject;
        gallery = uuObject;
      }

      let images = gallery?.images;
      let firstImage = images && images[0];

      if (!firstImage) {
        firstImage = null;
      }

      sportsField.firstImage = firstImage;
    }


    return { ...sportsFields, uuAppErrorMap };
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

    // Verify that gallery exists
    let gallery = await this.galleryDao.get(awid, dtoIn.galleryId);
    if (!gallery) {
      throw new Errors.Create.GalleryDoesNotExist({ uuAppErrorMap }, { galleryId: dtoIn.galleryId });
    }

    // Call sportsField DAO create
    dtoIn.awid = awid;
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
