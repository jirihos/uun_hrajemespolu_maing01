//@@viewOn:imports
import { createVisualComponent, Utils } from "uu5g05";
import { withRoute } from "uu_plus4u5g02-app";
import Config from "./config/config.js";
import RouteBar from "../core/route-bar.js";
import OwnReservationList from "../bricks/own-reservation-list.js";
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

let ReservationList = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ReservationList",
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
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, ReservationList);

    return currentNestingLevel ? (
      <div>
        <RouteBar />
        <div className={Config.Css.css({  margin: "0 20px" })}>
          <OwnReservationList />
        </div>
      </div>
    ) : null;
    //@@viewOff:render
  },
});

ReservationList = withRoute(ReservationList, { authenticated: true });

//@@viewOn:exports
export { ReservationList };
export default ReservationList;
//@@viewOff:exports
