//@@viewOn:imports
import { createVisualComponent, Utils, Content, useState, useScreenSize } from "uu5g05";
import Plus4U5Elements from "uu_plus4u5g02-elements";

import { Rating } from "uu5g04-bricks";
import Uu5Elements from "uu5g05-elements";
import Config from "./config/config.js";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
const Css = {
  main: () => Config.Css.css({}),
  box: (screensize) => {
    if (screensize == "xs" || screensize == "s" || screensize == "m") {
      return Config.Css.css({
        width: "98%",
        marginLeft: "1%",
        marginTop: "1%",
        marginBottom: "1%",
        height: "33%",
      });
    } else {
      return Config.Css.css({
        width: "31%",
        marginLeft: "1%",
        marginTop: "1%",
        marginBottom: "1%",
        height: "33%",
      });
    }
  },
  header: () =>
    Config.Css.css({
      width: "98%",
      height: "10%",
      marginLeft: "1%",
      marginRight: "1%",
      marginTop: "1%",
      display: "inline",
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
  rating: (screensize) => {
    if (screensize == "xs" || screensize == "s") {
      return Config.Css.css({
        width: "50%",
        marginLeft: "30%",
        marginRight: "1%",
        marginTop: "3%",
      });
    } else if (screensize == "m") {
      return Config.Css.css({
        width: "50%",
        marginLeft: "60%",
        marginRight: "1%",
        marginTop: "3%",
      });
    } else {
      return Config.Css.css({
        width: "50%",
        marginLeft: "40%",
        marginRight: "1%",
        marginTop: "3%",
      });
    }
  },
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
  reviewButton: () =>
    Config.Css.css({
      float: "right",
      marginBottom: "1%",
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
    const { review, canDelete, session, children } = props;
    const [show, setShow] = useState(false);
    const [screenSize] = useScreenSize();
    let size = "";
    //@@viewOff:private
    if (screenSize == "xs" || screenSize == "s" || screenSize == "m") {
      size = "s";
    } else {
      size = "m";
    }

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, ReviewView);

    return currentNestingLevel ? (
      <>
        <Uu5Elements.Box className={Css.box(screenSize)}>
          <div className={Css.header()}>
            <Uu5Elements.Grid templateColumns="50% 50%">
              {session === null && (
                <Uu5Elements.Grid.Item className={Css.username()}>{review.uuIdentityName}</Uu5Elements.Grid.Item>
              )}
              {session !== null && (
                <Plus4U5Elements.PersonItem className={Css.username()} uuIdentity={review.uuIdentity} />
              )}

              <Uu5Elements.Grid.Item className={Css.rating(screenSize)}>
                <Rating colorSchema="blue" size={size} value={review.rating} />
              </Uu5Elements.Grid.Item>
            </Uu5Elements.Grid>
          </div>

          <div className={Css.body()}>
            <Uu5Elements.Text className="reviewText">{review.text}</Uu5Elements.Text>
          </div>

          <div className={Css.footer()}>
            {canDelete === false /*TODO Upravit po fixnutí profileListu na TRUE*/ && (
              <>
                <Uu5Elements.Button className={Css.reviewButton()} onClick={() => setShow(true)}>
                  Delete
                </Uu5Elements.Button>
              </>
            )}
          </div>
        </Uu5Elements.Box>

        <Uu5Elements.Dialog
          open={show}
          onClose={(event) => setShow(false)}
          header="Delete review"
          icon="uugds-delete"
          actionDirection="horizontal"
          actionList={[
            { children: "Confirm", colorScheme: "primary", significance: "highlighted" /*TODO DELETE*/ },
            { children: "Cancel" },
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
