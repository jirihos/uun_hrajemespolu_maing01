"use strict";
const SportsFieldAbl = require("../../abl/sports-field-abl.js");

class SportsFieldController {

  list(ucEnv) {
    return SportsFieldAbl.list(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  create(ucEnv) {
    return SportsFieldAbl.create(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  get(ucEnv) {
    return SportsFieldAbl.get(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

}

module.exports = new SportsFieldController();
