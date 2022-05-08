import '../styles/globals.css'
import SiteLayout from '../components/layouts/SiteLayout'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps, router }: AppProps) {
  const getLayout =
    Component.getLayout ||
    ((page: JSX.Element) => <SiteLayout>{page}</SiteLayout>)

  return getLayout(<Component {...pageProps} />)
}

export default MyApp
