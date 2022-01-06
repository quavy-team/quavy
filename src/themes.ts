import { createTheme, Theme } from "@nextui-org/react";

const flow = (min: number, max = min > 16 ? min * 2 : min * 1.5) => {
  let x = (max - min) / (1920 - 375);
  let y = max - 1920 * x;
  let vw = Math.round(1000 * x) / 10 + "vw";
  let px = Math.round(y) + "px";
  let xs = Math.round(320 * x + y) + "px";
  let xl = Math.round(2560 * x + y) + "px";
  return `clamp(${xs}, calc(${vw} + ${px}), ${xl})`;
};

const theme: Theme["theme"] = {
  colors: {
    primary: "#5575FE",
    secondary: "#fede55",

    success: "#55FE8A",
    warning: "#FE8A55",
    error: "#FE5575",
  },
  fonts: { sans: "Manrope" },
  fontSizes: {
    tiny: flow(12),
    xs: flow(14),
    base: flow(16),
    sm: flow(20),
    md: flow(24),
    lg: flow(36),
    xl: flow(48),
  },
};

const light = createTheme({ type: "light", theme });
const dark = createTheme({ type: "dark", theme });
const themes = {
  light: light.className,
  dark: dark.className,
};

export default themes;
