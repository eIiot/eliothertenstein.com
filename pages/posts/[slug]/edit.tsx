import { getLayout } from '../../../components/layouts/SiteLayout'
import PostEditor from '../../../components/posts/editor/PostEditor'
import PostsList from '../../../components/posts/PostsList'
import ListView from '../../../components/views/ListView'
import prisma from '../../../lib/prisma'
import { AuthPage } from '../../../types/page'
import { withPageAuthRequired, getSession } from '@auth0/nextjs-auth0'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'

const Editor = withPageAuthRequired(() => {
  const router = useRouter()
  const { slug } = router.query as { slug: string }

  return <PostEditor slug={slug} />
}) as AuthPage

Editor.getLayout = (page: React.ReactNode) =>
  getLayout(<ListView detail={page} list={<PostsList />} showDetail />)

export const getServerSideProps = withPageAuthRequired({
  returnTo: '/posts',
  async getServerSideProps(ctx) {
    // access the user session
    const session = getSession(ctx.req, ctx.res)
    const { user: viewer } = session
    const user = await prisma.user.findUnique({
      where: { id: viewer?.sub },
    })
    const isAdmin = user?.role === 'ADMIN'
    if (!isAdmin) {
      toast.error('You are not authorized to edit posts')
      return {
        redirect: {
          destination: '/posts/' + ctx.query.slug,
          permanent: false,
        },
      }
    }
    return { props: {} }
  },
})

export default Editor
