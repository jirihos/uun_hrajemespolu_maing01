"use strict";
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;

class ReviewMongo extends UuObjectDao {
  async createSchema() {
    await super.createIndex({ awid: 1, sportsFieldId: 1, uuIdentity: 1 }, { unique: true });
    await super.createIndex({ awid: 1, rating: 1 });
  }
}

module.exports = ReviewMongo;
