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
import React, { ContextType, ReactElement } from 'react'

interface PostPageProps {
  post: Post
}

const PostPage = (props: PostPageProps) => {
  const { post } = props
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

      <PostDetail {...props} />
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
      return { redirect: { destination: '/404', permanent: false } }
    }

    return {
      props: {
        post,
      },
    }
  }
)

export default PostPage
