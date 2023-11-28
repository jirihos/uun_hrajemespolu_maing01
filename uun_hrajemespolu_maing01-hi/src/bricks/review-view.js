//@@viewOn:imports
import { createVisualComponent, Utils, Content, useState } from "uu5g05";

import Config from "./config/config.js";
import UU5 from "uu5g04";
import Uu5Elements from "uu5g05-elements";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
const Css = {
  main: () => Config.Css.css({}),
  box: () =>
  Config.Css.css({
    width: "32%",
    marginLeft: "1%",
    marginTop: "1%",
    marginBottom: "1%",
    height: "33%",
  }),
  header: () =>
  Config.Css.css({
    width: "98%",
    height: "10%",
    marginLeft: "1%",
    marginRight: "1%",
    marginTop: "1%",
    display: "inline"
  }),
  username: () =>
  Config.Css.css({
    width: "80%",
    marginLeft: "10%",
    marginRight: "1%",
    marginTop: "1%",
    float: "left",
    fontSize: "25px",
  }),
  rating: () =>
  Config.Css.css({
    width: "80%",
    marginLeft: "5%",
    marginRight: "1%",
    marginTop: "1%",
    float: "right",
  }),
  body: () =>
  Config.Css.css({
    width: "90%",
    height: "80%",
    marginLeft: "5%",
  }),
  footer: () =>
  Config.Css.css({
    width: "90%",
    marginLeft: "5%",
    marginTop: "5%",
  }),
};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const ReviewView = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ReviewView",
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
    const { review, canDelete, children } = props;
    const [show, setShow] = useState(false);
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, ReviewView);

    return currentNestingLevel ? (
      <>
          
           <Uu5Elements.Box className={Css.box()}>

            <div className={Css.header()}>
              <Uu5Elements.Grid templateColumns="50% 50%">
                <Uu5Elements.Grid.Item className={Css.username()}>{review.uuIdentityName}</Uu5Elements.Grid.Item>
                <Uu5Elements.Grid.Item className={Css.rating()}>
{//                 <UU5.Bricks.Rating  colorSchema="default" value={review.rating}/>
  }
                </Uu5Elements.Grid.Item>
              </Uu5Elements.Grid>
            </div>

            <div className={Css.body()}>
              <Uu5Elements.Text className="reviewText">{review.text}</Uu5Elements.Text>
            </div>
          
            <div className={Css.footer()}>
            {(canDelete === false) && 
              <>
              <Uu5Elements.Button 
              className="reviewButton"
              onClick={ () => setShow(true) }
              >Delete</Uu5Elements.Button>
              
              </>
            }
            </div>
          
           </Uu5Elements.Box>

           <Uu5Elements.Dialog
           open={show}
           onClose={event => setShow(false)}
           header="Delete review"
           icon="uugds-delete"
           actionDirection="horizontal"
           actionList={[
            { children: "Confirm", colorScheme: "primary", significance: "highlighted" /*TODO DELETE*/},
            { children: "Cancel"}
            ]}
           ></Uu5Elements.Dialog>
        
      </>
    ) : null;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { ReviewView };
export default ReviewView;
//@@viewOff:exports
