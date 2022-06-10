import ErrorNotFound from '../components/elements/ErrorNotFound'
import { getLayout } from '../components/layout/SiteLayout'

const NotFound = () => {
  return <ErrorNotFound />
}

NotFound.getLayout = getLayout

export default NotFound
