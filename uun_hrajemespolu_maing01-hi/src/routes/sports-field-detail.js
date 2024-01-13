//@@viewOn:imports
import { createVisualComponent, Utils, useRoute } from "uu5g05";
import Config from "./config/config.js";
import RouteBar from "../core/route-bar.js";
import SportsFieldProvider from "../bricks/sports-field-provider.js";
import SportsFieldView from "../bricks/sports-field-view.js";
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

const SportsFieldDetail = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "SportsFieldDetail",
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
    const [route] = useRoute();
    let sportsFieldId = route.params?.id;
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, SportsFieldDetail);

    return currentNestingLevel ? (
      <>
        <RouteBar />
        <SportsFieldProvider sportsFieldId={sportsFieldId}>
            {(dataObject) => <SportsFieldView dataObject={dataObject} />}
        </SportsFieldProvider>
      </>
    ) : null;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { SportsFieldDetail }
export default SportsFieldDetail;
//@@viewOff:exports
