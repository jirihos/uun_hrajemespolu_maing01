//@@viewOn:imports
import { createVisualComponent, Utils, Content } from "uu5g05";
import Provider from "./own-reservation-list/provider.js";
import SportsFieldReservationView from "./sports-field-reservations-list/view.js";
import Config from "./config/config.js";
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

const SportsFieldReservationsList = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "SportsFieldReservationsList",
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
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, SportsFieldReservationsList);

    return currentNestingLevel ? (
      <div {...attrs}>
        <Provider>
          {(dataObject) => <SportsFieldReservationView dataObject={dataObject} />}
        </Provider>
      </div>
    ) : null;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { SportsFieldReservationsList };
export default SportsFieldReservationsList;
//@@viewOff:exports
