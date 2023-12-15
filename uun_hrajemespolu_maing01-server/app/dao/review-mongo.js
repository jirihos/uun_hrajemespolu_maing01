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
    }

    return await super.find(filter, pageInfo);
  }

  async getById(awid, sportsFieldId, id) {

    const filter = {
      awid,
      sportsFieldId,
      id
    }

    return await super.findOne(filter);
  }

  async getByUser(awid, sportsFieldId, uuIdentity) {

    const filter = {
      awid,
      sportsFieldId,
      uuIdentity
    }

    return await super.findOne(filter);
  }

  async delete(awid, sportsFieldId, id) {

    const filter = {
      awid,
      sportsFieldId,
      id
    }

    await super.deleteOne(filter);
  }
}

module.exports = ReviewMongo;
