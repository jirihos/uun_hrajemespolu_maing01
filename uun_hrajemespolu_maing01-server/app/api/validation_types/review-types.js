/* eslint-disable */

const reviewListTypes = shape({
  sportsFieldId: id().isRequired(),
  pageInfo: shape({
    pageIndex: integer(0, 1000000000),
    pageSize: integer(1, 1000000000)
  })
});

const reviewGetByUserTypes = shape({
  sportsFieldId: id().isRequired(),
  uuIdentity: string().isRequired()
});

const reviewDeleteTypes = shape({
  id: id().isRequired()
});