import { useEffect, useState, useCallback } from 'react'
import RemirrorEditor from './RemirrorEditor'

// get post by slug from Prisma using serverSideProp

interface PostEditorProps {
  slug: string | string[] | undefined
}

const PostEditor = (props: PostEditorProps) => {
  const { slug } = props

  const [post, setPost] = useState<{
    id: string
    title: string
    content: string
    published: boolean
    createdAt: string
  }>()

  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetch(`/api/posts/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        setPost(data)
        setLoading(false)
      })
  }, [slug])

  if (!post) {
    return null
  }

  // return the post content
  return (
    <div className="w-full">
      {!isLoading ? (
        <div className="space-y-3 px-4 py-8">
          <RemirrorEditor text={post.content} slug={slug} />
        </div>
      ) : (
        <div className="animate-shimmer h-full w-full rounded-lg bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 bg-[length:400%_100%]"></div>
      )}
    </div>
  )
}

export default PostEditor
