"use strict";
const ReviewAbl = require("../../abl/review-abl.js");

class ReviewController {

  list(ucEnv) {
    return ReviewAbl.list(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

}

module.exports = new ReviewController();
