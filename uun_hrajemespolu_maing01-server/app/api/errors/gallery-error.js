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

const Get = {
  UC_CODE: `${GALLERY_ERROR_PREFIX}get/`,
  InvalidDtoIn: class extends HrajemespoluMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },

  GalleryDoesNotExist: class extends HrajemespoluMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}galleryDoesNotExist`;
      this.message = "Gallery does not exist.";
    }
  }
};

module.exports = {
  Get,
  Create
};
