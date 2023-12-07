/* eslint-disable */
const sportsFieldGetDtoInType = shape({
    id: id().isRequired()
  });

const sportsFieldGetDtoOutType = shape({
    id: id().isRequired(),
    awid: hexa32Code().isRequired(),
    sys: {
        cTs: datetime().isRequired(),
        mTs: datetime().isRequired(),
        rev: number().isRequired()
    },
  
    sportsFieldName: uu5String(1, 255).isRequired(),
    sportsFieldDesc: uu5String(1, 4000).isRequired(),
    galleryId: id().isRequired(),
    
    uuAppErrorMap: shape({}, true).isRequired()
  });

  const sportsFieldGetDtoInAuditMap = {
    "id": dtoIn.id
  };
  
  const sportsFieldCreateDtoInType = shape({

    sportsFieldName: uu5String(1, 255).isRequired(),
    sportsFieldDesc: uu5String(1, 4000).isRequired(),
    galleryId: id().isRequired(),
    
  });