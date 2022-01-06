import { styled } from "src/stitches";
export default styled("nav", {
  // position
  position: "fixed",

  // box model
  display: "flex",

  // theme
  background: "#5575fe",

  // children
  a: { color: "white" },
  div: {
    space: 9,
    br: 12,
    display: "flex",
  },

  "@desktop": {
    top: 0,
    left: 0,
    bottom: 0,
    width: 60,
    flexDirection: "column",
    justify: "center",
    "a:first-child": { mb: "auto" },
    "a:last-child": { mt: "auto" },
  },

  "@mobile": {
    height: 60,
    justify: "space-evenly",
    a: {
      space: 9,
      br: 21,
      display: "flex",
      gap: 5,
    },
    "a:nth-child(1)": { display: "none" },
    "a:nth-child(4)": { display: "none" },
    "a:nth-child(5)": { display: "none" },

    "@web": {
      bottom: 30,
      left: 30,
      right: 30,
      width: "fit-content",
      br: 30,
      m: "auto",
    },
    "@app": {
      bottom: 0,
      left: 0,
      right: 0,
    },
  },
});
