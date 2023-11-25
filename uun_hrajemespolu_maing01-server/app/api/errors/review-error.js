"use strict";

const HrajemespoluMainUseCaseError = require("./hrajemespolu-main-use-case-error.js");
const REVIEW_ERROR_PREFIX = `${HrajemespoluMainUseCaseError.ERROR_PREFIX}review/`;

const list = {
  UC_CODE: `${REVIEW_ERROR_PREFIX}list/`,
  


InvalidDtoIn: class extends HrajemespoluMainUseCaseError {
  constructor() {
    super(...arguments);
    this.code = `${list.UC_CODE}invalidDtoIn`;
    this.message = "DtoIn is not valid.";
  }
},

SportsFieldDoesNotExist: class extends HrajemespoluMainUseCaseError {
  constructor() {
    super(...arguments);
    this.code = `${list.UC_CODE}sportsFieldDoesNotExist`;
    this.message = "Sports field does not exist.";
  }
}

};

module.exports = {
  list
};
