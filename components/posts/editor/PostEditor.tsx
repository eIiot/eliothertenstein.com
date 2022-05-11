import { useGetPostQuery } from '../../../graphql/types.generated'
import dynamic from 'next/dynamic'

const EditorJSPostEditor = dynamic(() => import('./EditorJSPostEditor'), {
  ssr: false,
})

// get post by slug from Prisma using serverSideProp

interface PostEditorProps {
  slug: string
}

const PostEditor = (props: PostEditorProps) => {
  const { slug } = props

  const { data, loading, error } = useGetPostQuery({
    variables: {
      slug,
    },
  })

  // return the post content
  return (
    <div className="w-full">
      {!loading ? (
        data && data.post && data.post.content ? (
          <div className="space-y-3 px-24 py-8">
            <EditorJSPostEditor content={data.post.content} post={data.post} />
          </div>
        ) : (
          <div className="space-y-3 px-24 py-8">
            <EditorJSPostEditor post={data?.post} />
          </div>
        )
      ) : (
        <div className="animate-shimmer h-full w-full rounded-lg bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 bg-[length:400%_100%]" />
      )}
    </div>
  )
}

export default PostEditor
