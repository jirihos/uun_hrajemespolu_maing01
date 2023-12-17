//@@viewOn:imports
import { createVisualComponent, PropTypes, Utils, Block, Grid, useState, Toogle, useMemo } from "uu5g05";
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

    const [view, setView] = useState("table");
    const [open, setOpen] = useState(false);
    const [confirmRemove, setConfirmRemove] = useState({ open: false, id: undefined });

    const columnList = [ // column list
      { header: "Sportoviště", label: "sportsFieldId", icon: "uugds-view-list", value: "sportsFieldId" },
      { header: "Rezervace Od", label: "startTs", icon: "uugds-view-liste", value: "startTs", 
      cellComponent:<Uu5TilesElements.Table.Cell><Uu5Elements.DateTime /> </Uu5TilesElements.Table.Cell> },
      { header: "Rezervace Do", label: "endTs", icon: "uugds-view-liste", value: "endTs", 
      cellComponent: <Uu5TilesElements.Table.Cell><Uu5Elements.DateTime /> </Uu5TilesElements.Table.Cell>  },
      { header: "Stav", label: "state", icon: "uugds-view-liste", value: "state" },
      { header: "Důvod zrušení", label: "cancelReason", icon: "uugds-view-liste", value: "cancelReason" },
    ];

    function getActionList({ rowIndex, data }) {   // delete button
      return [
        {
          icon: "uugds-delete",
          tooltip: "Delete item",
          onClick: (e) => {
            setConfirmRemove({ open: true, id: data.id }),
            setOpen(true);
          },
        },
      ];
    };

    const VIEW_LIST = [ // view list
      { label: "Table", icon: "uugds-view-list", value: "table" },
      { label: "Grid", icon: "uugds-view-grid", value: "grid" },
    ];

    const { dataObject } = props;
    const { state, data, handlerMap } = dataObject;
    const [filter, setFilter] = useState(true);

    const dataToRender = useMemo(() => { // filter data
      return data?.filter((dataItem) => dataItem);
    }, [data]);
    const filteredData = Array.isArray(dataToRender)
    ? dataToRender.filter( 
      itemData =>
    itemData.data.state === "valid" || filter === false
    )
    : [];

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
        {(state === "error" || state === "errorNoData" || state === "readyNoData") && <h1>Error</h1>}
        {(state === "ready" || state === "pending") && (
              
              <Uu5Tiles.ViewProvider viewList={VIEW_LIST} value={view} onChange={(e) => setView(e.data.value)}>
              <Uu5Elements.Block actionList={[{ component: <Uu5TilesControls.ViewButton /> }]}>
                <Uu5TilesElements.List
                  data={filteredData}
                  columnList={columnList
                  }
                  tileMinWidth={280}
                  tileMaxWidth={300}
                  view={view}
                  getActionList={getActionList}
                >
                  <Uu5TilesElements.Grid.DefaultTile
                    header={
                      <Uu5Elements.Text category="interface" segment="title" type="micro">
                         Rezervace 
                      </Uu5Elements.Text>
                    }
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
          header="Smazat tuto rezervaci?"
          icon={<Uu5Elements.Svg code="uugdssvg-svg-delete" />}
          info="Rezervaci nelze obnovit"
          actionDirection="horizontal"
          actionList={[
            {
              children: "Zrušit"  ,
              onClick: () => setOpen(false), // TODO set item to detete to null
            },
            {
              children: "Smazat",
              onClick: () =>  setOpen(false), // TODO delete reservation
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