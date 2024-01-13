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

  MoreThanYearAway: class extends HrajemespoluMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}moreThanYearAway`;
      this.message = "Cannot create a reservation that is more than a year away.";
    }
  },

  TimestampNotRounded: class extends HrajemespoluMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}timestampNotRounded`;
      this.message = "Timestamps need to be rounded to half an hour.";
    }
  },

  DurationIsTooLong: class extends HrajemespoluMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}durationIsTooLong`;
      this.message = `Cannot create a reservation that lasts longer than ${Constants.MAX_RESERVATION_DURATION} hours.`;
    }
  },

  ReservationOutsideOpenHours: class extends HrajemespoluMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}reservationOutsideOpenHours`;
      this.message = `Cannot create a reservation that is outside of the open hours.`;
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
      this.code = `${ListOwn.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  
};

const CancelByUser = {
  UC_CODE: `${RESERVATION_ERROR_PREFIX}cancelByUser/`,
  
  InvalidDtoIn: class extends HrajemespoluMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${CancelByUser.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },

  reservationDoesNotExist: class extends HrajemespoluMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${CancelByUser.UC_CODE}reservationDoesNotExist`;
      this.message = "Reservation does not exist.";
    }
  },

}

const ListBySportsField = {
  UC_CODE: `${RESERVATION_ERROR_PREFIX}listBySportsField/`,
  
  InvalidDtoIn: class extends HrajemespoluMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${ListBySportsField.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },

  SportsFieldDoesNotExist: class extends HrajemespoluMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${ListBySportsField.UC_CODE}sportsFieldDoesNotExist`;
      this.message = "Sports field does not exist.";
    }
  },

  ToTsCannotBeSameOrBeforeFromTs: class extends HrajemespoluMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${ListBySportsField.UC_CODE}toTsCannotBeSameOrBeforeFromTs`;
      this.message = "Specified toTs is the same as fromTs or earlier than fromTs.";
    }
  },

  UserNotAuthorized: class extends HrajemespoluMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${ListBySportsField.UC_CODE}userNotAuthorized`;
      this.message = "User is not authorized.";
    }
  },
};

const CancelByAdmin = {
  UC_CODE: `${RESERVATION_ERROR_PREFIX}cancelByAdmin/`,

  InvalidDtoIn: class extends HrajemespoluMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${CancelByAdmin.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },

  ReservationNotFound: class extends HrajemespoluMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${CancelByAdmin.UC_CODE}notFound`;
      this.message = "Reservation was not found.";
    }
  },

  ReservationAlreadyCancelled: class extends HrajemespoluMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${CancelByAdmin.UC_CODE}alreadyCancelled`;
      this.message = "This reservation has already been cancelled.";
    }
  },
  
};

module.exports = {
  CancelByUser,
  CancelByAdmin,
  ListBySportsField,
  ListOwn,
  Create,
};
