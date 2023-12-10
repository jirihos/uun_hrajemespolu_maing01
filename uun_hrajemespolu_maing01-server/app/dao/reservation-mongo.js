"use strict";
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;

class ReservationMongo extends UuObjectDao {
  async createSchema() {
    await super.createIndex({ awid: 1, sportsFieldId: 1 });
    await super.createIndex({ awid: 1, uuIdentity: 1 });
  }

  async get(awid, id) {
    return await super.findOne({ awid, id });
  }

  async create(uuObject) {
    return await super.insertOne(uuObject);
  }

  async update(uuObject) {
    let filter = { id: uuObject.id, awid: uuObject.awid };
    return await super.findOneAndUpdate(filter, uuObject, "NONE");
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
