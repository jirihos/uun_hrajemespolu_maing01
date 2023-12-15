const Errors = require("../errors/review-error");

const Warnings = {
    list: {
        UnsupportedKeys: {
          code: `${Errors.list.UC_CODE}unsupportedKeys`,
        },
      },
      getByUser: {
        UnsupportedKeys: {
          code: `${Errors.list.UC_CODE}unsupportedKeys`,
        },
      },
      Delete: {
        UnsupportedKeys: {
          code: `${Errors.list.UC_CODE}unsupportedKeys`,
        },
      },
};

module.exports = Warnings;
