import { getLayout } from '../../components/layouts/SiteLayout'
import PostsList from '../../components/posts/PostsList'
import ListView from '../../components/views/ListView'
import prisma from '../../lib/prisma'
import { getSession } from '@auth0/nextjs-auth0'
import { NextSeo } from 'next-seo'
import Link from 'next/link'
import { Edit } from 'react-feather'

interface PostsPageProps {
  isAdmin: boolean
}

const PostsPage = (props: PostsPageProps) => {
  const { isAdmin } = props
  return (
    <>
      {isAdmin && (
        <Link href="posts/new/edit">
          <a className="absolute right-0 top-0 m-3 rounded-lg bg-white p-3 text-black shadow-lg hover:bg-neutral-100">
            <Edit />
          </a>
        </Link>
      )}
      <NextSeo description="Posts" title="Posts" />
    </>
  )
}

PostsPage.getLayout = (page: React.ReactNode) =>
  getLayout(<ListView detail={page} list={<PostsList />} showDetail />)

export const getServerSideProps = async (ctx) => {
  const session = getSession(ctx.req, ctx.res)
  const { user: viewer } = session
  const user = await prisma.user.findUnique({
    where: { id: viewer?.sub },
  })
  const isAdmin = user?.role === 'ADMIN'
  return {
    props: {
      isAdmin,
    },
  }
}

export default PostsPage
