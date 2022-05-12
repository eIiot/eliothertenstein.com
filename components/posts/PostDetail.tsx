import postStyles from './PostStyles'
import ChecklistRenderer from './renderers/ChecklistRenderer'
import CodeBlockRenderer from './renderers/CodeBlockRenderer'
import LinkRenderer from './renderers/LinkRenderer'
import { useGetPostQuery } from '../../graphql/types.generated'
import { Viewer } from '../../types/user'
import ErrorNotFound from '../ErrorNotFound'
import Blocks from 'editorjs-blocks-react-renderer'
import moment from 'moment'
import Link from 'next/link'
import { Edit } from 'react-feather'

// get post by slug from Prisma using serverSideProp

interface PostDetailProps {
  slug: string
  viewer: Viewer | null
}

const PostDetail = (props: PostDetailProps) => {
  const { slug, viewer } = props

  const { data, loading, error } = useGetPostQuery({
    variables: {
      slug,
    },
  })

  // return the post content
  return (
    <div className="h-full w-full overflow-scroll bg-white">
      {!loading ? (
        data && data.post && data.post.content ? (
          <div className="mx-auto max-w-2xl space-y-3 px-4 py-8">
            {viewer && viewer.isAdmin && (
              <Link href={slug + '/edit'}>
                <a className="absolute right-0 top-0 m-3 rounded-lg bg-white p-3 text-black shadow-lg hover:bg-neutral-100">
                  <Edit />
                </a>
              </Link>
            )}
            <h1 className="text-3xl font-bold">{data.post.title}</h1>
            <h2 className="text-lg text-neutral-600">
              {moment(data.post.createdAt).format('MMMM Do YYYY')}
            </h2>
            <div className="post-text">
              <Blocks
                config={postStyles}
                data={JSON.parse(data.post.content)}
                renderers={{
                  checklist: ChecklistRenderer,
                  link: LinkRenderer,
                  code: CodeBlockRenderer,
                }}
              />
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
