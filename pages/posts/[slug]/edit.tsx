import { getLayout } from '../../../components/layout/SiteLayout'
import ListView from '../../../components/layout/views/ListView'
import PostEditor from '../../../components/posts/EditorJS/PostEditor'
import PostsList from '../../../components/posts/PostsList'
import prisma from '../../../lib/prisma'
import { AuthPage } from '../../../types/page'
import { withPageAuthRequired, getSession, Session } from '@auth0/nextjs-auth0'
import { useRouter } from 'next/router'
import { ReactElement } from 'react'
import { toast } from 'react-hot-toast'

interface EditorPageProps {
  isSidebarHidden: boolean
  setIsSidebarHidden: (isSidebarHidden: boolean) => void
}

const Editor = withPageAuthRequired((props: EditorPageProps) => {
  const { isSidebarHidden, setIsSidebarHidden } = props
  const router = useRouter()
  const { slug } = router.query as { slug: string }

  console.log(isSidebarHidden, setIsSidebarHidden)

  return (
    <PostEditor
      isSidebarHidden={isSidebarHidden}
      setIsSidebarHidden={setIsSidebarHidden}
      slug={slug}
    />
  )
}) as AuthPage

Editor.getLayout = (page: ReactElement) =>
  // @ts-expect-error UNFIXED: PostList props are added within the ListView component
  getLayout(<ListView detail={page} list={<PostsList />} showDetail />)

export const getServerSideProps = withPageAuthRequired({
  returnTo: '/posts',
  async getServerSideProps(ctx) {
    // access the user session
    const { user: viewer } = getSession(ctx.req, ctx.res) as Session
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
