/* eslint-disable */

const galleryCreateTypes = shape(
    {
    images: array(
        shape(
            {
                imageName: string().isRequired(),
                imageURL: string().isRequired(),
            }
        )
    ).isRequired()
    }
);

const galleryUpdateTypes = shape(
    {
        id: id().isRequired(),
        images: array(
            shape(
                {
                    imageName: string().isRequired(),
                    imageURL: string().isRequired(),
                }
            )
        ).isRequired()
    }
);

const galleryGetDtoInType = shape({
    id: id().isRequired()
  });
  
const galleryDeleteDtoInType = shape({
    id: id().isRequired()
  });