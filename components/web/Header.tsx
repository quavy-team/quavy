import { styled } from "@nextui-org/react"

export default styled("header", {
  position: "sticky",
  top: 0,

  h: 60,
  br: 12,

  d: "flex",
  ai: "center",
  jc: "space-evenly",

  linearGradient: "$gradient",

  b: {
    h: 36,
    px: 12,
    br: 6,
    bg: "white",
    cursor: "pointer",
  },
})
