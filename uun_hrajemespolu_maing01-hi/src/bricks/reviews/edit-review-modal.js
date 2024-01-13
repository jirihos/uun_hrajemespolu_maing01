//@@viewOn:imports
import Uu5, { createVisualComponent, Utils, Content, PropTypes, useState } from "uu5g05";
import Config from "./config/config.js";
import Uu5Forms from "uu5g05-forms";
import Uu5Elements from "uu5g05-elements";
import Uu504 from "uu5g04";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
const Css = {
  main: () =>
    Config.Css.css(`
    .uu5-bricks-modal-header {
      padding: 16px 24px;
      background-color: #EEEEEE; 
      color: #333; 
      font-size: 24px; 
    }
    .uu5-bricks-modal-footer {
      padding: 16px 24px;
      display: flex;
      justify-content: flex-end;
      background-color: #FAFAFA; 
    }
    .uu5-bricks-modal-body {
      padding: 24px;
    }
    .uu5-forms-cancel-button,
    .uu5-forms-submit-button {
      margin-right: 16px;
    }
  `),
};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const EditReviewModal = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "EditReviewModal",
  nestingLevel: ["areaCollection", "area"],
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    reviewId: PropTypes.string,
    initialText: PropTypes.string,
    initialRating: PropTypes.number,
    onCreate: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    initialRating: 0,
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const { onCreate, onUpdate, onClose, reviewId } = props;
    const [rating, setRating] = useState(props.initialRating);

    function handleSubmit(event) {
      event.preventDefault();
      const values = { text: event.data.value.text, rating };
      if (!reviewId) {
        onCreate(values);
      } else {
        onUpdate(reviewId, values);
      }
    }

    function handleRatingClick(value) {
      setRating(value);
    }
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, EditReviewModal);

    return currentNestingLevel ? (
      <Uu5Forms.Form.Provider onSubmit={handleSubmit} {...attrs}>
        <Uu5Elements.Modal
          open={props.open}
          onClose={onClose}
          header={"Recenze " + (reviewId ? "upravit" : "přidat")}
          footer={
            <div>
              <Uu5Forms.CancelButton onClick={onClose} />
              <Uu5Forms.SubmitButton />
            </div>
          }
        >
          <Uu5Forms.Form.View>
            <Uu5Forms.FormTextArea name="text" label={props.nameLabel} initialValue={props.initialText} required />
            <Uu504.Bricks.Rating count={5} size="l" value={rating} onClick={handleRatingClick} colorSchema="blue" />
          </Uu5Forms.Form.View>
        </Uu5Elements.Modal>
      </Uu5Forms.Form.Provider>
    ) : null;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { EditReviewModal };
export default EditReviewModal;
//@@viewOff:exports
