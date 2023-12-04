"use strict";
const SportsFieldAbl = require("../../abl/sports-field-abl.js");

class SportsFieldController {

  get(ucEnv) {
    return SportsFieldAbl.get(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

}

module.exports = new SportsFieldController();
