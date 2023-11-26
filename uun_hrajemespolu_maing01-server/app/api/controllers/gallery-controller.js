"use strict";
const GalleryAbl = require("../../abl/gallery-abl.js");

class GalleryController {

  create(ucEnv) {
    return GalleryAbl.create(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

}

module.exports = new GalleryController();
