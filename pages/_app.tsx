import '../styles/globals.css'
import 'mapbox-gl/dist/mapbox-gl.css'
import { getLayout as getSiteLayout } from '../components/layout/SiteLayout'
import type { Page } from '../types/page'
import type { AppProps } from 'next/app'

// this should give a better typing
type Props = AppProps & {
  Component: Page
}

const MyApp = ({ Component, pageProps, router }: Props) => {
  const getLayout =
    Component.getLayout || ((page: JSX.Element) => getSiteLayout(page))

  return getLayout(<Component {...pageProps} />)
}

export default MyApp
