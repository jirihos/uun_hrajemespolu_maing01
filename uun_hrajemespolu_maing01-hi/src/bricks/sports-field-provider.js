//@@viewOn:imports
import { PropTypes, createComponent, useDataObject } from "uu5g05";
import Config from "./config/config.js";
import Calls from "calls";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:helpers
//@@viewOff:helpers

const SportsFieldProvider = createComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "SportsFieldProvider",
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

    const dataObject = useDataObject({
      handlerMap: {
        load: () => {
          const dtoIn = { id: sportsFieldId };
          return Calls.sportsFieldGet(dtoIn);
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
export { SportsFieldProvider };
export default SportsFieldProvider;
//@@viewOff:exports
