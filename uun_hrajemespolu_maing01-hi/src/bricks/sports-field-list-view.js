//@@viewOn:imports
import { createVisualComponent, PropTypes, Utils, useState, useMemo, useScreenSize, useEffect } from "uu5g05";
import Config from "./config/config.js";
import Uu5Elements from "uu5g05-elements";
import Uu5TilesElements from "uu5tilesg02-elements";
import Uu5TilesControls from "uu5tilesg02-controls";
import Uu5Tiles from "uu5tilesg02";
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

const SportsFieldListView = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "SportsFieldListView",
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
    const [view, setView] = useState("grid");

    const { dataObject } = props;
    const { state, data, handlerMap } = dataObject;

    const viewListOwnReservation = [ // view list
      { label: "Table", icon: "uugds-view-list", value: "table" },
      { label: "Grid", icon: "uugds-view-grid", value: "grid" },
    ];

    const columnList = [ // column list
      { header: "Sportoviště:", label: "sportsFieldName", icon: "uugds-view-list", value: "sportsFieldName" },
      { header: "Popis:", label: "sportsFieldDesc", icon: "uugds-view-list", value: "sportsFieldDesc" }
    ];

    console.log("dataObject", dataObject);
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, SportsFieldListView);

    return currentNestingLevel ? (
      <div {...attrs}>
        {( state === "pendingNoData") && <Uu5Elements.Pending />} 
        {(state === "error" || state === "errorNoData" || state === "readyNoData") && <h1>Error</h1>}
        {(state === "ready" || state === "pending") && (
              <Uu5Tiles.ViewProvider  
              viewList={viewListOwnReservation} 
              value={view} 
              onChange={(e) => setView(e.data.value)}>

              <Uu5Elements.Block actionList={[{ component: <Uu5TilesControls.ViewButton /> }]}>
                <Uu5TilesElements.List
                  colorScheme="warning"
                  data={data}
                  columnList={columnList}
                  tileMinWidth={280}
                  tileMaxWidth={300}
                  view={view} 
                  //getActionList={getActionList}
                >
                  <Uu5TilesElements.Grid.DefaultTile
                    header={
                      <Uu5Elements.Text category="interface" segment="title" type="micro">
                         Sportoviště
                      </Uu5Elements.Text>}
                  />
                </Uu5TilesElements.List>
              </Uu5Elements.Block>
            </Uu5Tiles.ViewProvider> 
            )}
      </div>
    ) : null;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { SportsFieldListView };
export default SportsFieldListView;
//@@viewOff:exports
