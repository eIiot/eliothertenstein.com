import { getLayout } from '../../../components/layout/SiteLayout'
import ListView from '../../../components/layout/views/ListView'
import CommentsList from '../../../components/posts/comments/CommentsList'
import PostDetail from '../../../components/posts/PostDetail'
import PostsList from '../../../components/posts/PostsList'
import { Post, User } from '../../../graphql/types.generated'
import prisma from '../../../lib/prisma'
import {
  getServerSidePropsWrapper,
  getSession,
  Session,
} from '@auth0/nextjs-auth0'
import { Role } from '@prisma/client'
import { GetServerSideProps } from 'next'
import { NextSeo } from 'next-seo'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { ContextType, ReactElement } from 'react'
import { ArrowLeft, Edit } from 'react-feather'

interface PostPageProps {
  viewer: User
  post: Post
}

const PostPage = (props: PostPageProps) => {
  const { viewer, post } = props
  const router = useRouter()
  const { slug } = router.query as { slug: string }
  return (
    <>
      <NextSeo
        description={post.content}
        openGraph={{
          title: post.title,
          description: post.content,
          images: [
            {
              url: post.featureImage ?? '',
              alt: post.title,
            },
          ],
        }}
        title={post.title}
      />
      {/* <Link href="/posts">
        <a className="absolute left-3 top-3 z-30 rounded-lg bg-white p-3 text-black shadow-lg ring-2 ring-white hover:bg-neutral-100 lg:hidden">
          <ArrowLeft />
        </a>
      </Link> */}

      <PostDetail slug={slug} {...props} />
    </>
  )
}

PostPage.getLayout = (page: ReactElement) =>
  getLayout(<ListView detail={page} list={<PostsList />} showDetail />)

export const getServerSideProps: GetServerSideProps = getServerSidePropsWrapper(
  async (ctx) => {
    const post = await prisma.post.findUnique({
      where: { slug: ctx.query.slug as string },
    })

    if (!post) {
      // ctx.res.statusCode = 404
      return { redirect: { destination: '/404', permanent: false } }
    }

    const session = getSession(ctx.req, ctx.res)

    if (!session) {
      return {
        props: {
          viewer: null,
          post,
        },
      }
    }

    const { user: viewer } = session

    const user = await prisma.user.findUnique({
      where: { id: viewer?.sub },
    })

    const isAdmin = user?.role === Role.ADMIN
    const isBlocked = user?.role === Role.BLOCKED

    return {
      props: {
        viewer: {
          ...viewer,
          isAdmin,
          isBlocked,
        },
        post,
      },
    }
  }
)

export default PostPage
