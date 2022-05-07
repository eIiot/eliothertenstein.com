import { useEffect, useState } from 'react'

// get post by slug from Prisma using serverSideProp

interface PostDetailProps {
  id: string | string[] | undefined
}

const PostDetail = (props: PostDetailProps) => {
  const { id } = props
  console.log(id)

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
    fetch(`/api/posts/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setPost(data)
        setLoading(false)
      })
  }, [id])

  if (!post) {
    return null
  }

  // return the post content
  return (
    <div className="w-full">
      {!isLoading ? (
        <div className="space-y-3 px-4 py-8">
          <h1 className="text-lg font-normal">{post.title}</h1>
          <p>{post.content}</p>
        </div>
      ) : (
        <div className="animate-shimmer h-full w-full rounded-lg bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 bg-[length:400%_100%]"></div>
      )}
    </div>
  )
}

export default PostDetail
