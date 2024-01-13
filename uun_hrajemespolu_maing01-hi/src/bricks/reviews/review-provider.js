//@@viewOn:imports
import { createComponent, useDataObject, PropTypes, useState } from "uu5g05";
import { Alert } from "uu5g05-elements";
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

    const [customError, setCustomError] = useState(null);

    const dataObject = useDataObject({
      handlerMap: {
        getByUser: (dtoIn) => {
          dtoIn.sportsFieldId = sportsFieldId;
          dtoIn.uuIdentity = uuIdentity;
          return Calls.reviewGetByUser(dtoIn);
        },
        create: async (dtoIn) => {
          dtoIn.sportsFieldId = sportsFieldId;
          dtoIn.uuIdentity = uuIdentity;

          let result;
          try {
            result = await Calls.reviewCreate(dtoIn);
          } catch (e) {
            setCustomError(e.message);
          }
          return result;
        },
        update: async (dtoIn) => {
          dtoIn.sportsFieldId = sportsFieldId;
          dtoIn.uuIdentity = uuIdentity;

          let result;
          try {
            result = await Calls.reviewUpdate(dtoIn);
          } catch (e) {
            setCustomError(e.message);
            return null;
          }
          return result;
        },
      },
    });
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    return (
      <>
        {typeof children === "function" ? children(dataObject) : children}
        {customError && (
          <Alert message={customError} priority="error" durationMs={6000} onClose={() => setCustomError(null)} />
        )}
      </>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { ReviewProvider };
export default ReviewProvider;
//@@viewOff:exports
