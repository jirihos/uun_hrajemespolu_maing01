//@@viewOn:imports
import { createComponent, useDataObject, PropTypes } from "uu5g05";
import Config from "./config/config.js";
import Calls from "../../calls.js";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:helpers
//@@viewOff:helpers

const ReviewProvider = createComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ReviewProvider",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    sportsFieldId: PropTypes.string.isRequired,
    uuIdentity: PropTypes.string.isRequired,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const { children, sportsFieldId, uuIdentity } = props;
    //@@viewOff:private

    const dataObject = useDataObject({
      handlerMap: {
        getByUser: () => {
          const dtoIn = {
            sportsFieldId: sportsFieldId,
            uuIdentity: uuIdentity,
          };
          return Calls.reviewGetByUser(dtoIn);
        },
        create: () => {
          const dtoIn = {
            sportsFieldId: sportsFieldId,
            uuIdentity: uuIdentity,
          };
          return Calls.reviewCreate(dtoIn);
        },
        update: () => {
          const dtoIn = {
            sportsFieldId: sportsFieldId,
            uuIdentity: uuIdentity,
          };
          return Calls.reviewUpdate(dtoIn);
        }
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
export { ReviewProvider };
export default ReviewProvider;
//@@viewOff:exports
