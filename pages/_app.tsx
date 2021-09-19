import { AnimateSharedLayout } from "framer-motion";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import "styles/styles.sass";

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => void navigator.serviceWorker.register("/sw.js"), []);
  return (
    <AnimateSharedLayout>
      <Component {...pageProps} />
    </AnimateSharedLayout>
  );
}
