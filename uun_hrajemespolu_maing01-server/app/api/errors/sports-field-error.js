"use strict";

const HrajemespoluMainUseCaseError = require("./hrajemespolu-main-use-case-error.js");
const SPORTS_FIELD_ERROR_PREFIX = `${HrajemespoluMainUseCaseError.ERROR_PREFIX}sportsField/`;

const Get = {
  UC_CODE: `${SPORTS_FIELD_ERROR_PREFIX}get/`,
  InvalidDtoIn: class extends HrajemespoluMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  SportsFieldDoesNotExist: class extends HrajemespoluMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}sportsFieldDoesNotExist`;
      this.message = "Sports field does not exist.";
    }
  },
  
};

const Create = {
  UC_CODE: `${SPORTS_FIELD_ERROR_PREFIX}create/`,
  InvalidDtoIn: class extends HrajemespoluMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  
};



const List = {
  UC_CODE: `${SPORTS_FIELD_ERROR_PREFIX}list/`,
  
  InvalidDtoIn: class extends HrajemespoluMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${List.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
};

module.exports = {
  List,
  Create,
  Get
};
