import { useGetPostQuery } from '../../../graphql/types.generated'
import { NextSeo } from 'next-seo'
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
    <>
      <NextSeo
        description={data?.post?.content ?? 'Loading...'}
        openGraph={{
          title: data?.post?.title ?? 'Loading...',
          description: data?.post?.content ?? 'Loading...',
          images: [
            {
              url: data?.post?.featureImage ?? '',
              alt: data?.post?.title ?? 'Loading...',
            },
          ],
        }}
        title={data?.post?.title ? 'Edit | ' + data?.post?.title : 'Loading...'}
      />
      <div className="w-full">
        {!loading ? (
          data && data.post && data.post.content ? (
            <div className="space-y-3 px-24 py-8">
              <EditorJSPostEditor
                content={data.post.content}
                post={data.post}
              />
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
    </>
  )
}

export default PostEditor
