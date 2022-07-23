import { Html, Head, Main, NextScript } from 'next/document'

const Document = () => {
  return (
    <Html>
      <Head>
        <script
          data-domain="eliothertenstein.com"
          defer
          src="https://analytics.eliothertenstein.com/js/plausible.js"
        />
        <link href="favicon.svg" rel="icon" type="image/svg+xml" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

export default Document
