/* eslint-disable */
const sportsFieldGetDtoInType = shape({
    id: id().isRequired()
  });

  const sportsFieldCreateDtoInType = shape({

    sportsFieldName: uu5String(1, 255).isRequired(),
    sportsFieldDesc: uu5String(1, 4000).isRequired(),
    galleryId: id().isRequired(),
    
  });