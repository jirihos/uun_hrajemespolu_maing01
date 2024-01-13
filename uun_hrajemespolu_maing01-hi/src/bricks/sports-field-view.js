//@@viewOn:imports
import { createVisualComponent, Utils, PropTypes } from "uu5g05";
import { useSystemData } from "uu_plus4u5g02";
import Config from "./config/config.js";
import GalleryProvider from "../bricks/gallery-provider.js";
import GalleryView from "../bricks/gallery-view.js";
import ReservationCalendar from "../bricks/reservation-calendar.js";
import Uu5Elements from "uu5g05-elements";
import SportsFieldReservationsList from "./sports-field-reservations-list.js";
import Reviews from "./reviews.js";
import Error from "./error.js"
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
    dataObject: PropTypes.object.isRequired,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const { dataObject } = props;
    const { state, data } = dataObject;
    const systemDataObject = useSystemData();
    
    let profileList = systemDataObject?.data?.profileData?.uuIdentityProfileList;
    let isExecutives = profileList !== undefined ? profileList.includes("Executives") : false;

    const { a, b, c, d } = Uu5Elements.useSpacing();
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
      {(state === "error" || state === "errorNoData" || state === "readyNoData") && <Error message='Chyba při načítání sportoviště' />}
      {state === "ready" && (
        
        <div style={{
          paddingLeft: d,
          paddingBottom: d,
          paddingRight: d,
        }}>
          <div className={Config.Css.css({ margin: "auto", maxWidth: "1280px" })}>
            <GalleryProvider galleryId={data.galleryId}>
              {(dataObject) => <GalleryView dataObject={dataObject} />}
            </GalleryProvider>
          </div>
          
          <br/>
          <Uu5Elements.Block header={(
            <Uu5Elements.Text category="story" segment="heading" type="h2">
              {data.sportsFieldName}
            </Uu5Elements.Text>
          )}
            card="full"
            significance="distinct"
          >
            <Uu5Elements.Text category="interface" segment="content" type="medium">
              {data.sportsFieldDesc}
            </Uu5Elements.Text>
          </Uu5Elements.Block>

          <br />
          <div className={Config.Css.css({ margin: "30px 0" })}>
            <ReservationCalendar sportsFieldId={data.id} sportsFieldName={data.sportsFieldName} />
          </div>
          
          { isExecutives && (<SportsFieldReservationsList sportsFieldId={data.id}/>)}
          <br />

          <Reviews sportsFieldId={data.id} />
        </div>


      )}
    </>
  ) : null;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { SportsFieldView };
export default SportsFieldView;
//@@viewOff:exports
