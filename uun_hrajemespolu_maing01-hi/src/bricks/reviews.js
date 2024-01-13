//@@viewOn:imports
import Uu5, { createVisualComponent, Utils, Content, PropTypes, useState, useSession } from "uu5g05";
import Config from "./config/config.js";
import ReviewProvider from "./reviews/review-provider.js";
import RevieListProvider from "./reviews/review-list-provider.js";
import EditReviewModal from "./reviews/edit-review-modal.js";
import ReviewListView from "./reviews/review-list-view.js";
import Uu5Elements, { Button } from "uu5g05-elements";
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

const Reviews = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Reviews",
  nestingLevel: ["areaCollection", "area"],
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    sportsFieldId: PropTypes.string.isRequired,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const { sportsFieldId } = props;

    const [open, setOpen] = useState(false);

    const { identity } = useSession();

    function handleAddReview() {
      setOpen(true);
    }
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, Reviews);

    return currentNestingLevel ? (
      <>
        <ReviewProvider sportsFieldId={sportsFieldId} uuIdentity={identity.uuIdentity}>
          {(dataObject) => (
            <div>
              <EditReviewModal
                sportsFieldId={sportsFieldId}
                open={open}
                onClose={() => setOpen(false)}
                onCreate={(values) => {
                  setOpen(false);
                  dataObject.handlerMap.create(values);
                }}
                onUpdate={(reviewId, values) => setOpen(false)}
              />
              <Uu5Elements.Button onClick={handleAddReview}>
                {"Review " + (dataObject.state === "ready" ? "edit" : "add")}
              </Uu5Elements.Button>
            </div>
          )}
        </ReviewProvider>
        <RevieListProvider sportsFieldId={sportsFieldId}>
          {(dataObject) => <ReviewListView dataObject={dataObject} />}
        </RevieListProvider>
      </>
    ) : null;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { Reviews };
export default Reviews;
//@@viewOff:exports
