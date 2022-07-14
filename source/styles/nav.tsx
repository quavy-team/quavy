import { styled } from "@nextui-org/react"

export default styled("nav", {
  position: "fixed",
  zIndex: 1,
  top: 0,
  bottom: 0,
  left: 0,

  width: 60,

  d: "flex",
  fd: "column",
  ai: "center",

  color: "black",
  bg: "white",

  div: { size: 60, p: 12 },
  a: { size: 36, br: 6, dflex: "center", color: "inherit" },
  "a:hover": { bg: "$link" },
  "div:first-child": { mb: "auto" },
  "div:last-child": { mt: "auto" },

  "&::before": {
    content: "",
    position: "absolute",
    zIndex: -1,
    top: 0,
    bottom: 0,
    right: 0,

    width: 10,

    linearGradient: "$rainbow",
    filter: "blur(1rem)",
  },

  "&::after": {
    content: "",
    position: "absolute",
    zIndex: -1,
    top: 0,
    bottom: 0,
    right: 0,

    width: 60,

    bg: "white",
  },
})
