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

const Update = {
  UC_CODE: `${GALLERY_ERROR_PREFIX}update/`,
  
  InvalidDtoIn: class extends HrajemespoluMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },

  GalleryDoesNotExist: class extends HrajemespoluMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}galleryDoesNotExist`;
      this.message = "Gallery does not exist.";
    }
  }
};

const Delete = {
  UC_CODE: `${GALLERY_ERROR_PREFIX}delete/`,

  InvalidDtoIn: class extends HrajemespoluMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },

  GalleryDoesNotExist: class extends HrajemespoluMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}galleryDoesNotExist`;
      this.message = "Gallery does not exist.";
    }
  }
  
};

module.exports = {
  Delete,
  Update,
  Get,
  Create
};
