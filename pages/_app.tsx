import { globalCss, NextUIProvider } from "@nextui-org/react";
import { ThemeProvider } from "next-themes";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import Layout from "src/layout";
import themes from "src/themes";
// import "styles/styles.sass";

const globals = globalCss({
  "*": { transition: "250ms" },
  // bg #f5faff
  html: { cursor: "url('/cursor.svg'), auto" },
  a: { cursor: "url('/pointer.svg'), pointer" },
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
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </NextUIProvider>
    </ThemeProvider>
  );
}
