//@@viewOn:imports
import { createVisualComponent, PropTypes, Utils, useState, useMemo, useScreenSize, useEffect } from "uu5g05";
import Config from "./config/config.js";
import moment from "moment";
import Uu5Elements from "uu5g05-elements";
import Uu5TilesElements from "uu5tilesg02-elements";
import Uu5TilesControls from "uu5tilesg02-controls";
import Uu5Tiles from "uu5tilesg02";
import CancelByAdminModal from "./cancel-by-admin-modal.js";
import Plus4U5Elements from "uu_plus4u5g02-elements";
import Error from "../error.js";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
const Css = {
  main: () => Config.Css.css({
    padding: "16px 0",
  }),
  centerImage: () =>
    Config.Css.css({
      margin: "auto",
      width: "100%",
      objectFit: "cover",
    }),
  // Assuming you have a wrapper function in your actual code.
  wrapper: () => Config.Css.css({}),
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
    dataObject: PropTypes.object.isRequired,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    dataObject: {},
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private

    const { dataObject } = props;
    const { state, data, handlerMap, itemHandlerMap  } = dataObject;

    const [screenSize] = useScreenSize();
    const [view, setView] = useState("grid");
    const [open, setOpen] = useState(false);
    const [confirmRemove, setConfirmRemove] = useState({ open: false, id: undefined });
    const [cancelReservationReason, setCancelReservationReason] = useState("");

    const firstNotYetLoadedIndex = data ? data.findIndex((it) => it == null) : 0;

    const onCancel = () => {
      setOpen(false);
      setConfirmRemove({ open: false, id: undefined })
    };

    const columnList = [ // column list
      {
        header: "Uživatel",
        label: "uuIdentity",
        icon: "uugds-view-liste",
        value: "uuIdentity",
        cell: (props) => <Plus4U5Elements.PersonItem uuIdentity={props.data.uuIdentity} />
      },
      { header: "Rezervace Od", label: "startTs", icon: "uugds-view-liste", value: "startTs" },
      { header: "Rezervace Do", label: "endTs", icon: "uugds-view-liste", value: "endTs"},
    ];

    function getActionList({ rowIndex, data }) {   // delete button
      return [
        {
          icon: "uugds-delete",
          tooltip: "Delete item",
          colorScheme: "orange",
          onClick: (e) => {
            setOpen(true),
            setConfirmRemove({ open: true, id: data.id })
          },
        },
      ];
    };

    useEffect(() => { // ToDo
      const handleCancelReservation = async () => {
        if (cancelReservationReason !== "") {
          const dtoIn = {
            id: confirmRemove.id,
            cancelReason: cancelReservationReason
          };
  
          const reservation = data.find(
            (item) => item.data.id === confirmRemove.id
          );
  
          await reservation.handlerMap.cancelByAdmin(dtoIn);
  
          setCancelReservationReason("");
          setConfirmRemove({ open: false, id: undefined });
          setOpen(false);
        }
      };
  
      handleCancelReservation();
    }, [cancelReservationReason]); 

    const viewListSportsFieldReservation = [ // view list
      { label: "Table", icon: "uugds-view-list", value: "table" },
      { label: "Grid", icon: "uugds-view-grid", value: "grid" },
    ];

    useEffect(() => { // set view to grid s & xs screen size
      if (screenSize === "xs" || screenSize === "s") {  
        setView("grid");
      } else {
        setView("table");
      }
    }, [screenSize]);

    const dataToRender = useMemo(() => { // filter data
      return data?.filter((dataItem) => dataItem);
    }, [data]);

    const formatedAndUserData = dataToRender?.map((item) => { // format date && replace sportsFieldId with name
      const data = item.data || {};
    
      const {  uuIdentity, startTs, endTs, id } = data;

      const formattedStartTs = moment(startTs).format('DD.MM.YYYY HH:mm');
      const formattedEndsTs = moment(endTs).format('DD.MM.YYYY HH:mm');

      return { // return formated data
        startTs: formattedStartTs || "Unknown",
        endTs: formattedEndsTs || "Unknown",
        uuIdentity: uuIdentity,
        id: id,
      };
    });

    //@@viewOff:private
    //@@viewOn:render

    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, View);

    return currentNestingLevel ? (
      <Uu5Elements.Box {...attrs}>
      <div className="center">
      <Uu5Elements.Text category="expose" segment="default" type="broad">
        Rezervace sportoviště (zobrazení pro správce)
        </Uu5Elements.Text>
      </div>        
        {( state === "pendingNoData") && <Uu5Elements.Pending />} 
        {(state === "error" || state === "errorNoData" || state === "readyNoData") && <Error message='Chyba při načítání seznamu rezervací' />}
        {(state === "ready" || state === "pending") && (
            <Uu5Tiles.ViewProvider  
              viewList={viewListSportsFieldReservation} 
              value={view} 
              onChange={(e) => setView(e.data.value)}>

              <Uu5Elements.Block actionList={[{ component: <Uu5TilesControls.ViewButton /> }]}>
                <Uu5TilesElements.List
                  colorScheme="warning"
                  data={formatedAndUserData}
                  columnList={columnList}
                  tileMinWidth={280}
                  tileMaxWidth={300}
                  view={view} 
                  getActionList={getActionList}
                >
                  <Uu5TilesElements.Grid.DefaultTile
                    header={
                      <Uu5Elements.Text category="interface" segment="title" type="micro">
                         Rezervace 
                      </Uu5Elements.Text>}
                  />
                </Uu5TilesElements.List>
              </Uu5Elements.Block>
            </Uu5Tiles.ViewProvider> 
            )}
        
        <div className="center">
          {firstNotYetLoadedIndex >= 0 && (
            <Uu5Elements.Button // load next button
              disabled={state === "pending" || state === "pendingNoData"}
              className={Config.Css.css({  margin: 16 })} width={300} effect="upper" onClick={() => handlerMap.loadNext()}
            >
              Načíst další rezervace
            </Uu5Elements.Button>
          )}
        </div>
        
        <CancelByAdminModal
          open={open}
          onClose={() => onCancel()}
          onSubmit={(values) => {
            setCancelReservationReason(values.cancelReason);
          }}
          modalTitle="Zrušit tuto rezervaci?"
          nameLabel="Rezervace uživatele bude zrušena"
        />
        <div>
      </div>
      </Uu5Elements.Box>
    ) : null;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { View };
export default View;
//@@viewOff:exports
