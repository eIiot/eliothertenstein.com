import PostEditor from '../../../components/editor/PostEditor'
import { getLayout } from '../../../components/layouts/SiteLayout'
import PostsList from '../../../components/posts/PostsList'
import ListView from '../../../components/views/ListView'
import { useRouter } from 'next/router'

const Editor = () => {
  const router = useRouter()
  const { slug } = router.query as { slug: string }

  console.log('slug', slug)

  return <PostEditor slug={slug} />
}

Editor.getLayout = (page: React.ReactNode) =>
  getLayout(<ListView detail={page} list={<PostsList />} showDetail />)

export default Editor
