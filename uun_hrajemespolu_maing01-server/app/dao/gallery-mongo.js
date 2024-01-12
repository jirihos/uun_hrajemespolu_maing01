"use strict";
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;

class GalleryMongo extends UuObjectDao {
  async createSchema() {}

  async create(dtoIn) {

    return await super.insertOne(dtoIn);

  }

  async update(uuObject) {
    let filter = { id: uuObject.id, awid: uuObject.awid };
    return await super.findOneAndUpdate(filter, uuObject, "NONE");
  }
  
  async get(awid, id) {
    return await super.findOne({ awid, id });
  }
}

module.exports = GalleryMongo;
