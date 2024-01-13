//@@viewOn:imports
import Uu5, { createVisualComponent, Utils, PropTypes, useState, useSession } from "uu5g05";
import Config from "./config/config.js";
import ReviewProvider from "./reviews/review-provider.js";
import RevieListProvider from "./reviews/review-list-provider.js";
import EditReviewModal from "./reviews/edit-review-modal.js";
import ReviewListView from "./reviews/review-list-view.js";
import Uu5Elements from "uu5g05-elements";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
const Css = {
  main: () =>
    Config.Css.css({}),
  button: () =>
    Config.Css.css({
      height: "75px",
      display: "grid",
      placeItems: "center",
    }),
  reviewListProvider: () =>
    Config.Css.css(`
    width: 100%; 
    display: flex;
    flex-direction: column;
    align-items: center;
  `),
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
    const reviewListProviderAttrs = Css.reviewListProvider();
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, Reviews);

    const [counter, setCounter] = useState(0);

    return currentNestingLevel ? (
      <Uu5Elements.Box {...attrs}>
        {identity !== null && (
          <ReviewProvider sportsFieldId={sportsFieldId} uuIdentity={identity.uuIdentity}>
            {(dataObject) => (
              <div>
                {open && (
                  <EditReviewModal
                    sportsFieldId={sportsFieldId}
                    reviewId={dataObject.state === "ready" ? dataObject.data.id : null}
                    open={open}
                    onClose={() => setOpen(false)}
                    onCreate={async (values) => {
                      setOpen(false);
                      await dataObject.handlerMap.create(values);
                      setCounter(counter + 1);
                    }}
                    onUpdate={async (reviewId, values) => {
                      setOpen(false);
                      values.id = reviewId;
                      await dataObject.handlerMap.update(values);
                      setCounter(counter + 1);
                    }}
                    initialText={dataObject.state === "ready" ? dataObject.data.text : undefined}
                    initialRating={dataObject.state === "ready" ? dataObject.data.rating : undefined}
                  />
                )}
                <div className={Css.button()}>
                  <Uu5Elements.Button onClick={handleAddReview}>
                    {(dataObject.state === "ready" ? "Upravit" : "Přidat")+" recenzi"}
                  </Uu5Elements.Button>
                </div>
              </div>
            )}
          </ReviewProvider>
        )}
        <div>
          <RevieListProvider sportsFieldId={sportsFieldId} key={counter}>
            {(dataObject) => <ReviewListView dataObject={dataObject} />}
          </RevieListProvider>
        </div>
      </Uu5Elements.Box>
    ) : null;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { Reviews };
export default Reviews;
//@@viewOff:exports
