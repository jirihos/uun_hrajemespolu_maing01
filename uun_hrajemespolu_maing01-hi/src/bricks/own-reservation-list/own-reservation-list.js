//@@viewOn:imports
import { createVisualComponent, Utils, Content } from "uu5g05";
import Config from "../config/config.js";
import Provider from "./provider.js";
import View from "./view.js";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
const Css = {
  main: () => Config.Css.css({}),
};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const OwnReservationList = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "OwnReservationList",
  nestingLevel: ["areaCollection", "area"],
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
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, OwnReservationList);

    return currentNestingLevel ? (
      <div {...attrs}>
        <Provider>
          {(dataObject) => <View dataObject={dataObject} />}
        </Provider>
      </div>
    ) : null;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { OwnReservationList };
export default OwnReservationList;
//@@viewOff:exports
