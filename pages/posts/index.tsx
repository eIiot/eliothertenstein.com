import { getLayout } from '../../components/layouts/SiteLayout'
import ListView from '../../components/views/ListView'
import PostsList from '../../components/posts/PostsList'
import { NextSeo } from 'next-seo'
// import Head from 'next/head'
// import Image from 'next/image'

const Posts = () => {
  return <NextSeo title="Posts" description="Posts" />
}

Posts.getLayout = (page: React.ReactNode) =>
  getLayout(<ListView list={<PostsList />} detail={page} showDetail={false} />)

export default Posts
