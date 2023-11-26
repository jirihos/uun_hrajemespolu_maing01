"use strict";

const Constants = require("../../constants.js");
const HrajemespoluMainUseCaseError = require("./hrajemespolu-main-use-case-error.js");
const RESERVATION_ERROR_PREFIX = `${HrajemespoluMainUseCaseError.ERROR_PREFIX}reservation/`;

const Create = {
  UC_CODE: `${RESERVATION_ERROR_PREFIX}create/`,

  InvalidDtoIn: class extends HrajemespoluMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },

  SportsFieldDoesNotExist: class extends HrajemespoluMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}sportsFieldDoesNotExist`;
      this.message = "Sports field does not exist.";
    }
  },

  EndTsCannotBeSameOrBeforeStartTs: class extends HrajemespoluMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}endTsCannotBeSameOrBeforeStartTs`;
      this.message = "Specified endTs is the same as startTs or earlier than startTs.";
    }
  },

  StartTsCannotBeInPast: class extends HrajemespoluMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}startTsCannotBeInPast`;
      this.message = "Cannot create a reservation that started in the past.";
    }
  },

  DurationIsTooLong: class extends HrajemespoluMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}durationIsTooLong`;
      this.message = `Cannot create a reservation that lasts longer than ${Constants.MAX_RESERVATION_DURATION} hours.`;
    }
  },

  ReservationOverlaps: class extends HrajemespoluMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}reservationOverlaps`;
      this.message = "The reservation overlaps with an existing reservation for the same sports field.";
    }
  },
};

const ListOwn = {
  UC_CODE: `${RESERVATION_ERROR_PREFIX}listOwn/`,

  InvalidDtoIn: class extends HrajemespoluMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  
};

module.exports = {
  ListOwn,
  Create,
};
