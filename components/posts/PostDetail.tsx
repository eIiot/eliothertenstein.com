import CommentBar from './comments/CommentBar'
import CommentsList from './comments/CommentsList'
import postStyles from './EditorJS/PostStyles'
import ChecklistRenderer from './EditorJS/renderers/ChecklistRenderer'
import CodeBlockRenderer from './EditorJS/renderers/CodeBlockRenderer'
import HeaderRenderer from './EditorJS/renderers/HeaderRenderer'
import PostTitleBar from './PostTitleBar'
import {
  Post,
  useCreateCommentMutation,
  User,
} from '../../graphql/types.generated'
import client from '../../lib/apollo'
import ScrollBar from '../elements/Scrollbar'
import * as ScrollArea from '@radix-ui/react-scroll-area'
import Blocks from 'editorjs-blocks-react-renderer'
import { useElementScroll } from 'framer-motion'
import moment from 'moment'
import { useCallback, useEffect, useRef, useState } from 'react'
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
        content.match(/!\[.*\]\(.*\)/) !== null ||
        content.length > 1000
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
          postId: post.id,
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
    [createComment, post]
  )

  const wordCount = (content: string) => {
    const contentObject = JSON.parse(content) as EditorJSOutput
    const paragraphs = contentObject.blocks.filter(
      (block) => block.type === 'paragraph'
    )
    const words = paragraphs.reduce(
      (acc, paragraph) => acc + paragraph.data.text.split(' ').length,
      0
    )
    console.log(words)
    return words
  }

  const readingTime = (words: number) => {
    const wpm = 225
    const time = Math.ceil(words / wpm)
    return time
  }

  return (
    <ScrollArea.Root className="h-full w-full">
      <ScrollArea.Viewport
        className="h-full w-full bg-white"
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
          <p className="text-[15px] font-light text-neutral-500">
            {moment(post.createdAt).format('MMMM Do, YYYY')} /{' '}
            {wordCount(post.content)} words /{' '}
            {readingTime(wordCount(post.content))} min read
          </p>
          <div className="post-text">
            <Blocks
              config={postStyles}
              data={JSON.parse(post.content)}
              renderers={{
                checklist: ChecklistRenderer,
                code: CodeBlockRenderer,
                header: HeaderRenderer,
              }}
            />
          </div>
        </div>
        <CommentsList
          inViewRef={commentsInViewRef}
          postId={post.id}
          viewer={viewer}
        />
      </ScrollArea.Viewport>
      <ScrollBar />
    </ScrollArea.Root>
  )
}

export default PostDetail
