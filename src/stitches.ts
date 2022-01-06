import { createStitches } from "@stitches/react";
export const { styled, css } = createStitches({
  utils: {
    // box model
    size: (value) => ({ width: value, height: value }),
    space: (value) => ({ margin: value, padding: value }),
    br: (value) => ({ borderRadius: value }),

    m: (margin) => ({ margin }),
    mt: (marginTop) => ({ marginTop }),
    mr: (marginRight) => ({ marginRight }),
    mb: (marginBottom) => ({ marginBottom }),
    ml: (marginLeft) => ({ marginLeft }),

    p: (padding) => ({ padding }),
    pt: (paddingTop) => ({ paddingTop }),
    pr: (paddingRight) => ({ paddingRight }),
    pb: (paddingBottom) => ({ paddingBottom }),
    pl: (paddingLeft) => ({ paddingLeft }),

    // display
    align: (alignItems) => ({ alignItems }),
    justify: (justifyContent) => ({ justifyContent }),

    // theme
    bg: (background) => ({ background }),
    bgBlur: (value) => ({ background: `${value}40` }),
    linearG: (value) => ({ backgroundImage: `linear-gradient(${value})` }),
    radialG: (value) => ({ backgroundImage: `radial-gradient(${value})` }),

    // utils
    hover: (value) => ({ "&:hover": value }),
  },
  media: {
    web: "(display-mode: browser)",
    app: "(display-mode: standalone)",
    desktop: "(min-aspect-ratio: 1/1)",
    mobile: "(max-aspect-ratio: 1/1)",
  },
});
