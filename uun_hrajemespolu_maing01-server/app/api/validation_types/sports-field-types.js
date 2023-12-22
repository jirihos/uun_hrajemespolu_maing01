/* eslint-disable */
const sportsFieldGetDtoInType = shape({
    id: id().isRequired()
  });

  const sportsFieldCreateDtoInType = shape({

    sportsFieldName: uu5String(1, 255).isRequired(),
    sportsFieldDesc: uu5String(1, 4000).isRequired(),
    galleryId: id().isRequired(),
    
  });

const sportsFieldListDtoInType = shape({
  pageInfo: shape({
    pageIndex: integer(0, 1000000000),
    pageSize: integer(1, 1000000000)
  })
});