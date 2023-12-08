//@@viewOn:imports
import { useDataList, useEffect, useRef, createComponent, useDataObject } from "uu5g05";
import Config from "./config/config.js";
import Calls from "../../calls.js";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:helpers
//@@viewOff:helpers

const Provider = createComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Provider",
  //@@viewOff:statics

  //@@viewOn:propTypes
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const { children } = props;

    const dataObject = useDataList({
      handlerMap: {
        load: () => {
          const dtoIn =
          {
            "pageInfo": {
              "pageIndex": 0,
              "pageSize": 10
            }	
          } ;
          return Calls.listOwn(dtoIn);
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
export { Provider };
export default Provider;
//@@viewOff:exports
