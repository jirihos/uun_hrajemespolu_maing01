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

  async listBySportsField(awid, sportsFieldId, state, fromDate, toDate, pageInfo) {
    let filter = {
      awid,
      sportsFieldId,
      $or: [
        {
          startTs: {
            $gt: fromDate,
            $lt: toDate
          }
        },
        {
          endTs: {
            $gt: fromDate,
            $lt: toDate
          }
        },
        {
          startTs: {
            $lte: fromDate
          },
          endTs: {
            $gte: toDate
          }
        }
      ]
    };

    if (state) {
      filter.state = state;
    }

    return await super.find(filter, pageInfo);
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

  async getById(awid, id) {

    const filter = {
      awid,
      id,
    }

    return await super.findOne(filter);
  }

  async cancelByAdmin(awid, id, reservation, cancelReason) {

    reservation.state = "cancelledByAdmin"
    reservation.cancelReason = cancelReason;

    const filter = {
      awid,
      id,
    }

    return await super.findOneAndUpdate(filter, reservation, "NONE");
  }
}

module.exports = ReservationMongo
