import { getLayout } from '../../../components/layouts/SiteLayout'
import PostDetail from '../../../components/posts/PostDetail'
import PostsList from '../../../components/posts/PostsList'
import ListView from '../../../components/views/ListView'
import prisma from '../../../lib/prisma'
import { Viewer } from '../../../types/user'
import { getSession, Session } from '@auth0/nextjs-auth0'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import React, { ContextType } from 'react'

interface PostPageProps {
  viewer: Viewer
}

const PostPage = (props: PostPageProps) => {
  const { viewer } = props
  const router = useRouter()
  const { slug } = router.query as { slug: string }
  return <PostDetail slug={slug} viewer={viewer} />
}

PostPage.getLayout = (page: React.ReactNode) =>
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
        ...viewer,
        isAdmin,
      },
    },
  }
}

export default PostPage
