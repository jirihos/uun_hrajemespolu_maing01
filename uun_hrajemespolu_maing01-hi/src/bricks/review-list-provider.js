//@@viewOn:imports
import { PropTypes, createComponent, useDataObject } from "uu5g05";
import Config from "./config/config.js";
import Calls from "../calls.js";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:helpers
//@@viewOff:helpers

const ReviewListProvider = createComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ReviewListProvider",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    sportsFieldId: PropTypes.string.isRequired,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const { sportsFieldId, children } = props;
    //@@viewOff:private

    const dataObject = useDataObject(
      {
      handlerMap: {
        load: () => {
          const dtoIn = { 
            sportsFieldId: sportsFieldId,
           };
          return Calls.reviewList(dtoIn);
        },
      },
    });


    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render


    return typeof children === "function" ? children(dataObject) : children;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { ReviewListProvider };
export default ReviewListProvider;
//@@viewOff:exports
