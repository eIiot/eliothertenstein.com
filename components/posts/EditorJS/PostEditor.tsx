import { useGetPostQuery } from '../../../graphql/types.generated'
import OpenSidebarButton from '../..OpenSidebarButton'
import { NextSeo } from 'next-seo'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Edit, Menu } from 'react-feather'

const EditorJSPostEditor = dynamic(() => import('./EditorJSPostEditor'), {
  ssr: false,
})

// get post by slug from Prisma using serverSideProp

interface PostEditorProps {
  slug: string
  isSidebarHidden: boolean
  setIsSidebarHidden: (isSidebarHidden: boolean) => void
}

const PostEditor = (props: PostEditorProps) => {
  const { slug, isSidebarHidden, setIsSidebarHidden } = props

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
        <OpenSidebarButton
          isSidebarHidden={isSidebarHidden}
          setIsSidebarHidden={setIsSidebarHidden}
        />
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
          <div className="h-full w-full animate-shimmer rounded-lg bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 bg-[length:400%_100%]" />
        )}
      </div>
    </>
  )
}

export default PostEditor
