import RemirrorPostEditor from './RemirrorPostEditor'
import { useGetPostQuery } from '../../graphql/types.generated'
import ErrorNotFound from '../ErrorNotFound'

// get post by slug from Prisma using serverSideProp

interface PostEditorProps {
  slug: string
}

const PostEditor = (props: PostEditorProps) => {
  const { slug } = props

  const { data, loading, error } = useGetPostQuery({
    variables: {
      slug, // value for 'slug'
    },
  })

  // return the post content
  return (
    <div className="w-full">
      {!loading ? (
        data && data.post && data.post.text ? (
          <div className="space-y-3 px-4 py-8">
            <RemirrorPostEditor slug={slug} text={data.post.text} />
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

export default PostEditor
