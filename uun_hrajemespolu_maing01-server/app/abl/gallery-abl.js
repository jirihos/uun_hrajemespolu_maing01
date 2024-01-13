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

  async delete(awid, dtoIn) {
    let uuAppErrorMap = {};

    const validationResult = this.validator.validate("galleryDeleteDtoInType", dtoIn)

    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      uuAppErrorMap,
      Warnings.Delete.UnsupportedKeys.code,
      Errors.Delete.InvalidDtoIn
    );

    let gallery = await this.dao.get(awid, dtoIn.id)

    if (!gallery) {
      throw new Errors.Delete.GalleryDoesNotExist({ uuAppErrorMap }, { galleryId: dtoIn.id });
    }

    await this.dao.delete(gallery);

    return { uuAppErrorMap };
    
  }

  async update(awid, dtoIn) {
    // validation of dtoIn
    const validationResult = this.validator.validate("galleryUpdateDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      uuAppErrorMap,
      Warnings.Update.UnsupportedKeys.code,
      Errors.Update.InvalidDtoIn
    );

    // Verify that gallery exists
    let gallery = await this.dao.get(awid, dtoIn.id);
    if (!gallery) {
      throw new Errors.Update.GalleryDoesNotExist({ uuAppErrorMap }, { galleryId: dtoIn.id });
    }

    // Update gallery
    gallery.images = dtoIn.images;
    gallery = await this.dao.update(gallery);

    const dtoOut = { ...gallery, uuAppErrorMap };
    return dtoOut;
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

    const dtoOut = { ...gallery, uuAppErrorMap };

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
