//@@viewOn:imports
import { createVisualComponent, Utils, useSession } from "uu5g05";
import { useSystemData } from "uu_plus4u5g02";
import Uu5Elements from "uu5g05-elements";
import Config from "./config/config.js";
import ReviewView from "./review-view.js";
import Error from "../error.js"
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
    flexWrap: "wrap",
    marginBottom: "25px",
    marginTop: "20px",
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

    const { identity } = useSession();
    const systemDataObject = useSystemData();

    let profileList = systemDataObject?.data?.profileData?.uuIdentityProfileList;
    let isExecutive = profileList !== undefined ? profileList.includes("Executives") : false;
    //@@viewOff:private


    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, ReviewListView);

    return currentNestingLevel ? (
      <>

      <Uu5Elements.Grid className={Css.wrapper()} >
        {(state === "pending" || state === "pendingNoData") && <Uu5Elements.Pending />}
        {(state === "error" || state === "errorNoData" || state === "readyNoData") && <Error message='Chyba při načítání recenzí' />}
        {state === "ready" && (
          <>
            {dataObject.data.itemList.map((review) => {
              return (
                <ReviewView key={review.id} review={review} canDelete={isExecutive} session={identity} reload={() => { dataObject.handlerMap.load(); }} />
              )
            })}

            {dataObject.data.itemList.length === 0 && (
              <div className={Config.Css.css({ width: "100%", textAlign: "center" })}>
                <h2>Žádné recenze</h2>
              </div>
            )}
          </>
        )}

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
