//@@viewOn:imports
import { createVisualComponent, Utils, useState, useScreenSize } from "uu5g05";
import Plus4U5Elements from "uu_plus4u5g02-elements";

import { Rating } from "uu5g04-bricks";
import Uu5Elements from "uu5g05-elements";
import Config from "./config/config.js";
import Calls from "calls";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
const Css = {
  main: () => Config.Css.css({}),
  box: (screensize) => {
    let widthPercentage = screensize == "xs" || screensize == "s" || screensize == "m" ? "100%" : "50%";
    return Config.Css.css({
      width: widthPercentage,
      margin: "auto",
      height: "33%",
    });
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
  rating: () => Config.Css.css({
    marginRight: "16px",
  }),
  body: () =>
    Config.Css.css({
      width: "90%",
      height: "80%",
      marginLeft: "5%",
    }),
  reviewButton: () =>
    Config.Css.css({
      justifySelf: "end",
      margin: "14px",
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
    const { review, canDelete, session, reload } = props;
    const [show, setShow] = useState(false);
    const [screenSize] = useScreenSize();
    let size = "";
    //@@viewOff:private
    if (screenSize == "xs" || screenSize == "s" || screenSize == "m") {
      size = "s";
    } else {
      size = "m";
    }

    function handleDelete() {
      Calls.reviewDelete({
        id: review.id,
      }).then(() => {
        reload();
      });
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
            <Uu5Elements.Grid templateColumns="auto auto">
              {session === null && (
                <Uu5Elements.Grid.Item className={Css.username()}>{review.uuIdentityName}</Uu5Elements.Grid.Item>
              )}
              {session !== null && (
                <Plus4U5Elements.PersonItem className={Css.username()} uuIdentity={review.uuIdentity} />
              )}

              <Uu5Elements.Grid.Item justifySelf="end" className={Css.rating()}>
                <Rating colorSchema="blue" size={size} value={review.rating} />
              </Uu5Elements.Grid.Item>
            </Uu5Elements.Grid>
          </div>

          <div className={Css.body()}>
            <Uu5Elements.Text className={Config.Css.css({ whiteSpace: "pre-wrap" })}>{review.text}</Uu5Elements.Text>
          </div>

          <Uu5Elements.Grid className={Config.Css.css({ minHeight: "22px" })}>
            {(session?.uuIdentity === review.uuIdentity || canDelete) && (
              <>
                <Uu5Elements.Button className={Css.reviewButton()} onClick={() => setShow(true)}>
                  Smazat
                </Uu5Elements.Button>
              </>
            )}
          </Uu5Elements.Grid>
        </Uu5Elements.Box>

        <Uu5Elements.Dialog
          open={show}
          onClose={(event) => setShow(false)}
          header="Delete review"
          icon="uugds-delete"
          actionDirection="horizontal"
          actionList={[
            { children: "Confirm", colorScheme: "red", significance: "highlighted", onClick: handleDelete },
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
