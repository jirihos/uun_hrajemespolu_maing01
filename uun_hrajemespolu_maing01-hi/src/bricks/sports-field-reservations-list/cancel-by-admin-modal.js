//@@viewOn:imports
import Uu5, { createVisualComponent, Utils, Content } from "uu5g05";
import { Modal } from "uu5g05-elements";
import Uu5Elements from "uu5g05-elements";
import Config from "./config/config.js";
import Uu5Forms from "uu5g05-forms";

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


const CancelByAdminModal = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "CancelByAdminModal",
  nestingLevel: ["areaCollection", "area"],
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    open: false,
    onClose: () => {},
    onSubmit: () => {},
    header: "",
    icon: null,
    info: "",
  },
  //@@viewOff:defaultProps

  render(props) {
   //@@viewOn:private
   const { onSubmit, onClose } = props;

   function handleSubmit(event) {
     const values = { ...event.data.value };
     console.log("values", values)
     onSubmit(values);
   }

   //@@viewOff:private

   //@@viewOn:interface
   //@@viewOff:interface

   //@@viewOn:render
   const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
   const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, CancelByAdminModal);

   return currentNestingLevel ? (
     <Uu5Forms.Form.Provider onSubmit={handleSubmit} {...attrs}>
       <Uu5Elements.Modal
         open={props.open}
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
           <Uu5Forms.FormText name="cancelReason" label={props.nameLabel} minLength={1} maxLength={100} required autoFocus />
         </Uu5Forms.Form.View>
       </Uu5Elements.Modal>
     </Uu5Forms.Form.Provider>
   ) : null;
   //@@viewOff:render
 },
});

//@@viewOn:exports
export { CancelByAdminModal };
export default CancelByAdminModal;
//@@viewOff:exports
