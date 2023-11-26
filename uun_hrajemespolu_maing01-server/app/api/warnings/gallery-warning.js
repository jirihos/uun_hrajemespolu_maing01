const Errors = require("../errors/gallery-error");

const Warnings = {
    Create: {
        UnsupportedKeys: {
          code: `${Errors.Create.UC_CODE}unsupportedKeys`,
        },
      },
};

module.exports = Warnings;
