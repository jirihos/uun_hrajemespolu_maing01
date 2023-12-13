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

  async countOverlaps(awid, sportsFieldId, startDate, endDate) {
    let filter = {
      awid,
      sportsFieldId,
      state: "valid",
      $or: [
        {
          startTs: {
            $gt: startDate,
            $lt: endDate
          }
        },
        {
          endTs: {
            $gt: startDate,
            $lt: endDate
          }
        },
        {
          startTs: {
            $lte: startDate
          },
          endTs: {
            $gte: endDate
          }
        }
      ]
    }

    return await super.count(filter);
  }
}

module.exports = ReservationMongo
