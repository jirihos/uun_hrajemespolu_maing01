//@@viewOn:imports
import { createVisualComponent, PropTypes, Utils, useState, useMemo, useScreenSize, useEffect } from "uu5g05";
import Config from "./config/config.js";
import moment from "moment";
import Uu5Elements from "uu5g05-elements";
import Uu5TilesElements from "uu5tilesg02-elements";
import Uu5TilesControls from "uu5tilesg02-controls";
import Uu5Tiles from "uu5tilesg02";
import Uu5Forms from "uu5g05-forms"

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

    const columnList = [ // column list
      { header: "Uživatel", label: "uuIdentity", icon: "uugds-view-list", value: "uuIdentity" },
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

    const handleCancelReservation = () => { // TODO cancel reservation
      // cancel reservation
      console.log("confirmRemove POST", confirmRemove)
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

    const dataToRender = useMemo(() => { // filter data
      return data?.filter((dataItem) => dataItem);
    }, [data]);


    const sportsField = [ // sports field id TODO get from database
      {"6765-1356-9539-0000": "Jirka Mrkvica"},
      {"2002": "Ten další"},
    ];

    const formatedAndUserData = dataToRender?.map((item) => { // format date && replace sportsFieldId with name
      const data = item.data || {};
    
      const {  uuIdentity, startTs, endTs, id } = data;

      const formattedStartTs = moment(startTs).format('DD.MM.YYYY HH:mm');
      const formattedEndsTs = moment(endTs).format('DD.MM.YYYY HH:mm');

      const userNameObj = sportsField.find(user => user[uuIdentity]);  // find user name
      const userName = userNameObj ? userNameObj[uuIdentity] : "Unknown";    // if not found set to unknown

      return { // return formated data
        startTs: formattedStartTs || "Unknown",
        endTs: formattedEndsTs || "Unknown",
        uuIdentity: userName || "Unknown",
        id: id,
      };
    });

    //@@viewOff:private
    //@@viewOn:render

    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, View);

    return currentNestingLevel ? (
      <>
      <div className="center">
      <h1>List rezervací sportoviště</h1>
          <Uu5Elements.Header
          />
      </div>        
        {( state === "pendingNoData") && <Uu5Elements.Pending />} 
        {(state === "error" || state === "errorNoData" || state === "readyNoData") && <h1>Error</h1>}
        {(state === "ready" || state === "pending") && (
             
              <Uu5Tiles.ViewProvider  
              viewList={viewListOwnReservation} 
              value={view} 
              onChange={(e) => setView(e.data.value)}>

              <Uu5Elements.Block actionList={[{ component: <Uu5TilesControls.ViewButton /> }]}>
                <Uu5TilesElements.List
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
          info="Rezervace uživatele bude zrušena"
          actionDirection="horizontal"

          actionList={[
            {
              children: "Zpět",
              onClick: () => {
                setConfirmRemove({ open: false, id: undefined }),
                setOpen(false) // TODO set item to detete to null
              },
            },
            {
              children: "Potvrdit",
              onClick: () =>  {
                handleCancelReservation(),
                setOpen(false)
              }, // TODO delete reservation
              colorScheme: "red",
              significance: "highlighted",
            },
          ]}
        />
        <div>
      </div>
      </>
    ) : null;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { View };
export default View;
//@@viewOff:exports
