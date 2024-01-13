//@@viewOn:imports
import { Utils, createVisualComponent, useSession, Lsi, useRoute } from "uu5g05";
import Uu5Elements from "uu5g05-elements";
import Plus4U5Elements from "uu_plus4u5g02-elements";
import { withRoute } from "uu_plus4u5g02-app";

import Config from "./config/config.js";
import WelcomeRow from "../bricks/welcome-row.js";
import RouteBar from "../core/route-bar.js";
import importLsi from "../lsi/import-lsi.js";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
const Css = {
  button: () =>
    Config.Css.css({
      fontSize: 12,
      width: "10em",
      height: "5em",
      fontSize: "1em",
      marginLeft:"25%",
    }),
  gridwrapper: () =>
    Config.Css.css({
      width: "100%",
      height: "100%",
      paddingTop: "1%"
    }),
  image: () =>
    Config.Css.css({
      width: "100%",
      height: "100%",
      justifySelf: "center",
      alignSelf: "center"
    }),
  text: () =>
    Config.Css.css({
      float: "right", 
      width: "20%",
      height: "100%",
      backgroundColor: "orange"
    }),
};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

let Home = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Home",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const { identity } = useSession();
    const [, setRoute] = useRoute();
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props);
    return (
      <>
        <RouteBar />

        <Uu5Elements.Grid className={Css.gridwrapper()}>

        <Uu5Elements.Grid.Item justifySelf={"center"} alignSelf={"center"}><img className={Css.image()} src={require('../../src/assets/hrajemeSpoluLogoWidth.png')} /></Uu5Elements.Grid.Item>

        <Uu5Elements.Grid.Item justifySelf={"center"} alignSelf={"center"}>
          <p>Pokud chcete vytvořit rezervaci, klikněte prosím zde:</p>
          <p2>Pokud chcete vytvořit rezervaci, klikněte prosím zde:</p2>
          <Uu5Elements.Link href={'./sportsFields'}>
          <Uu5Elements.Button onClick={() => {}} className={Css.button()} significance={"highlighted"}>Přesměrovat</Uu5Elements.Button></Uu5Elements.Link></Uu5Elements.Grid.Item>

      

        </Uu5Elements.Grid>


        </>
        );
    //@@viewOff:render
  },
});

Home = withRoute(Home, { authenticated: true });

//@@viewOn:exports
export { Home };
export default Home;
//@@viewOff:exports
