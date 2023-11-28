"use strict";
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;

class ReservationMongo extends UuObjectDao {
    async createSchema() {
    await super.createIndex({ awid: 1, sportsFieldId: 1 });
    await super.createIndex({ awid: 1, uuIdentity: 1 });
  }

  async create(uuObject) {
    return await super.insertOne(uuObject);
  }

  async listByUuIdentity(awid, uuIdentity, pageInfo) {
    const filter = {
      awid,
      uuIdentity,
    }

    return await super.find(filter, pageInfo);
  }
}

module.exports = ReservationMongo
