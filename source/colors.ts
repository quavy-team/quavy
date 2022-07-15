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
  let s = [1, 4, 9, 16, 25, 36, 49, 64, 81]
  let z = [99, 96, 91, 84, 75, 64, 51, 36, 19]
  // 6*6+8*8=5*5*4
  // const colors = shades.map((shade, i) => ({
  //   [key + shade]: Color(value)
  //     .lightness(key > 600 ? )
  //     .hex()
  //     .toString(),
  // }))

  // return { ...base, ...colors.reduce((x, y) => ({ ...x, ...y }), {}) }
  return {
    [key + 50]: Color(value).lightness(96).toString(),
    [key + 100]: Color(value).lightness(91).toString(),
    [key + 200]: Color(value).lightness(86).toString(),
    [key + 300]: Color(value).lightness(81).toString(),
    [key + 400]: Color(value).lightness(76).toString(),
    [key + 500]: Color(value).lightness(71).toString(),
    [key + 600]: Color(value).lightness(66).toString(),
    [key + 700]: Color(value).lightness(46).toString(),
    [key + 800]: Color(value).lightness(26).toString(),
    [key + 900]: Color(value).lightness(6).toString(),
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