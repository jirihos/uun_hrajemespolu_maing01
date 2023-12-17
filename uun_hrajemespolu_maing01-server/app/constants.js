const Constants = {
  // maximum duration of new reservations in hours
  MAX_RESERVATION_DURATION: 2,
  
  HALF_HOUR_MILLISECONDS: 30 * 60 * 1000,

  MAX_DATE: new Date(8640000000000000),
  MIN_DATE: new Date(-8640000000000000),

  EXECUTIVES_PROFILE: "Executives",
};

module.exports = Constants;
