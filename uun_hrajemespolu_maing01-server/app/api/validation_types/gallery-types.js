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