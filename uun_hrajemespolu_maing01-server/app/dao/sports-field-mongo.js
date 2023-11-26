"use strict";
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;

class SportsFieldMongo extends UuObjectDao {
  async createSchema() {}

  async get(awid, id) {
    return await super.findOne({ awid, id });
  }
}

module.exports = SportsFieldMongo;
