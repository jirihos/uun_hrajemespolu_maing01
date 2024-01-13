//@@viewOn:imports
import { createVisualComponent, useMemo, useRoute, Utils, useSession } from "uu5g05";
import Plus4U5App from "uu_plus4u5g02-app";
import Config from "./config/config.js";
import Uu5Elements from "uu5g05-elements";
import image from '../assets/hrajemeSpoluLogoWidth.png'
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
const Css = {
  main: () => Config.Css.css({
    backgroundColor: "#F0F0F0",
    height: "59px"
  }),
};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const RouteBar = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "RouteBar",
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

    const appActionList = useMemo(() => {
      const actionList = [
        {
          children: "Sportoviště",
          onClick: () => setRoute("sportsFields"),
        }
      ];

      if (identity) {
        actionList.unshift({
          children: "Moje rezervace",
          onClick: () => setRoute("reservationList"),
        });
      }

      return actionList;
    }, [identity]);
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render

    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());

    return <div>
      <Uu5Elements.Grid {...attrs} templateColumns="auto auto 80px" alignItems="center" >
        <Uu5Elements.Grid.Item>
          <Uu5Elements.Link href="home">
            <img href='home' src={image} width="150px" />
          </Uu5Elements.Link>
        </Uu5Elements.Grid.Item>
        <Uu5Elements.Grid.Item >
          <Uu5Elements.ActionGroup itemList={appActionList}></Uu5Elements.ActionGroup>
        </Uu5Elements.Grid.Item>
      </Uu5Elements.Grid>
      <Plus4U5App.Plus4UButton />
    </div>
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { RouteBar };
export default RouteBar;
//@@viewOff:exports
