import { getLayout } from '../../components/layout/SiteLayout'
import ListView from '../../components/layout/views/ListView'
import PostsList from '../../components/posts/PostsList'
import { User } from '../../graphql/types.generated'
import prisma from '../../lib/prisma'
import { getServerSidePropsWrapper, getSession } from '@auth0/nextjs-auth0'
import { Role } from '@prisma/client'
import { GetServerSideProps } from 'next'
import { NextSeo } from 'next-seo'
import { ReactElement } from 'react'
const PostsPage = () => {
  return (
    <NextSeo
      description="Here's some of the writing I've done over the years, mostly about projects I'm working on"
      title="Posts"
    />
  )
}

PostsPage.getLayout = (page: ReactElement) =>
  getLayout(
    <ListView list={<PostsList />} showDetail={false}>
      {page}
    </ListView>
  )

export default PostsPage
