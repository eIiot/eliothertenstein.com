import { useGetPostQuery } from '../../graphql/types.generated'
import ErrorNotFound from '../ErrorNotFound'
import { MarkdownRenderer } from '../Markdown'

// get post by slug from Prisma using serverSideProp

interface PostDetailProps {
  slug: string
}

const PostDetail = (props: PostDetailProps) => {
  const { slug } = props

  const { data, loading, error } = useGetPostQuery({
    variables: {
      slug,
    },
  })

  // return the post content
  return (
    <div className="h-full w-full overflow-scroll">
      {!loading ? (
        data && data.post && data.post.text ? (
          <div className="space-y-3 px-4 py-8">
            <h1 className="text-lg font-normal">{data.post.title}</h1>
            <div className="post-text">
              <MarkdownRenderer>{data.post.text}</MarkdownRenderer>
            </div>
          </div>
        ) : (
          <ErrorNotFound />
        )
      ) : (
        <div className="animate-shimmer h-full w-full rounded-lg bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 bg-[length:400%_100%]" />
      )}
    </div>
  )
}

export default PostDetail
