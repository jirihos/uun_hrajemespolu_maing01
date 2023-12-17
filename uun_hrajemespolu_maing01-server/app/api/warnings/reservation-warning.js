const Errors = require("../errors/reservation-error");

const Warnings = {
  Create: {
    UnsupportedKeys: {
      code: `${Errors.Create.UC_CODE}unsupportedKeys`,
    },
  },

  ListOwn: {
   UnsupportedKeys: {
    code: `${Errors.ListOwn.UC_CODE}unsupportedKeys`,
   }
  },

  CancelByUser: {
    UnsupportedKeys: {
      code: `${Errors.CancelByUser.UC_CODE}unsupportedKeys`,
    },
  },

  ListBySportsField: {
    UnsupportedKeys: {
     code: `${Errors.ListBySportsField.UC_CODE}unsupportedKeys`,
    },
  },
  CancelByAdmin: {
    UnsupportedKeys: {
     code: `${Errors.CancelByAdmin.UC_CODE}unsupportedKeys`,
    },
  },
};

module.exports = Warnings;
