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
      // marginLeft:"15%",
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


        <div style={{
          paddingLeft: "250px",
          paddingRight: "250px",
          textAlign: "center",
        }}>
        <Uu5Elements.Block
      
        card="full"
        significance="distinct"
        >
          <p>Vítejte na stránkách Hrajeme spolu.cz!
            Poskytujeme široký výběr udržovaných sportovišť s kompletním vybavením, a zázemím.
            Sportoviště jsou vhodné jak pro rekreační tak i pro vrcholové sportovce.
            Dostupná sportoviště jsou vždycky v perfektním stavu.
            Poskytujeme sportoviště pro bowling, badminton, squash, fotbal, beach volejbal!
            Pro úplný a aktální seznam poskytovaných sportovišť a jejich rezervaci pokračujte kliknutím na tlačítko Vstup na stránky:
            <Uu5Elements.Link href={'./sportsFields'}></Uu5Elements.Link>
          </p>
          
          { <Uu5Elements.Button onClick={() => {}} className={Css.button()} significance={"highlighted"}>Vstup na stránky</Uu5Elements.Button>}
      </Uu5Elements.Block>
    </div>
          
          </Uu5Elements.Grid.Item>

          

        </Uu5Elements.Grid>
        <div style={{
           paddingTop: "10px",
           textAlign: "center"
        }}>
          <Uu5Elements.Text 
            significance="subdued"
            colorScheme="grey">
            Data byla vypůjená pro školní účely z http://www.zebetinsky-dvur.cz/brno/sport/bowling

          </Uu5Elements.Text>
        </div>
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
