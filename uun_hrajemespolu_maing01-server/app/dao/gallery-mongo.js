"use strict";
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;

class GalleryMongo extends UuObjectDao {
  async createSchema() {}

  async create(dtoIn) {

    return await super.insertOne(dtoIn);

  }
}

module.exports = GalleryMongo;
