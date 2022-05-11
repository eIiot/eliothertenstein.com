import ErrorNotFound from '../components/ErrorNotFound'
import { getLayout } from '../components/layouts/SiteLayout'

const NotFound = () => {
  return <ErrorNotFound />
}

NotFound.getLayout = getLayout

export default NotFound
