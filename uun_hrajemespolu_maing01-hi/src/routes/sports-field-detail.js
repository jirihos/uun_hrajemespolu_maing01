//@@viewOn:imports
import { createVisualComponent, Utils } from "uu5g05";
import Config from "./config/config.js";
import GalleryProvider from "../bricks/gallery-provider.js";
import GalleryView from "../bricks/gallery-view.js";
import ReviewListProvider from "../bricks/reviews/review-list-provider.js";
import ReviewListView from "../bricks/reviews/review-list-view.js";
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

const SportsFieldDetail = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "SportsFieldDetail",
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
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, SportsFieldDetail);

    return currentNestingLevel ? (
      <>
      <div id="testing_div" style={{maxWidth: "1200px", margin: "auto"}}>
        <GalleryProvider galleryId="655d0191de265134ec233d41" {...attrs}>
          {(dataObject) => <GalleryView dataObject={dataObject} />}
        </GalleryProvider>
      </div>

      <ReviewListProvider sportsFieldId="655d0191de265134ec233d41" {...attrs}>
      {(dataObject) => <ReviewListView dataObject={dataObject}/>}
      </ReviewListProvider>
      </>
    ) : null;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { SportsFieldDetail }
export default SportsFieldDetail;
//@@viewOff:exports
