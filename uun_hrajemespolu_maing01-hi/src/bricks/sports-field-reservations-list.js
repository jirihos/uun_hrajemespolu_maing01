//@@viewOn:imports
import { createVisualComponent, Utils, PropTypes } from "uu5g05";
import Provider from "../bricks/sports-field-reservations-provider.js";
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
  propTypes: {
    sportsFieldId: PropTypes.string.isRequired,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const { sportsFieldId } = props;
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, SportsFieldReservationsList);

    return currentNestingLevel ? (
      <div {...attrs}>
        <Provider sportsFieldId={sportsFieldId} loadFull={true} skipInitialLoad={false}>
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
