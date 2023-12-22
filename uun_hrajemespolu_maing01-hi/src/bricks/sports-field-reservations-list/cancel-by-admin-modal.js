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
    const { children } = props;
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, CancelByAdminModal);

    return currentNestingLevel ? (
      <div {...attrs}>
           <Modal 
                  header={props.header}
                  onClose={props.onClose}  
                  open={props.open}
                  icon={<Uu5Elements.Svg code="uugdssvg-svg-delete" />}
                    >
                    {(modal) => (
                  <Uu5Forms.Form
                  onSubmit={(e) => {
                    props.onSubmit(e.data.value, null, 2);
                  }}
                >
                  <Uu5Elements.Block
                    footer={
                      <Uu5Elements.Grid
                        templateColumns={{ xs: "1fr", s: "auto" }}
                        columnGap={Uu5Elements.UuGds.SpacingPalette.getValue(["fixed", "c"])}
                      >
                        <Uu5Forms.SubmitButton colorScheme="warning"> Potvrdit zrušení </Uu5Forms.SubmitButton>
                      </Uu5Elements.Grid>
                    }
                  >
                    <div className={Config.Css.css({
                      display: "grid",
                      rowGap: 8,
                      gridTemplateRows: "auto",
                      marginBottom: 8,
                    })}>
                      <Uu5Forms.FormText name="cancelReason" label={props.info}  required />
                    </div>
                  </Uu5Elements.Block>
                </Uu5Forms.Form> 
                )}
             </Modal>
        <Content nestingLevel={currentNestingLevel}>{children}</Content>
      </div>
    ) : null;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { CancelByAdminModal };
export default CancelByAdminModal;
//@@viewOff:exports
