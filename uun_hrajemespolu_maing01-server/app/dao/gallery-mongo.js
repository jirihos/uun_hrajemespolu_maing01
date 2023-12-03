"use strict";
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;

class GalleryMongo extends UuObjectDao {
  async createSchema() {}

  async create(dtoIn) {

    return await super.insertOne(dtoIn);

  }
  
  async get(awid, id) {
    return await super.findOne({ awid, id });
  }
}

module.exports = GalleryMongo;
