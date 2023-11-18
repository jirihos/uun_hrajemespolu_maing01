"use strict";
const HrajemespoluMainAbl = require("../../abl/hrajemespolu-main-abl.js");

class HrajemespoluMainController {
  init(ucEnv) {
    return HrajemespoluMainAbl.init(ucEnv.getUri(), ucEnv.getDtoIn(), ucEnv.getSession());
  }

  load(ucEnv) {
    return HrajemespoluMainAbl.load(ucEnv.getUri(), ucEnv.getSession());
  }

  loadBasicData(ucEnv) {
    return HrajemespoluMainAbl.loadBasicData(ucEnv.getUri(), ucEnv.getSession());
  }
}

module.exports = new HrajemespoluMainController();
