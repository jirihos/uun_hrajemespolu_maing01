"use strict";
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;

class GalleryMongo extends UuObjectDao {
  async createSchema() {}
}

module.exports = GalleryMongo;
