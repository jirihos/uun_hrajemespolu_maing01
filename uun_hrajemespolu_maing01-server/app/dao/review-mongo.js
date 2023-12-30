"use strict";
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;

class ReviewMongo extends UuObjectDao {
  async createSchema() {
    await super.createIndex({ awid: 1, sportsFieldId: 1, uuIdentity: 1 }, { unique: true });
    await super.createIndex({ awid: 1, rating: 1 });
  }

  async listBySportsField(awid, sportsFieldId, pageInfo) {
    const filter = {
      awid,
      sportsFieldId,
    };

    return await super.find(filter, pageInfo);
  }

  async get(awid, id) {
    const filter = {
      awid,
      id,
    };

    return await super.findOne(filter);
  }

  async getByUser(awid, sportsFieldId, uuIdentity) {
    const filter = {
      awid,
      sportsFieldId,
      uuIdentity,
    };

    return await super.findOne(filter);
  }

  async delete(awid, id) {
    const filter = {
      awid,
      id,
    };

    await super.deleteOne(filter);
  }

  async create(uuObject) {
    return await super.insertOne(uuObject);
  }

  async update(uuObject) {
    let filter = { id: uuObject.id, awid: uuObject.awid };
    return await super.findOneAndUpdate(filter, uuObject, "NONE");
  }

}

module.exports = ReviewMongo;
