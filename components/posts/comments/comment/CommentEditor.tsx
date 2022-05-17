import { Comment } from '../../../../graphql/types.generated'
import { FormEvent, useCallback, useRef, useState } from 'react'

interface CommentEditor {
  onEdit: (event: any) => void
  setIsEditing: (isEditing: boolean) => void
  validateComment: (event: FormEvent<HTMLTextAreaElement>) => void
  isSaving: boolean
  canSendComment: boolean
  comment: Comment
}

const CommentEditor = (props: CommentEditor) => {
  const {
    onEdit,
    comment,
    isSaving,
    setIsEditing,
    canSendComment,
    validateComment,
  } = props

  const formRef = useRef<HTMLFormElement>(null)

  return (
    <form onSubmit={onEdit} ref={formRef}>
      <textarea
        className="w-full resize-none rounded-md p-2 ring-2 ring-black"
        defaultValue={comment.content}
        id="content"
        onChange={validateComment}
        onKeyDown={(event) => {
          if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault()
            // submit the form
            if (canSendComment) {
              formRef.current?.requestSubmit()
            }
          }
        }}
      />
      <input className="hidden" type="submit" />
      <span className="space-x-2">
        <button
          className="text-neutral-600"
          onClick={() => setIsEditing(false)}
          type="button"
        >
          Cancel
        </button>
        <button className="text-neutral-600" type="submit">
          {isSaving ? 'Saving...' : 'Save'}
        </button>
      </span>
    </form>
  )
}

export default CommentEditor
