// eslint-disable-next-line @next/next/no-document-import-in-page
import Document, { Head, Html, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  manrope = "https://fonts.googleapis.com/css2?family=Manrope:wght@200..800";
  render() {
    return (
      <Html>
        <Head>
          <link rel="stylesheet" href={this.manrope}></link>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
