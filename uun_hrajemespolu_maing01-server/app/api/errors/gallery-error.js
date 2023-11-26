"use strict";

const HrajemespoluMainUseCaseError = require("./hrajemespolu-main-use-case-error.js");
const GALLERY_ERROR_PREFIX = `${HrajemespoluMainUseCaseError.ERROR_PREFIX}gallery/`;

const Create = {
  UC_CODE: `${GALLERY_ERROR_PREFIX}create/`,

  InvalidDtoIn: class extends HrajemespoluMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  }
  
};

module.exports = {
  Create
};
