import { getLayout } from '../../components/layouts/SiteLayout'
import PostsList from '../../components/posts/PostsList'
import ListView from '../../components/views/ListView'
import { NextSeo } from 'next-seo'
// import Head from 'next/head'
// import Image from 'next/image'

const Posts = () => {
  return <NextSeo description="Posts" title="Posts" />
}

Posts.getLayout = (page: React.ReactNode) =>
  getLayout(<ListView detail={page} list={<PostsList />} showDetail={false} />)

export default Posts
