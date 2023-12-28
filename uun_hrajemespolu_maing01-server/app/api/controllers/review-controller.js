"use strict";
const ReviewAbl = require("../../abl/review-abl.js");

class ReviewController {
  update(ucEnv) {
    return ReviewAbl.update(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  delete(ucEnv) {
    return ReviewAbl.delete(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

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
