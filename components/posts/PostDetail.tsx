import CommentBar from './comments/CommentBar'
import CommentsList from './comments/CommentsList'
import postStyles from './PostStyles'
import PostTitleToast from './PostTitleToast'
import ChecklistRenderer from './renderers/ChecklistRenderer'
import CodeBlockRenderer from './renderers/CodeBlockRenderer'
import LinkRenderer from './renderers/LinkRenderer'
import {
  useCreateCommentMutation,
  useGetPostQuery,
  User,
} from '../../graphql/types.generated'
import client from '../../lib/apollo'
import ErrorNotFound from '../ErrorNotFound'
import Blocks from 'editorjs-blocks-react-renderer'
import { useElementScroll } from 'framer-motion'
import moment from 'moment'
import Link from 'next/link'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Edit, MessageCircle } from 'react-feather'
import { toast } from 'react-hot-toast'
import { useInView } from 'react-intersection-observer'

// get post by slug from Prisma using serverSideProp

interface PostDetailProps {
  slug: string
  viewer: User | null
}

const PostDetail = (props: PostDetailProps) => {
  const { slug, viewer } = props

  const { data, loading, error } = useGetPostQuery({
    variables: {
      slug,
    },
  })

  const postScrollRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useElementScroll(postScrollRef)

  const [titleInViewRef, titleInView] = useInView({
    threshold: 0.5,
  })

  const [commentsInViewRef, commentsInView] = useInView({
    threshold: 0,
  })

  const [createComment] = useCreateCommentMutation()

  const [isSending, setIsSending] = useState(false)

  const handleSubmit = useCallback(
    (event, viewer: User, data) => {
      event.preventDefault()
      const content = event.target.elements.content.value
      setIsSending(true)
      createComment({
        variables: {
          content,
          postId: data.post.id,
        },
      })
        .then(async (comment) => {
          event.target.elements.content.value = ''
          event.target.style.height = '48px'
          await client.refetchQueries({
            include: 'active',
          })
          // scroll to bottom of comments using framer-motion
          postScrollRef.current?.scrollTo(0, postScrollRef.current.scrollHeight)
          setIsSending(false)
          toast.success('Comment created!')
        })
        .catch((err) => {
          console.log('Error creating comment: ', err)
          setIsSending(false)
          toast.error(err.message)
        })
    },
    [createComment]
  )

  return (
    <div
      className="h-full w-full overflow-x-hidden overflow-y-scroll bg-white"
      ref={postScrollRef}
    >
      {!loading ? (
        data && data.post ? (
          <>
            <PostTitleToast isOnScreen={titleInView} title={data.post.title} />
            {viewer && viewer.isAdmin && (
              <Link href={slug + '/edit'}>
                <a className="absolute right-3 top-3 flex rounded-lg bg-white p-3 text-black shadow-lg ring-2 ring-white hover:bg-neutral-100">
                  <Edit />
                </a>
              </Link>
            )}
            {viewer && !viewer.isBlocked && (
              <CommentBar
                handleSubmit={(event) => handleSubmit(event, viewer, data)}
                inView={commentsInView}
                isSending={isSending}
                scrollToComments={() => {
                  !commentsInView &&
                    postScrollRef.current?.scrollTo(
                      0,
                      postScrollRef.current?.scrollHeight
                    )
                }}
                setIsSending={setIsSending}
              />
            )}
            <div className="mx-auto max-w-2xl space-y-3 px-4 pt-20 pb-10">
              <h1 className="text-3xl font-bold" ref={titleInViewRef}>
                {data.post.title}
              </h1>
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
            <CommentsList
              inViewRef={commentsInViewRef}
              postId={data.post.id}
              viewer={viewer}
            />
          </>
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
