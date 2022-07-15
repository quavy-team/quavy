import Color from "color"

const palette = {
  yellow: "#FEDE55",
  green: "#55FE89",
  cyan: "#55CAFE",
  blue: "#5575FE",
  indigo: "#8955FE",
  purple: "#DE55FE",
  pink: "#FE55C9",
  red: "#FE5575",
  orange: "#FE8955",
}

const theme = {
  primary: "blue",
  secondary: "orange",
  tertiary: "yellow",
  success: "green",
  warning: "orange",
  error: "red",
}

const shades = [900, 800, 700, 600, 500, 400, 300, 200, 100, 50]

let a = {
  50: 96,
  100: 91,
  200: 86,
  300: 81,
  400: 76,
  500: 71,
  600: 66,
  700: 48,
  800: 32,
  900: 16,
}

const baseColors = Object.entries(palette).reduce((base, [key, value]) => {
  return {
    [key + 50]: Color(value).lightness(96).toString(), // bg
    [key + 100]: Color(value).lightness(91).toString(), // bg on hover
    [key + 200]: Color(value).lightness(86).toString(), // active bg
    [key + 300]: Color(value).lightness(81).toString(), // border
    [key + 400]: Color(value).lightness(76).toString(), // outline
    [key + 500]: Color(value).lightness(71).toString(), // border on hover
    [key + 600]: Color(value).lightness(66).toString(), // solid bg
    [key + 700]: Color(value).lightness(56).toString(), // solig bg on hover
    [key + 800]: Color(value).lightness(36).toString(), // low contrast text
    [key + 900]: Color(value).lightness(16).toString(), // high contrast text
  }
}, {})

export default Object.entries(theme).reduce((previous, [key, value]) => {
  return {
    ...previous,
    [key]: `$${value}600`,
    [key + "Light"]: `$${value}200`,
    [key + "LightHover"]: `$${value}300`,
    [key + "LightActive"]: `$${value}400`,
    [key + "LightContrast"]: `$${value}600`,
    [key + "Shadow"]: `$${value}500`,
    [key + "Border"]: `$${value}500`,
    [key + "BorderHover"]: `$${value}600`,
    [key + "SolidHover"]: `$${value}700`,
    [key + "SolidContrast"]: `$white`,
  }
}, baseColors)