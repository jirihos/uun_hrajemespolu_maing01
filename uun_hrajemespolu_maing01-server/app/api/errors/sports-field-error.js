"use strict";

const HrajemespoluMainUseCaseError = require("./hrajemespolu-main-use-case-error.js");
const SPORTS_FIELD_ERROR_PREFIX = `${HrajemespoluMainUseCaseError.ERROR_PREFIX}sportsField/`;

const Get = {
  UC_CODE: `${SPORTS_FIELD_ERROR_PREFIX}get/`,
  
};

module.exports = {
  Get
};
