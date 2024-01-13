//@@viewOn:imports
import { createVisualComponent, Utils, PropTypes,} from "uu5g05";
import Config from "./config/config.js";
import GalleryProvider from "../bricks/gallery-provider.js";
import GalleryView from "../bricks/gallery-view.js";
import ReviewListProvider from "../bricks/reviews/review-list-provider.js";
import ReviewListView from "../bricks/reviews/review-list-view.js";
import ReservationCalendar from "../bricks/reservation-calendar.js";
import Uu5Elements from "uu5g05-elements";
import SportsFieldReservationsList from "./sports-field-reservations-list.js";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
const Css = {
  main: () => Config.Css.css({}),
};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const SportsFieldView = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "SportsFieldView",
  nestingLevel: ["areaCollection", "area"],
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    dataObject: PropTypes.object.isRequired
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const { dataObject } = props;
    const { state, data } = dataObject;
    //@@viewOff:private
    console.log(data);
    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, SportsFieldView);

    return currentNestingLevel ? (
      <>
      {(state === "pending" || state === "pendingNoData") && <Uu5Elements.Pending />}
      {(state === "error" || state === "errorNoData" || state === "readyNoData") && <h1>Error</h1>} {/* TODO error */}
      {state === "ready" && (
        
        <>
          <GalleryProvider galleryId={data.galleryId}>
            {(dataObject) => <GalleryView dataObject={dataObject} />}
          </GalleryProvider> 

          <Uu5Elements.Block header={data.sportsFieldName} >
            {data.sportsFieldDesc}
          </Uu5Elements.Block>

          <ReservationCalendar sportsFieldId={data.sportsFieldId} />

          <SportsFieldReservationsList sportsFieldId={data.sportsFieldId}/>

          {/* TODO Reviews */}
       
        </>


      )}
    </>
  ) : null;
    //   <div {...attrs}>
    //     {/* <div id="testing_div" style={{maxWidth: "1200px", margin: "auto"}}>
    //     <GalleryProvider galleryId="655d0191de265134ec233d41">
    //         {(dataObject) => <GalleryView dataObject={dataObject} />}
    //       </GalleryProvider>
    //     </div>

    //     <div style={{padding: "50px 0"}}>
    //       <ReservationCalendar sportsFieldId="6574c57bd7b5a1cd5eda2c39" />
    //     </div>

    //     <ReviewListProvider sportsFieldId="655d0191de265134ec233d41">
    //     {(dataObject) => <ReviewListView dataObject={dataObject}/>}
    //     </ReviewListProvider> */}
    //   </div>
    // ) : null;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { SportsFieldView };
export default SportsFieldView;
//@@viewOff:exports
