//@@viewOn:imports
import { createVisualComponent, PropTypes, Utils, Uu5Forms, Block, Grid, useState, Toogle } from "uu5g05";
import Config from "./config/config.js";
import Uu5Elements from "uu5g05-elements";

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
    const { dataObject } = props;
    const [open, setOpen] = useState(false);
    const { state, data } = dataObject;
    const [filter, setFilter] = useState(true);
    const filteredData = Array.isArray(dataObject.data)
         ? dataObject.data.filter(
        itemData =>
         itemData.data.state === "valid" || filter === false
    )
     : [];

    console.log("filteredData", filteredData);
    console.log("dataObject", dataObject);
    console.log("dataObject.data", dataObject.data);
    console.log("filter", filter);

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
           <Uu5Elements.Toggle
            value={filter}
            onChange={(e) => setFilter(e.data.value)}
            label={filter ? 'Pouze aktivní rezervace' : 'Všechny rezervace'}
            {...props}
          />
      </div>        
        {(state === "pending" || state === "pendingNoData") && <Uu5Elements.Pending />}
        {(state === "error" || state === "errorNoData" || state === "readyNoData") && <h1>Error</h1>}
        {state === "ready" && (
          filteredData.map((itemData, index) => (
            
            <Uu5Elements.Block
              card="full"
              significance={index % 2 === 0 ? "distinct" : "subdued"}
              colorScheme={itemData.data.state === "valid" ? "light-green" : "yellow"}
              className={Config.Css.css({ padding: 4 })}
              key={itemData.data.id} 
              header={
                <Uu5Elements.Text category="story" segment="heading" type="h5">
                  Rezervace sportoviště: {itemData.data.sportsFieldId} 
                </Uu5Elements.Text>
              }
              footer={
                <Uu5Elements.Grid>
                  <Uu5Elements.Grid.Item rowSpan={2}>
                  <Uu5Elements.Text className={Config.Css.css({  padding: 4 })}>Začíná: {itemData.data.startTs}</Uu5Elements.Text>
                  </Uu5Elements.Grid.Item>
                  <Uu5Elements.Grid.Item rowSpan={2}>
                  <Uu5Elements.Text className={Config.Css.css({  padding: 4 })}>Končí: {itemData.data.endTs}</Uu5Elements.Text>
                  </Uu5Elements.Grid.Item>
                  <Uu5Elements.Grid.Item rowSpan={2}>
                  <Uu5Elements.Text className={Config.Css.css({  padding: 4 })}>Id rezervace:{itemData.data.id}</Uu5Elements.Text>
                  </Uu5Elements.Grid.Item>
              </Uu5Elements.Grid>
              }
            >
              <Uu5Elements.Button 
              className="center" width={200} effect="upper" onClick={() => setOpen(true)}>
                Zrušit rezervaci
                </Uu5Elements.Button>
            </Uu5Elements.Block>
          ))
        )} 
        <div className="center">     
        <Uu5Elements.Button
         className={Config.Css.css({  padding: 6 })} width={300} effect="upper" onClick={() => console.log("upper")}>
          Načíst další rezervace
          </Uu5Elements.Button> 
        </div>
        <Uu5Elements.Dialog
          open={open}
          onClose={() => setOpen(false)}
          header="Smazat tuto rezervaci?"
          icon={<Uu5Elements.Svg code="uugdssvg-svg-delete" />}
          info="Rezervaci nelze obnovit"

          actionDirection="horizontal"
          actionList={[
            {
              children: "Zrušit"  ,
              onClick: () => console.log("Cancel"),
            },
            {
              children: "Smazat",
              onClick: () => console.log("Delete"),
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