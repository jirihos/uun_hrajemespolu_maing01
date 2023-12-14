//@@viewOn:imports
import { createVisualComponent, Utils, PropTypes, useState, useMemo, useScreenSize, useEffect } from "uu5g05";
import Config from "./config/config.js";
import Uu5Elements from "uu5g05-elements";
import Uu5Calendar from "uu5calendarg01";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
const Css = {
  main: () => Config.Css.css({}),
  calendarBox: (screenSize) => Config.Css.css({
    width: screenSize === "xs" ? "auto" : "fit-content",
    margin: "auto",
    padding: "0 3px",
  }),
  scheduler: () => Config.Css.css({
    margin: "12px 0",
  }),
  center: () => Config.Css.css({
    display: "flex",
    justifyContent: "center",
  }),
};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const View = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "View",
  nestingLevel: ["areaCollection", "area"],
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    dataList: PropTypes.object.isRequired,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const { dataList } = props;
    const { state, data, handlerMap } = dataList;

    const [screenSize] = useScreenSize();

    const [ date, setDate ] = useState(new Date().toISOString().split("T")[0]);
    const [ selection, setSelection ] = useState(null);

    // data for Scheduler component
    let rowList = useMemo(() => {
      let eventList = [];

      if (state === "ready") {
        eventList = data.map((reservation) => {
          reservation = reservation.data;
          return {
            id: reservation.id,
            dateTimeFrom: new Date(reservation.startTs),
            dateTimeTo: new Date(reservation.endTs),
            colorScheme: "orange",
            significance: "highlighted",
          }
        });
      }

      if (selection) {
        eventList.push({
          id: "selection",
          dateTimeFrom: selection.dateTimeFrom,
          dateTimeTo: selection.dateTimeTo,
          colorScheme: "primary",
          significance: "highlighted",
        });
      }

      return [{ id: 1, eventList }];
    }, [data, selection]);

    // load reservations when selected date changes
    useEffect(() => {
      let toTs = new Date(date);
      toTs.setUTCHours(23);
      toTs.setUTCMinutes(59);
      toTs.setUTCSeconds(59);
      toTs.setUTCMilliseconds(999);
      handlerMap.load({ fromTs: new Date(date), toTs });
    }, [date]);

    function handleDaySelect(event) {
      setDate(event.data.value);
      setSelection(null);
    }

    function handleSlotSelect(event) {
      const { row, ...newSelection } = event.data;
      setSelection(newSelection);
    }

    function handleCreate() {
      handlerMap.create({
        startTs: selection.dateTimeFrom.toISOString(),
        endTs: selection.dateTimeTo.toISOString(),
      }).then(() => setSelection(null));
    }
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, View);

    return currentNestingLevel ? (
      <div {...attrs}>
        <Uu5Elements.Box className={Css.calendarBox(screenSize)}>
          <Uu5Elements.Calendar value={date} onSelect={handleDaySelect} />
        </Uu5Elements.Box>

        {/* TODO error */}
        {(state === "error" || state === "errorNoData") ? <h1>Error</h1> :
          <Uu5Calendar.Scheduler
            className={Css.scheduler()}
            date={date}
            rowList={rowList}
            onSlotSelect={handleSlotSelect}
            displayRowLabel={false}
            step={30}
            disabled={state === "readyNoData" || state === "pendingNoData"}
          />
        }

        {selection &&
          <div className={Css.center()}>
            <Uu5Elements.Button colorScheme="primary" onClick={handleCreate}>Make a reservation</Uu5Elements.Button>
          </div>
        }
      </div>
    ) : null;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { View };
export default View;
//@@viewOff:exports
