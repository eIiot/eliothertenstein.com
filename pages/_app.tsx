import '../styles/globals.css'
import type { AppProps } from 'next/app'
import SiteLayout from '../components/layouts/SiteLayout'

function MyApp({ Component, pageProps, router }: AppProps) {
  const getLayout =
    Component.getLayout ||
    ((page: JSX.Element) => <SiteLayout>{page}</SiteLayout>)

  return getLayout(<Component {...pageProps} />)
}

export default MyApp
