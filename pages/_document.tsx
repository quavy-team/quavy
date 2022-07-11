/* eslint-disable @next/next/no-document-import-in-page */
import { CssBaseline } from "@nextui-org/react"
import Document, { Head, Html, Main, NextScript } from "next/document"

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    return Document.getInitialProps(ctx)
  }

  render() {
    return (
      <Html>
        <Head>
          {CssBaseline.flush()}
          <link rel="manifest" href="/manifest.json" />
          <link rel="icon" href="/16px.png" sizes="16x16" />
          <link rel="icon" href="/32px.png" sizes="32x32" />
          <link rel="icon" href="/favicon.ico" sizes="48x48" />
          <link rel="apple-touch-icon" href="/128x128.png" sizes="128x128" />
          <link rel="apple-touch-icon" href="/192x192.png" sizes="192x192" />
          <link
            rel="apple-touch-startup-image"
            href="/512x512.png"
            sizes="512x512"
          />
          <link
            rel="apple-touch-startup-image"
            href="/1024x1024.png"
            sizes="1024x1024"
          />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="black-translucent"
          />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="theme-color" content="#fede55" />
          <meta name="description" content="Welcome to Quavy app" />
          {/* <meta
            httpEquiv="refresh"
            media="(orientation: portrait)"
            content="0; url=/app"
          /> */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
