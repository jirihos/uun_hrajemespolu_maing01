//@@viewOn:imports
import { createVisualComponent, Utils, PropTypes, useState, useMemo, useScreenSize, useEffect } from "uu5g05";
import Config from "./config/config.js";
import Uu5Elements from "uu5g05-elements";
import Uu5Calendar from "uu5calendarg01";
//@@viewOff:imports

//@@viewOn:constants
const MAX_RESERVATION_DURATION = 2; // maximum duration of new reservations in hours
const MAX_RESERVATION_DURATION_MS = MAX_RESERVATION_DURATION * 60 * 60 * 1000;
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

    const [date, setDate] = useState(() => {
      let currentDate = new Date().toISOString().split("T")[0];
      return currentDate;
    });
    const [selection, setSelection] = useState(null);
    const [showConfirm, setShowConfirm] = useState(false);
    const [customError, setCustomError] = useState(null);

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
      let durationMs = newSelection.dateTimeTo.valueOf() - newSelection.dateTimeFrom.valueOf();

      if (durationMs > MAX_RESERVATION_DURATION_MS) {
        setCustomError(`Maximum duration of a reservation is ${MAX_RESERVATION_DURATION} hours.`);
        setSelection(null);
      } else {
        setSelection(newSelection);
      }
    }

    function handleCreate() {
      handlerMap.create({
        startTs: selection.dateTimeFrom.toISOString(),
        endTs: selection.dateTimeTo.toISOString(),
      }).then(() => setSelection(null));
    }

    function renderSelectedReservationInfo() {
      if (!selection) {
        return null;
      }

      function SubduedText({children}) {
        return (
          <Uu5Elements.Text
            category="story"
            segment="body"
            type="common"
            colorScheme="building"
            significance="subdued"
            className={Config.Css.css({ justifySelf: "start" })}
          >
            {children}
          </Uu5Elements.Text>
        );
      }

      function Text({children}) {
        return (
          <Uu5Elements.Text
            category="story"
            segment="body"
            type="common"
            colorScheme="building"
            className={Config.Css.css({ justifySelf: "start" })}
          >
            {children}
          </Uu5Elements.Text>
        );
      }

      return (
        <Uu5Elements.Grid templateColumns="auto auto" className={Config.Css.css({ margin: "20px 5px" })}>
          <SubduedText>Sports field</SubduedText>
          <Text>TODO name of sports field</Text> {/* TODO name of sports field */}

          <SubduedText>From</SubduedText>
          <Text>
            <Uu5Elements.DateTime value={selection.dateTimeFrom} />
          </Text>

          <SubduedText>To</SubduedText>
          <Text>
            <Uu5Elements.DateTime value={selection.dateTimeTo} />
          </Text>
        </Uu5Elements.Grid>
      );
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
            <Uu5Elements.Button colorScheme="primary" onClick={() => setShowConfirm(true)}>Make a reservation</Uu5Elements.Button>
          </div>
        }

        <Uu5Elements.Dialog
          open={showConfirm}
          onClose={() => setShowConfirm(false)}
          header="Create a reservation"
          info={renderSelectedReservationInfo()}
          width={screenSize === "xs" ? "full" : null}
          actionDirection="horizontal"
          actionList={[
            { children: "Confirm", colorScheme: "primary", significance: "highlighted", onClick: handleCreate},
            { children: "Cancel"}
          ]}
        ></Uu5Elements.Dialog>

        {customError && <Uu5Elements.Alert message={customError} priority="error" durationMs={6000} onClose={() => setCustomError(null)} />}
      </div>
    ) : null;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { View };
export default View;
//@@viewOff:exports
