import colors from "@colors"
import { createTheme, Theme } from "@nextui-org/react"

const PHI = (1 + Math.sqrt(5)) / 2

const flow = (min: number, max = min * PHI) => {
  let x = (max - min) / (1920 - 375)
  let y = max - 1920 * x
  let vw = Math.round(1000 * x) / 10 + "vw"
  let px = Math.round(y) + "px"
  let xs = Math.round(320 * x + y) + "px"
  let xl = Math.round(2560 * x + y) + "px"
  return `clamp(${xs}, ${vw} + ${px}, ${xl})`
}


const theme: Theme["theme"] = {
  colors: {
    ...colors,
    // brand
    // primary: "#5575FE",
    // secondary: "#FF9E61",
    // accent: "#FEDE55",
    // gradient: "to right, $secondary, $accent",
    // // semantic
    // success: "#55FE89",
    // warning: "#FE8955",
    // error: "#FE5575",
    // // highlights
    // link: "$cyan600",
    // selection: "#blue200",
    // code: "#FE55CA",
    // others
    rainbow: String.raw`hsl(217deg 100% 69%) 0%,
              hsl(232deg 100% 69%) 19%,
              hsl(247deg 100% 69%) 27%,
              hsl(262deg 100% 69%) 34%,
              hsl(277deg 100% 69%) 41%,
              hsl(292deg 100% 69%) 47%,
              hsl(308deg 100% 69%) 53%,
              hsl(323deg 100% 69%) 59%,
              hsl(338deg 100% 69%) 66%,
              hsl(353deg 100% 69%) 73%,
              hsl(8deg 100% 69%) 81%,
              hsl(23deg 100% 69%) 100%`,
  },
  fonts: {
    sans: "ManropeVariable",
    mono: "ManropeVariable",
  },
  fontSizes: {
    // tiny: flow(12),
    // xs: flow(14),
    base: flow(16),
    // sm: flow(20),
    // md: flow(24),
    // lg: flow(36),
    // xl: flow(48),
  },
  radii: {
    xs: "9px",
    sm: "12px",
    md: "14px",
    base: "18px",
    lg: "18px",
    xl: "22px",
  }
}

const light = createTheme({
  type: "light",
  theme: {
    ...theme,
    colors: {
      ...theme.colors,
      // background: "#FFFFFF",
      // foreground: "#F5FAFF",
    },
  },
})

const dark = createTheme({
  type: "dark",
  theme: {
    ...theme,
    colors: {
      ...theme.colors,
      // add colors
    },
  },
})

const themes = {
  light: light.className,
  dark: dark.className,
}

export default light
