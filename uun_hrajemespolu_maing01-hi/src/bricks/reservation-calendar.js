//@@viewOn:imports
import { createVisualComponent, PropTypes, Utils, } from "uu5g05";
import Config from "./config/config.js";
import SportsFieldReservationsProvider from "./sports-field-reservations-provider.js";
import View from "./reservation-calendar/view.js";
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

const ReservationCalendar = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ReservationCalendar",
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
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, ReservationCalendar);

    return currentNestingLevel ? (
      <SportsFieldReservationsProvider sportsFieldId={sportsFieldId} pageSize={48} {...attrs}>
        {(dataList) => <View dataList={dataList} />}
      </SportsFieldReservationsProvider>
    ) : null;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { ReservationCalendar };
export default ReservationCalendar;
//@@viewOff:exports
