"use strict";
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;

class SportsFieldMongo extends UuObjectDao {
  async createSchema() {}
}

module.exports = SportsFieldMongo;
