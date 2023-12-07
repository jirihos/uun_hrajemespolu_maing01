"use strict";
const Path = require("path");
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../api/errors/sports-field-error.js");

const WARNINGS = {

};

class SportsFieldAbl {

  constructor() {
    this.validator = Validator.load();
    // this.dao = DaoFactory.getDao("sportsField");
  }

  async create(awid, dtoIn) {
    
  }

  async get(awid, dtoIn) {
    
  }

}

module.exports = new SportsFieldAbl();
