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
  main: () =>
    Config.Css.css(`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 16px;
    padding: 24px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    background: #fff; 
  `),
  button: () =>
    Config.Css.css(`
    margin-top: 16px;
    padding: 8px 16px;
    font-size: 16px;
    line-height: 1.5;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;
    background-color: #2196F3;

    &:hover {
      background-color: #1976D2;
      color: '#fff';
    }
  `),
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
// uuIdentity={identity.uuIdentity}
    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
    const buttonAttrs = Css.button();
    const reviewListProviderAttrs = Css.reviewListProvider();
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, Reviews);

    return currentNestingLevel ? (
      <>
        { identity !== null && <ReviewProvider sportsFieldId={sportsFieldId} uuIdentity={identity.uuIdentity} >
          {(dataObject) => (
            <div {...attrs}>
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
              <Uu5Elements.Button {...buttonAttrs} onClick={handleAddReview}>
                {"Review " + (dataObject.state === "ready" ? "edit" : "add")}
              </Uu5Elements.Button>
            </div>
          )}
        </ReviewProvider>}
        <div {...reviewListProviderAttrs}>
          <RevieListProvider sportsFieldId={sportsFieldId}>
            {(dataObject) => <ReviewListView dataObject={dataObject} />}
          </RevieListProvider>
        </div>
      </>
    ) : null;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { Reviews };
export default Reviews;
//@@viewOff:exports
