"use strict";
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;

class SportsFieldMongo extends UuObjectDao {
  async createSchema() {}

  async create(uuObject) {
    return await super.insertOne(uuObject);
  }

  async get(awid, id) {
    return await super.findOne({ awid, id });
  }

  async list(awid, pageInfo) {
    const filter = {
      awid,
    }

    return await super.find(filter, pageInfo);
  }
}

module.exports = SportsFieldMongo;
