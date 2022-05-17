import { getLayout } from '../../../components/layouts/SiteLayout'
import CommentsList from '../../../components/posts/comments/CommentsList'
import PostDetail from '../../../components/posts/PostDetail'
import PostsList from '../../../components/posts/PostsList'
import ListView from '../../../components/views/ListView'
import { User } from '../../../graphql/types.generated'
import prisma from '../../../lib/prisma'
import { getSession, Session } from '@auth0/nextjs-auth0'
import { GetServerSideProps } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { ContextType, ReactElement } from 'react'
import { ArrowLeft } from 'react-feather'

interface PostPageProps {
  viewer: User
}

const PostPage = (props: PostPageProps) => {
  const { viewer } = props
  const router = useRouter()
  const { slug } = router.query as { slug: string }
  return (
    <>
      <Link href="/posts">
        <a className="absolute left-3 top-3 z-10 rounded-lg bg-white p-3 text-black shadow-lg ring-2 ring-white hover:bg-neutral-100 lg:hidden">
          <ArrowLeft />
        </a>
      </Link>
      <PostDetail slug={slug} viewer={viewer} />
    </>
  )
}

PostPage.getLayout = (page: ReactElement) =>
  getLayout(<ListView detail={page} list={<PostsList />} showDetail />)

export const getServerSideProps: GetServerSideProps = async (ctx) => {
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
        ...user,
        isAdmin,
      },
    },
  }
}

export default PostPage
