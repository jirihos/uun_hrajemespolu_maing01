//@@viewOn:imports
import { createVisualComponent, PropTypes, Utils, useState, useMemo, useScreenSize, useEffect } from "uu5g05";
import Config from "./config/config.js";
import Uu5Elements from "uu5g05-elements";
import Uu5TilesElements from "uu5tilesg02-elements";
import Tile from "./tile.js";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
const Css = {
  main: () => Config.Css.css({
    padding: "16px",
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
            <Uu5TilesElements.Grid data={data} tileMinWidth={250} tileMaxWidth={280}>
              <Tile/>
            </Uu5TilesElements.Grid>
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
