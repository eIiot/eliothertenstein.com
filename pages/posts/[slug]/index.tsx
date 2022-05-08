import { getLayout } from '../../../components/layouts/SiteLayout'
import PostDetail from '../../../components/posts/PostDetail'
import PostsList from '../../../components/posts/PostsList'
import ListView from '../../../components/views/ListView'
import { useRouter } from 'next/router'
import React from 'react'

const PostPage = () => {
  const router = useRouter()
  const { slug } = router.query as { slug: string }
  return <PostDetail slug={slug} />
}

PostPage.getLayout = (page: React.ReactNode) =>
  getLayout(<ListView detail={page} list={<PostsList />} showDetail />)

export default PostPage
