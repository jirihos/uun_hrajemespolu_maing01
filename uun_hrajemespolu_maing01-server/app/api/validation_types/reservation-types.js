/* eslint-disable */

const reservationCreateDtoInType = shape({
  sportsFieldId: id().isRequired(),
  startTs: datetime().isRequired(),
  endTs: datetime().isRequired(),
});
