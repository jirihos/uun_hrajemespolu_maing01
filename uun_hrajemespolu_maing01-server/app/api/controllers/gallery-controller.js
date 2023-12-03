"use strict";
const GalleryAbl = require("../../abl/gallery-abl.js");

class GalleryController {

  get(ucEnv) {
    return GalleryAbl.get(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  create(ucEnv) {
    return GalleryAbl.create(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

}

module.exports = new GalleryController();
