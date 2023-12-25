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

  async delete(awid, dtoIn) {
    let uuAppErrorMap = {};

    //validace dtoin
    const validationResult = this.validator.validate("reviewDeleteTypes", dtoIn);

    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      uuAppErrorMap,
      Warnings.Delete.UnsupportedKeys.code,
      Errors.Delete.InvalidDtoIn,
    );

    let review = await this.dao.get(awid, dtoIn.id);

    if (!review) {
      throw new Errors.Delete.ReviewDoesNotExist({ uuAppErrorMap }, { id: dtoIn.id });
    }

    await this.dao.delete(awid, dtoIn.id);

    let dtoOut = { uuAppErrorMap };

    return dtoOut;
  }

  async getByUser(awid, dtoIn) {
    let uuAppErrorMap = {};

    //validace dtoin
    const validationResult = this.validator.validate("reviewGetByUserTypes", dtoIn);

    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      uuAppErrorMap,
      Warnings.getByUser.UnsupportedKeys.code,
      Errors.getByUser.InvalidDtoIn,
    );

    //kontrola existence sportsField
    let sportsField = await this.sportsFieldDao.get(awid, dtoIn.sportsFieldId);

    if (!sportsField) {
      throw new Errors.getByUser.SportsFieldDoesNotExist({ uuAppErrorMap }, { sportsFieldId: dtoIn.sportsFieldId });
    }

    let reviewList = await this.dao.getByUser(awid, dtoIn.sportsFieldId, dtoIn.uuIdentity);

    if (!reviewList) {
      throw new Errors.getByUser.ReviewDoesNotExist(
        { uuAppErrorMap },
        { sportsFieldId: dtoIn.sportsFieldId, uuIdentity: dtoIn.uuIdentity },
      );
    }

    let dtoOut = { ...reviewList, uuAppErrorMap };

    return dtoOut;
  }

  async create(awid, dtoIn) {
    let uuAppErrorMap = {};

    // Validace dtoIn
    const validationResult = this.validator.validate("reviewCreateDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      uuAppErrorMap,
      Warnings.Create.UnsupportedKeys.code,
      Errors.Create.InvalidDtoIn,
    );

    // Kontrola jestli existuje sportsField
    let sportsField;
    try {
      sportsField = await this.sportsFieldDao.get(awid, dtoIn.sportsFieldId);
    } catch (e) {
      throw new Errors.Create.SportsFieldDoesNotExist({ uuAppErrorMap }, { sportsFieldId: dtoIn.sportsFieldId });
    }

    // Kontrola, jestli je text recenze prázdný nebo null
    if (!dtoIn.text) {
      throw new Errors.Create.ReviewTextEmpty({ uuAppErrorMap });
    }

    // Vytvoření objektu pro vložení do databáze
    const reviewToCreate = {
      awid,
      sportsFieldId: dtoIn.sportsFieldId,
      text: dtoIn.text,
      rating: dtoIn.rating,
    };

    let newReview = await this.dao.create(reviewToCreate);

    const dtoOut = { ...newReview, uuAppErrorMap };
    return dtoOut;
  }

  async list(awid, dtoIn) {
    let uuAppErrorMap = {};

    //validace dtoin
    const validationResult = this.validator.validate("reviewListTypes", dtoIn);

    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      uuAppErrorMap,
      Warnings.list.UnsupportedKeys.code,
      Errors.list.InvalidDtoIn,
    );

    if (!dtoIn.pageInfo) {
      dtoIn.pageInfo = {};
    }
    if (!dtoIn.pageInfo.pageIndex) {
      dtoIn.pageInfo.pageIndex = 0;
    }
    if (!dtoIn.pageInfo.pageSize) {
      dtoIn.pageInfo.pageSize = 10;
    }

    //kontrola existence sportsField
    let sportsField = await this.sportsFieldDao.get(awid, dtoIn.sportsFieldId);
    /* TODO odebrat komentáře */
    // if (!sportsField) {
    //   throw new Errors.list.SportsFieldDoesNotExist({ uuAppErrorMap }, { sportsFieldId: dtoIn.sportsFieldId });
    // }

    let itemList = await this.dao.listBySportsField(awid, dtoIn.sportsFieldId, dtoIn.pageInfo);

    let dtoOut = { ...itemList, uuAppErrorMap };

    return dtoOut;
  }
}

module.exports = new ReviewAbl();
