import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import PostEditor from '../../../components/editor/PostEditor'
import { getLayout } from '../../../components/layouts/SiteLayout'
import PostsList from '../../../components/posts/PostsList'
import ListView from '../../../components/views/ListView'

const Editor = () => {
  const router = useRouter()
  const { slug } = router.query
  const [post, setPost] = useState<{
    id: string
    title: string
    content: string
    published: boolean
    createdAt: string
  }>()

  useEffect(() => {
    fetch(`/api/posts/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        setPost(data)
      })
  }, [slug])

  return <PostEditor id={id} />
}

Editor.getLayout = (page: React.ReactNode) =>
  getLayout(<ListView list={<PostsList />} detail={page} showDetail={true} />)

export default Editor
