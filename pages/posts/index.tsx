import { getLayout } from '../../components/layouts/SiteLayout'
import PostsList from '../../components/posts/PostsList'
import ListView from '../../components/views/ListView'
import { User } from '../../graphql/types.generated'
import prisma from '../../lib/prisma'
import { getSession } from '@auth0/nextjs-auth0'
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
  console.log(viewer)
  return (
    <>
      {viewer && viewer.isAdmin && (
        <Link href="posts/new/edit">
          <a className="absolute top-0 right-0 z-10 m-3 rounded-lg bg-white p-3 text-black shadow-lg first-line:right-0 hover:bg-neutral-100">
            <Edit />
          </a>
        </Link>
      )}
      <NextSeo description="Posts" title="Posts" />
    </>
  )
}

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

PostsPage.getLayout = (page: ReactElement) =>
  getLayout(
    // @ts-expect-error UNFIXED: PostList props are added within the ListView component
    <ListView list={<PostsList />} showDetail={false}>
      {page}
    </ListView>
  )

export default PostsPage
