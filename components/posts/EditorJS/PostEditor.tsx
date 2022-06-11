import { useGetPostQuery } from '../../../graphql/types.generated'
import OpenSidebarButton from '../../layout/Sidebar/OpenSidebarButton'
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
        title={
          loading
            ? data?.post?.title
              ? 'Edit | ' + data?.post?.title
              : 'Edit New Post'
            : 'Loading...'
        }
      />
      <div className="h-full w-full overflow-y-scroll bg-white">
        <OpenSidebarButton />
        {!loading ? (
          <div className="space-y-3 px-2 py-8 sm:px-24">
            <EditorJSPostEditor
              content={data?.post?.content ?? undefined}
              post={data?.post}
            />
          </div>
        ) : (
          <div className="h-full w-full animate-shimmer rounded-lg bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 bg-[length:400%_100%]" />
        )}
      </div>
    </>
  )
}

export default PostEditor
