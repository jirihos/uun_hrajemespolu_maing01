//@@viewOn:imports
import Uu5, { createVisualComponent, Utils, Content, PropTypes } from "uu5g05";
import Config from "./config/config.js";
import Uu5Forms from "uu5g05-forms";
import Uu5Elements from "uu5g05-elements";
import Uu504 from "uu5g04";
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
    onclose: PropTypes.func.isRequired,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const { onCreate, onUpdate, onClose } = props;

    function handleSubmit(event) {
      const values = { ...event.data.value };
      console.log("values", values);
      onUpdate(values);
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
          onCreate={onCreate}
          onUpdate={onUpdate}
          onClose={onClose}
          header={props.modalTitle}
          footer={
            <div>
              <Uu5Forms.CancelButton onClick={onClose} />
              <Uu5Forms.SubmitButton />
            </div>
          }
        >
          <Uu5Forms.Form.View>
            <Uu5Forms.FormTextArea name="reviewText" label={props.nameLabel} required />
            <Uu504.Bricks.Rating count="5" size="l" value={3} />
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
