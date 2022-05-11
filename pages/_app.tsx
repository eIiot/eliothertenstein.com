import '../styles/globals.css'
import SiteLayout from '../components/layouts/SiteLayout'
import type { Page } from '../types/page'
import type { AppProps } from 'next/app'

// this should give a better typing
type Props = AppProps & {
  Component: Page
}

const MyApp = ({ Component, pageProps, router }: Props) => {
  const getLayout =
    Component.getLayout ||
    ((page: JSX.Element) => <SiteLayout>{page}</SiteLayout>)

  return getLayout(<Component {...pageProps} />)
}

export default MyApp
