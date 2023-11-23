//@@viewOn:imports
import { PropTypes, createComponent, useDataObject } from "uu5g05";
import Config from "./config/config.js";
import Calls from "calls";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:helpers
//@@viewOff:helpers

const GalleryProvider = createComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "GalleryProvider",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    galleryId: PropTypes.string.isRequired,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const { galleryId, children } = props;

    const dataObject = useDataObject({
      handlerMap: {
        load: () => {
          const dtoIn = { id: galleryId };
          return Calls.loadGallery(dtoIn);
        },
      },
    });
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    return typeof children === "function" ? children(dataObject) : children;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { GalleryProvider };
export default GalleryProvider;
//@@viewOff:exports
