import CommentBar from './comments/CommentBar'
import CommentsList from './comments/CommentsList'
import postStyles from './PostStyles'
import PostTitleBar from './PostTitleBar'
import ChecklistRenderer from './renderers/ChecklistRenderer'
import CodeBlockRenderer from './renderers/CodeBlockRenderer'
import LinkRenderer from './renderers/LinkRenderer'
import {
  Post,
  useCreateCommentMutation,
  useGetPostQuery,
  User,
} from '../../graphql/types.generated'
import client from '../../lib/apollo'
import ErrorNotFound from '../ErrorNotFound'
import Blocks from 'editorjs-blocks-react-renderer'
import { useElementScroll } from 'framer-motion'
import moment from 'moment'
import { NextSeo } from 'next-seo'
import Link from 'next/link'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Edit, MessageCircle } from 'react-feather'
import { toast } from 'react-hot-toast'
import { useInView } from 'react-intersection-observer'

// get post by slug from Prisma using serverSideProp

interface PostDetailProps {
  slug: string
  viewer: User | null
  post: Post
}

const PostDetail = (props: PostDetailProps) => {
  const { slug, viewer, post } = props

  const postScrollRef = useRef<HTMLDivElement>(null)

  const { scrollY } = useElementScroll(postScrollRef)

  const [titleInViewRef, titleInView] = useInView({
    threshold: 1,
  })

  const [commentsInViewRef, commentsInView] = useInView({
    threshold: 0,
  })

  const [createComment] = useCreateCommentMutation()

  const [isSending, setIsSending] = useState(false)

  const handleCommentSubmit = useCallback(
    (event, viewer: User, data) => {
      event.preventDefault()
      const content = event.target.elements.content.value
      if (
        content.trim().length < 1 ||
        content.match(/!\[.*\]\(.*\)/) !== null
      ) {
        console.log('Error creating comment: Invalid comment content')
        setIsSending(false)
        toast.error('Invalid comment content')
        return
      }
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
          setIsSending(false)
          toast.success('Comment created!')
          postScrollRef.current?.scrollTo(0, postScrollRef.current.scrollHeight)
          await client.refetchQueries({
            include: 'active',
          })
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
      <PostTitleBar
        isOnScreen={titleInView}
        scrollY={scrollY}
        title={post.title}
      />
      {viewer && !viewer.isBlocked && (
        <CommentBar
          handleSubmit={(event) => handleCommentSubmit(event, viewer, post)}
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
      <div className="mx-auto max-w-2xl space-y-3 px-4 pt-28 pb-10">
        <h1 className="text-3xl font-bold" ref={titleInViewRef}>
          {post.title}
        </h1>
        <h2 className="text-lg text-neutral-600">
          {moment(post.createdAt).format('MMMM Do YYYY')}
        </h2>
        <div className="post-text">
          <Blocks
            config={postStyles}
            data={JSON.parse(post.content)}
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
        postId={post.id}
        viewer={viewer}
      />
    </div>
  )
}

export default PostDetail
