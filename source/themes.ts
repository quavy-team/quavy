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
    // brand
    primary: "#FEDE55",
    secondary: "#FF9E61",
    accent: "#5575FE",
    gradient: "to right, $primary, $secondary",
    // semantic
    success: "#55FE89",
    warning: "#FE8955",
    error: "#FE5575",
    // highlights
    link: "#619EFF",
    selection: "#FEDE55",
    code: "#FE55CA",
    // others
    rainbow: `hsl(217deg 100% 69%) 0%,
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
              hsl(23deg 100% 69%) 100%`
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
}

const light = createTheme({ type: "light", theme: {
  ...theme,
  colors: {
    ...theme.colors,
    background: "#FFFFFF",
    foreground: "#F5FAFF"
  }
} })

const dark = createTheme({ type: "dark", theme: {
  ...theme,
  colors: {
    ...theme.colors,
    // add colors
  }
} })


const themes = {
  light: light.className,
  dark: dark.className,
}

export default light
