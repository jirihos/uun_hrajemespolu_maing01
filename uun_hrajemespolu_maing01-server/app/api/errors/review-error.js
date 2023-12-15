"use strict";

const HrajemespoluMainUseCaseError = require("./hrajemespolu-main-use-case-error.js");
const REVIEW_ERROR_PREFIX = `${HrajemespoluMainUseCaseError.ERROR_PREFIX}review/`;

const list = {
  UC_CODE: `${REVIEW_ERROR_PREFIX}list/`,



  InvalidDtoIn: class extends HrajemespoluMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${list.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },

  SportsFieldDoesNotExist: class extends HrajemespoluMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${list.UC_CODE}sportsFieldDoesNotExist`;
      this.message = "Sports field does not exist.";
    }
  }

};

const getByUser = {
  UC_CODE: `${REVIEW_ERROR_PREFIX}getByUser/`,

  InvalidDtoIn: class extends HrajemespoluMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${list.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },

  ReviewDoesNotExist: class extends HrajemespoluMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${list.UC_CODE}reviewDoesNotExist`;
      this.message = "No review was found.";
    }
  },

  SportsFieldDoesNotExist: class extends HrajemespoluMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${list.UC_CODE}sportsFieldDoesNotExist`;
      this.message = "Sports field does not exist.";
    }
  }

};

const Create = {
  UC_CODE: `${REVIEW_ERROR_PREFIX}create/`,

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

  TextIsNullOrEmpty: class extends HrajemespoluMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}TextIsNullOrEmpty`;
      this.message = "Text is null or empty.";
    }
  }
};


const Delete = {
  UC_CODE: `${REVIEW_ERROR_PREFIX}delete/`,

  InvalidDtoIn: class extends HrajemespoluMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${list.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },

  ReviewDoesNotExist: class extends HrajemespoluMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${list.UC_CODE}reviewDoesNotExist`;
      this.message = "No review was found.";
    }
  },

  SportsFieldDoesNotExist: class extends HrajemespoluMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${list.UC_CODE}sportsFieldDoesNotExist`;
      this.message = "Sports field does not exist.";
    }
  }
  
};

module.exports = {
  Delete,
  getByUser,
  Create,
  list
};
