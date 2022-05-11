import { getLayout } from '../../../components/layouts/SiteLayout'
import PostDetail from '../../../components/posts/PostDetail'
import PostsList from '../../../components/posts/PostsList'
import ListView from '../../../components/views/ListView'
import prisma from '../../../lib/prisma'
import { getSession } from '@auth0/nextjs-auth0'
import { useRouter } from 'next/router'
import React, { ContextType } from 'react'

interface PostPageProps {
  isAdmin: boolean
}

const PostPage = (props: PostPageProps) => {
  const { isAdmin } = props
  const router = useRouter()
  const { slug } = router.query as { slug: string }
  return <PostDetail isAdmin={isAdmin} slug={slug} />
}

PostPage.getLayout = (page: React.ReactNode) =>
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

export default PostPage
