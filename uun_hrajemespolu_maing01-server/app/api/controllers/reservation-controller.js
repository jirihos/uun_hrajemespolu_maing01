"use strict";
const ReservationAbl = require("../../abl/reservation-abl.js");

class ReservationController {

  listBySportsField(ucEnv) {
    return ReservationAbl.listBySportsField(ucEnv.getUri().getAwid(), ucEnv.getDtoIn(), ucEnv.getAuthorizationResult());
  }

  listOwn(ucEnv) {
    return ReservationAbl.listOwn(ucEnv.getUri().getAwid(), ucEnv.getDtoIn(), ucEnv.getSession());
  }
  create(ucEnv) {
    return ReservationAbl.create(ucEnv.getUri().getAwid(), ucEnv.getDtoIn(), ucEnv.getSession());
  }
}

module.exports = new ReservationController();
