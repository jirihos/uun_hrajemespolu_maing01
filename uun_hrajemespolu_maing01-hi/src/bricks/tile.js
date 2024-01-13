//@@viewOn:imports
import { createVisualComponent,Utils, useRoute } from "uu5g05";
import Config from "./config/config.js";
import Uu5Elements from "uu5g05-elements";

//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
const Css = {
  main: () => Config.Css.css({
    padding: "16px",
  }),
  layout: (padding, gap) => {
    let styles = {};
    if (padding) {
      styles = {
        paddingTop: padding.top,
        paddingRight: padding.right,
        paddingBottom: padding.bottom,
        paddingLeft: padding.left,
      };
    }
    return Config.Css.css({
      ...styles,
      display: "flex",
      flexDirection: "column",
      gap,
    });
  },
  italic: () => Config.Css.css({ fontStyle: "italic" }),
  margin: (side, size) => {
    const style = side === "left" ? { marginLeft: size } : { marginRight: size };
    return Config.Css.css(style);
  },
  image: (isModal) =>
    Config.Css.css({
      marginBottom: "5px",
      width: "100%",
      height: isModal ? 400 : 250,
      display: "block",
      objectFit: "cover",
    }),
};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const Tile = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Tile",
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

    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, Tile);

    const  [, setRoute] = useRoute();

    const titleStyles = { category: "interface", segment: "title", type: "common" };
    const fixedC = Uu5Elements.UuGds.SpacingPalette.getValue(["fixed", "c"]);

    const onClickHandler = () => {
      setRoute("sportsFieldDetail", { id: props.data.data.id });
    }

    console.log("propsJirka", props.data.data.firstImage);

    return currentNestingLevel ? (
      <>
      <Uu5Elements.Tile
        {...props}
  
        borderRadius="elementary"
        onClick={() => onClickHandler()}
      >
        {({ padding }) => {
          return (
            <>
            {props.data.data.firstImage !== null && (
              <img
                src={`${props.data.data.firstImage.imageURL}`}
                alt={props.data.data.firstImage.imageName}
                className={Css.image(false)}
              />
              )}
              <div className={Css.layout(padding, fixedC)}>
                <Uu5Elements.Text {...titleStyles} colorScheme="green">
                  {props.data.data.sportsFieldName}
                </Uu5Elements.Text>
                <div className={Css.layout()}>
                </div>
              </div>
            </>
          );
        }}
      </Uu5Elements.Tile>
    </>
    ) : null;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { Tile };
export default Tile;
//@@viewOff:exports
