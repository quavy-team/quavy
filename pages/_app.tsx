import { globalCss, NextUIProvider } from "@nextui-org/react";
import { LayoutGroup } from "framer-motion";
import { ThemeProvider } from "next-themes";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import themes from "src/themes";
// import "styles/styles.sass";

const globals = globalCss({
  "*": { transition: "250ms" },
  html: { background: "#f5faff" },
});

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if (!navigator.serviceWorker) return;
    navigator.serviceWorker.register("/sw.js");
  }, []);
  globals();
  return (
    <ThemeProvider attribute="class" value={themes}>
      <NextUIProvider>
        <LayoutGroup>
          <Component {...pageProps} />
        </LayoutGroup>
      </NextUIProvider>
    </ThemeProvider>
  );
}
