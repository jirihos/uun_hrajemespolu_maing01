const Errors = require("../errors/reservation-error");

const Warnings = {
  Create: {
    UnsupportedKeys: {
      code: `${Errors.Create.UC_CODE}unsupportedKeys`,
    },
  },

  ListOwn: {
   UnsupportedKeys: {
    code: `${Errors.Create.UC_CODE}unsupportedKeys`,
  },
}

};

module.exports = Warnings;
