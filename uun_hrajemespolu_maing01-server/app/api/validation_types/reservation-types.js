/* eslint-disable */

const reservationCreateDtoInType = shape({
  sportsFieldId: id().isRequired(),
  startTs: datetime().isRequired(),
  endTs: datetime().isRequired(),
});

const reservationListOwnDtoInType = shape({
  pageInfo: shape({
    pageIndex: integer(0, 1000000000),
    pageSize: integer(1, 1000000000)
  })
});

const reservationCancelByUserDtoInType = shape({
  id: id().isRequired()
});
