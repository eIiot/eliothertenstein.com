import { useRouter } from 'next/router'
import React from 'react'
import { getLayout } from '../../../components/layouts/SiteLayout'
import ListView from '../../../components/views/ListView'
import PostDetail from '../../../components/posts/PostDetail'
import PostsList from '../../../components/posts/PostsList'

const PostPage = () => {
  const router = useRouter()
  const { slug } = router.query
  return <PostDetail slug={slug} />
}

PostPage.getLayout = (page: React.ReactNode) =>
  getLayout(<ListView list={<PostsList />} detail={page} showDetail={true} />)

export default PostPage
