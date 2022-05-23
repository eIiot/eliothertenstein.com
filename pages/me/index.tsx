import { getLayout } from '../../components/layouts/SiteLayout'

const Page = () => {
  return null
}

Page.getLayout = getLayout

export default Page

export const getStaticProps = () => {
  return {
    redirect: {
      destination: '/me/settings',
      permanent: true,
    },
  }
}
