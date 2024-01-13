//@@viewOn:imports
import { createComponent, useDataList } from "uu5g05";
import Config from "./config/config.js";
import Calls from "../calls.js";

//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:helpers
//@@viewOff:helpers

const SportsFieldListProvider = createComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "SportsFieldListProvider",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const { children } = props;

    const dataObject = useDataList({
      handlerMap: {
        load: Calls.sportsFieldList
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
export { SportsFieldListProvider };
export default SportsFieldListProvider;
//@@viewOff:exports
