//@@viewOn:imports
import { createVisualComponent, Utils, Content } from "uu5g05";
import Config from "./config/config.js";
import RouteBar from "../core/route-bar.js";
import SportsFieldListView from "../bricks/sports-field-list-view.js";
import Provider from "../bricks/sports-field-list-provider.js";
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

const SportsFields = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "SportsFields",
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
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, SportsFields);

    return currentNestingLevel ? (
      <div> 
        <RouteBar />
        <Provider>
          {(dataObject) => <SportsFieldListView dataObject={dataObject} />}
        </Provider>
      </div>
    ) : null;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { SportsFields };
export default SportsFields;
//@@viewOff:exports
