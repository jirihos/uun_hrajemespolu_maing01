//@@viewOn:imports
import { createVisualComponent, Utils, useState, Content, useSession} from "uu5g05";
import { useSubAppData, useSystemData } from "uu_plus4u5g02";
import Uu5Elements from "uu5g05-elements";
import Config from "./config/config.js";
import ReviewView from "./review-view.js";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
const Css = {
  main: () => Config.Css.css({}),
  wrapper: () =>
  Config.Css.css({
    width: "90%",
    height: "100%",
    marginLeft: "5%",
    display: "inline-flex",
    flexWrap: "wrap"
  }),
};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const ReviewListView = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ReviewListView",
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
    const { dataObject } = props;
    const { state, data } = dataObject;
    //@@viewOff:private
    let profileList = "";
    let canDeleteReservation = "";

    const { identity } = useSession();

    const systemDataObject = useSystemData();
    console.log(systemDataObject)
    if (identity !== null) {
    profileList = systemDataObject.data.profileData.uuIdentityProfileList;
    canDeleteReservation = profileList.includes("Authenticated") || profileList.includes("Executives");
    }

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, ReviewListView);

    return currentNestingLevel ? (
      <>

      <Uu5Elements.Grid className={Css.wrapper()} >
        {(state === "pending" || state === "pendingNoData") && <Uu5Elements.Pending />}
        {(state === "error" || state === "errorNoData" || state === "readyNoData") && <h1>Error</h1>} {/* TODO error */}
        {state === "ready" && (

          dataObject.data.itemList.map((review) => {
             return (
             <ReviewView key={review.id} review={review} canDelete={canDeleteReservation} session={identity} />
             )}
          ))
        }

      </Uu5Elements.Grid>
      </>
    ) : null;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { ReviewListView };
export default ReviewListView;
//@@viewOff:exports
