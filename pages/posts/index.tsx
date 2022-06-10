import { getLayout } from '../../components/layout/SiteLayout'
import ListView from '../../components/layout/views/ListView'
import PostsList from '../../components/posts/PostsList'
import { User } from '../../graphql/types.generated'
import prisma from '../../lib/prisma'
import { getServerSidePropsWrapper, getSession } from '@auth0/nextjs-auth0'
import { Role } from '@prisma/client'
import { GetServerSideProps } from 'next'
import { NextSeo } from 'next-seo'
import Link from 'next/link'
import { ReactElement } from 'react'
import { Edit } from 'react-feather'

interface PostsPageProps {
  viewer: User
}

const PostsPage = (props: PostsPageProps) => {
  const { viewer } = props
  return (
    <NextSeo
      description="Here's some of the writing I've done over the years, mostly about projects I'm working on"
      title="Posts"
    />
  )
}

export const getServerSideProps: GetServerSideProps = getServerSidePropsWrapper(
  async (ctx) => {
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

    const isAdmin = user?.role === Role.ADMIN
    const isBlocked = user?.role === Role.BLOCKED
    return {
      props: {
        viewer: {
          ...viewer,
          isAdmin,
          isBlocked,
        },
      },
    }
  }
)

PostsPage.getLayout = (page: ReactElement) =>
  getLayout(
    <ListView list={<PostsList />} showDetail={false}>
      {page}
    </ListView>
  )

export default PostsPage
