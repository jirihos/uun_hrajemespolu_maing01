"use strict";
const ReservationAbl = require("../../abl/reservation-abl.js");

class ReservationController {
  create(ucEnv) {
    return ReservationAbl.create(ucEnv.getUri().getAwid(), ucEnv.getDtoIn(), ucEnv.getSession());
  }
}

module.exports = new ReservationController();
