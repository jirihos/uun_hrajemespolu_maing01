//@@viewOn:imports
import { createVisualComponent, PropTypes, Utils, useMemo, useState } from "uu5g05";
import Uu5Elements from "uu5g05-elements";
import Config from "./config/config.js";
import Error from "./error.js"
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
const Css = {
  main: () => Config.Css.css({}),
  centerImage: () =>
    Config.Css.css({
      margin: "auto",
      width: "100%",
      objectFit: "cover",
      maxHeight: "600px",
    }),
};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const GalleryView = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "GalleryView",
  nestingLevel: ["areaCollection", "area"],
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    dataObject: PropTypes.object.isRequired,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const { dataObject } = props;
    const { state, data } = dataObject;

    const [index, setIndex] = useState(0);

    // map data to actual image elements
    const images = useMemo(() => {
      let imagesArray = [];

      if (state === "ready" && data.images) {
        imagesArray = data.images.map((image, index) => (
          <img key={index} src={image.imageURL} alt={image.imageName} className={Css.centerImage()} />
        ));
      }

      // add a placeholder if there are no images
      if (imagesArray.length === 0) {
        imagesArray.push(<Uu5Elements.PlaceholderBox key={0} code="images" />);
      }

      return imagesArray;
    }, [state, data]);
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, GalleryView);

    return currentNestingLevel ? (
      <>
        {(state === "pending" || state === "pendingNoData") && <Uu5Elements.Pending />}
        {(state === "error" || state === "errorNoData" || state === "readyNoData") && <Error message='Chyba při načítání galerie' />}
        {state === "ready" && (
          <Uu5Elements.Carousel
            index={index}
            onIndexChange={(e) => setIndex(e.data.index)}
            intervalMs={8000}
            type="rewind"
            {...attrs}
          >
            {images}
          </Uu5Elements.Carousel>
        )}
      </>
    ) : null;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { GalleryView };
export default GalleryView;
//@@viewOff:exports
