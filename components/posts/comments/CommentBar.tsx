import { useCreateCommentMutation } from '../../../graphql/types.generated'
import Loader from '../../effects/Loader'
import { useCallback, useRef, useState } from 'react'
import { MessageCircle, Send } from 'react-feather'

interface CommentBarProps {
  inView: boolean
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void
  isSending: boolean
  setIsSending: (isSending: boolean) => void
  scrollToComments: () => void
}

const CommentBar = (props: CommentBarProps) => {
  const { inView, handleSubmit, scrollToComments, isSending, setIsSending } =
    props

  const [canSendComment, setCanSendComment] = useState(false)
  const [errorState, setErrorState] = useState(false)

  const formRef = useRef<HTMLFormElement>(null)

  const validateComment = useCallback((event) => {
    const content = event.target.value
    // match regex markdown image, and don't allow it
    setCanSendComment(
      content.trim().length > 0 &&
        content.match(/!\[.*\]\(.*\)/) === null &&
        content.length < 1000
    )
    setErrorState(
      content.match(/!\[.*\]\(.*\)/) !== null || content.length > 1000
    )
  }, [])

  return (
    <form
      className="absolute right-0 bottom-0 m-3 flex flex-row overflow-y-auto overflow-x-hidden rounded-lg bg-white text-black ring-2 ring-black drop-shadow-lg duration-200"
      onSubmit={handleSubmit}
      ref={formRef}
      style={
        {
          left: inView ? '0' : 'calc(100% - 70px)',
          transition: 'left 0.2s ease-out',
          animation: errorState && inView ? 'shake 0.5s ease-in-out' : 'none',
          '--tw-ring-color': inView
            ? errorState
              ? 'rgb(239 68 68 / var(--tw-text-opacity))'
              : '#000000'
            : '#ffffff',
        } as React.CSSProperties
      }
    >
      <button
        className={
          'flex-0 flex flex-row items-center justify-center p-3' +
          ' ' +
          (inView ? '' : 'hover:bg-neutral-100')
        }
        // disabled={!inView}
        onClick={
          inView
            ? () => {
                if (canSendComment || isSending) {
                  formRef.current?.requestSubmit()
                }
              }
            : scrollToComments
        }
        style={{
          opacity: inView ? (canSendComment ? 1 : 0.5) : 1,
          transition: 'opacity 0.2s ease-out',
          cursor:
            (inView && !canSendComment) || isSending
              ? 'not-allowed'
              : 'pointer',
        }}
        type="button"
      >
        {isSending ? <Loader /> : <MessageCircle />}
      </button>
      <textarea
        className="group bottom-0 h-[48px] flex-1 resize-none overflow-hidden border-x-[1px] border-x-neutral-200 p-3 outline-none transition-all duration-200"
        id="content"
        onChange={validateComment}
        onInput={(e) => {
          const target = e.target as HTMLTextAreaElement
          target.style.height = '48px'
          target.style.height =
            target.scrollHeight < 216 ? target.scrollHeight + 'px' : '216px'
        }}
        onKeyDown={(event) => {
          if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault()
            // submit the form
            if (canSendComment && !isSending) {
              formRef.current?.requestSubmit()
            }
          }
        }}
        placeholder="Markdown supported!"
        readOnly={isSending}
        style={{
          opacity: inView ? 1 : 0,
          transition: 'opacity 0.2s ease-out',
        }}
      />
      {/* <button
        className="flex-0 flex flex-row items-end p-3"
        disabled={!canSendComment}
        style={{
          opacity: inView ? (canSendComment ? 1 : 0.5) : 0,
          transition: 'opacity 0.2s ease-out',
          cursor: canSendComment ? 'pointer' : 'not-allowed',
        }}
        type="submit"
      >
        {isSending ? <Loader /> : <Send />}
      </button> */}
    </form>
  )
}

export default CommentBar
