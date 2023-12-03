"use strict";
const Path = require("path");
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../api/errors/gallery-error.js");
const Warnings = require("../api/warnings/gallery-warning.js");

class GalleryAbl {

  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("gallery");
  }

  async get(awid, dtoIn) {

    let uuAppErrorMap = {};

    const validationResult = this.validator.validate("galleryGetDtoInType", dtoIn)

    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      uuAppErrorMap,
      Warnings.Get.UnsupportedKeys.code,
      Errors.Get.InvalidDtoIn
    );

    let gallery = await this.dao.get(awid, dtoIn.id)

    if (!gallery) {
      throw new Errors.Get.GalleryDoesNotExist({ uuAppErrorMap }, { galleryId: dtoIn.id });
    }

    const dtoOut = {gallery, uuAppErrorMap};

    return dtoOut;

  }

  async create(awid, dtoIn) {

    let uuAppErrorMap = {};


    //validace dtoin
    const validationResult = this.validator.validate("galleryCreateTypes", dtoIn)

    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      uuAppErrorMap,
      Warnings.Create.UnsupportedKeys.code,
      Errors.Create.InvalidDtoIn
    );

    dtoIn = {
      awid: awid,
      images: dtoIn.images,
    }

    let newImage = await this.dao.create(dtoIn)

    const dtoOut = { ...newImage, uuAppErrorMap };
    return dtoOut;
  }

}

module.exports = new GalleryAbl();
