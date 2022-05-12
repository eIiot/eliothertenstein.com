import { getLayout } from '../../components/layouts/SiteLayout'
import PostsList from '../../components/posts/PostsList'
import ListView from '../../components/views/ListView'
import prisma from '../../lib/prisma'
import { Viewer } from '../../types/user'
import { getSession } from '@auth0/nextjs-auth0'
import { NextSeo } from 'next-seo'
import Link from 'next/link'
import { Edit } from 'react-feather'

interface PostsPageProps {
  viewer: Viewer
}

const PostsPage = (props: PostsPageProps) => {
  const { viewer } = props
  return (
    <>
      {viewer && viewer.isAdmin && (
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

  if (!session) {
    return {
      props: {
        viewer: null,
      },
    }
  }

  const { user: viewer } = session

  const user = await prisma.user.findUnique({
    where: { id: viewer?.sub },
  })

  const isAdmin = user?.role === 'ADMIN'
  return {
    props: {
      viewer: {
        ...viewer,
        isAdmin,
      },
    },
  }
}

export default PostsPage
