const Errors = require("../errors/review-error");

const Warnings = {
  list: {
    UnsupportedKeys: {
      code: `${Errors.list.UC_CODE}unsupportedKeys`,
    },
  },
  getByUser: {
    UnsupportedKeys: {
      code: `${Errors.getByUser.UC_CODE}unsupportedKeys`,
    },
  },
  Delete: {
    UnsupportedKeys: {
      code: `${Errors.Delete.UC_CODE}unsupportedKeys`,
    },
  },
  Create: {
    UnsupportedKeys: {
      code: `${Errors.Create.UC_CODE}unsupportedKeys`,
    },
  },
};

module.exports = Warnings;
