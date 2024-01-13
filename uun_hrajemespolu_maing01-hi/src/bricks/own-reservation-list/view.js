//@@viewOn:imports
import { createVisualComponent, PropTypes, Utils, useState, useMemo, useScreenSize, useEffect } from "uu5g05";
import Config from "./config/config.js";
import moment from "moment";
import Uu5Elements from "uu5g05-elements";
import Uu5TilesElements from "uu5tilesg02-elements";
import Uu5TilesControls from "uu5tilesg02-controls";
import Uu5Tiles from "uu5tilesg02";
import Error from "../error.js";

//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
const Css = {
  main: () => Config.Css.css({}),
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
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private

    const [screenSize] = useScreenSize();
    const [view, setView] = useState("grid");
    const [open, setOpen] = useState(false);
    const [confirmRemove, setConfirmRemove] = useState({ open: false, id: undefined });
    const [handleCancelbyUser, setHandleCancelbyUser] = useState(null);


    const columnList = [ // column list
      { header: "Sportoviště", label: "sportsFieldName", icon: "uugds-view-list", value: "sportsFieldName" },
      { header: "Rezervace Od", label: "startTs", icon: "uugds-view-liste", value: "startTs" },
      { header: "Rezervace Do", label: "endTs", icon: "uugds-view-liste", value: "endTs"},
      { header: "Stav", label: "state", icon: "uugds-view-liste", value: "state" },
      { header: "Důvod zrušení", label: "cancelReason", icon: "uugds-view-liste", value: "cancelReason" },
    ];

    function getActionList({ rowIndex, data }) {   // delete button
      return [
        {
          icon: "uugds-delete",
          tooltip: "Delete item",
          colorScheme: "orange",
          disabled: filter === false,
          onClick: (e) => {
            setConfirmRemove({ open: true, id: data.id }),
            setOpen(true);
          },
        },
      ];
    };


    const viewListOwnReservation = [ // view list
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

    const { dataObject } = props;
    const { state, data, handlerMap } = dataObject;
    const [filter, setFilter] = useState(true);
    const dtoIn = { id: confirmRemove.id };

    const handleCancelReservation = async  () => {

      const reservation = data.find(
        (item) => item.data.id === confirmRemove.id
      )

      await reservation.handlerMap.cancelByUser(dtoIn);

      setConfirmRemove({ open: false, id: undefined });
      setOpen(false);
    };
    
    const dataToRender = useMemo(() => { // filter data
      return data?.filter((dataItem) => dataItem);
    }, [data]);

    const filteredData = Array.isArray(dataToRender)
    ? dataToRender.filter( 
      itemData =>
    itemData.data.state === "valid" || filter === false
    )
    : [];

    const formatedAndIdData = filteredData.map((item) => { // format date && replace sportsFieldId with name
      const data = item.data || {};
    
      const { sportsFieldId, startTs, endTs, id } = data;

      const formattedStartTs = moment(startTs).format('DD.MM.YYYY HH:mm');
      const formattedEndsTs = moment(endTs).format('DD.MM.YYYY HH:mm');

      return { // return formated data
        startTs: formattedStartTs || "Unknown",
        endTs: formattedEndsTs || "Unknown",
        sportsFieldName: data.sportsFieldName || "Unknown",
        cancelReason: data.cancelReason || "-",
        state: data.state || "Unknown",
        id: id || "Unknown",
      };
    });
    
    //@@viewOff:private
    //@@viewOn:render

    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, View);

    return currentNestingLevel ? (
      <>
      <div className="center">
      <h1>List rezervací</h1>
          <Uu5Elements.Header
          />
           <Uu5Elements.Toggle  // toggle filter 
            value={filter}
            onChange={(e) => setFilter(e.data.value)}
            label={filter ? 'Pouze aktivní rezervace' : 'Všechny rezervace'}
            {...props}
          />
      </div>        
        {( state === "pendingNoData") && <Uu5Elements.Pending />} 
        {(state === "error" || state === "errorNoData" || state === "readyNoData") && <Error message='Loading error reservation list' />}
        {(state === "ready" || state === "pending") && (
              <Uu5Tiles.ViewProvider  
              viewList={viewListOwnReservation} 
              value={view} 
              onChange={(e) => setView(e.data.value)}>

              <Uu5Elements.Block actionList={[{ component: <Uu5TilesControls.ViewButton /> }]}>
                <Uu5TilesElements.List
                  colorScheme="warning"
                  data={formatedAndIdData}
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
        <Uu5Elements.Button // load next button
        disabled={state === "pending" || state === "pendingNoData"}
         className={Config.Css.css({  padding: 6 })} width={300} effect="upper" onClick={() => handlerMap.loadNext()}>
          Načíst další rezervace
        </Uu5Elements.Button> 

        </div>
        <Uu5Elements.Dialog  // confirm delete dialog
          open={open}
          onClose={() => setOpen(false)}
          header="Zrušit tuto rezervaci?"
          icon={<Uu5Elements.Svg code="uugdssvg-svg-delete" />}
          info="Rezervace sportoviště bude zrušena"
          actionDirection="horizontal"
          actionList={[
            {
              children: "Zpět"  ,
              onClick: () => setOpen(false), // TODO set item to detete to null
            },
            {
              children: "Potvrdit",
              onClick: () => {
                setHandleCancelbyUser({ callback: handlerMap.update, dtoIn: dtoIn });
                handleCancelReservation();
              },
              colorScheme: "red",
              significance: "highlighted",
            },
          ]}
        />
      </>
    ) : null;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { View };
export default View;
//@@viewOff:exports