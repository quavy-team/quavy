import { styled } from "./stitches";
export default styled("main", {
  minHeight: "100vh",
  p: "1rem",

  display: "flex",
  flexDirection: "column",
  align: "flex-start",
  justify: "center",

  "@desktop": {
    position: "absolute",
    left: 90,
    right: 0,
  },
});
