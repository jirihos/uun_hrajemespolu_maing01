//@@viewOn:imports
import { PropTypes, createComponent, useState, useDataList } from "uu5g05";
import { Alert } from "uu5g05-elements";
import Config from "./config/config.js";
import Calls from "calls";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:helpers
//@@viewOff:helpers

const SportsFieldReservationsProvider = createComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "SportsFieldReservationsProvider",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    sportsFieldId: PropTypes.string.isRequired,
    pageSize: PropTypes.number,
    skipInitialLoad: PropTypes.bool,
    loadFull: PropTypes.bool,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    pageSize: 20,
    skipInitialLoad: true,
    loadFull: false,
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const { sportsFieldId, pageSize, skipInitialLoad, children, loadFull } = props;

    const [customError, setCustomError] = useState(null);

    const dataList = useDataList({
      skipInitialLoad,
      pageSize,
      handlerMap: {
        load: (dtoIn) => {
          dtoIn.sportsFieldId = sportsFieldId;
          dtoIn.loadFull = loadFull;
          return Calls.reservationListBySportsField(dtoIn);
        },

        create: async (dtoIn) => {
          dtoIn.sportsFieldId = sportsFieldId;

          let result;
          try {
            result = await Calls.reservationCreate(dtoIn);
          } catch (e) {
            setCustomError(e.message);
          }
          return result;
        },
      },
      itemHandlerMap: {
        cancelByAdmin: async(dtoIn) => {
          await Calls.reservationCancelByAdmin(dtoIn);
          return null;
        },
      },
    });
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    return (
      <>
        {typeof children === "function" ? children(dataList) : children}
        {customError && <Alert message={customError} priority="error" durationMs={6000} onClose={() => setCustomError(null)} />}
      </>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { SportsFieldReservationsProvider };
export default SportsFieldReservationsProvider;
//@@viewOff:exports
