const Errors = require("../errors/review-error");

const Warnings = {
    list: {
        UnsupportedKeys: {
          code: `${Errors.list.UC_CODE}unsupportedKeys`,
        },
      },
};

module.exports = Warnings;
