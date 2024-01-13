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

const reviewCreateDtoInType = shape({
  sportsFieldId: id().isRequired(),
  text: string(1, 4000).isRequired(),
  rating: integer(1, 5).isRequired()
})

const reviewUpdateDtoInType = shape({
  id: id().isRequired(),
  text: string(1, 4000).isRequired(),
  rating: integer(1, 5).isRequired()
})