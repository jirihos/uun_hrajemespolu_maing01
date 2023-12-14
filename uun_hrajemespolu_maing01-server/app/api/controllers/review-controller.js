"use strict";
const ReviewAbl = require("../../abl/review-abl.js");

class ReviewController {

  getByUser(ucEnv) {
    return ReviewAbl.getByUser(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  create(ucEnv) {
    return ReviewAbl.create(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  list(ucEnv) {
    return ReviewAbl.list(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

}

module.exports = new ReviewController();
