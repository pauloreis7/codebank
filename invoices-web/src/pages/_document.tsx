import Document, { Head, Html, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />

          <meta charSet="UTF-8" />

          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Lexend:wght@400;600;700&display=swap"
            rel="stylesheet"
          />

          <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}