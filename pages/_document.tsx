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
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

export default Document
