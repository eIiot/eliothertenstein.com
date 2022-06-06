import CommentDate from './comment/CommentDate'
import CommentEditor from './comment/CommentEditor'
import {
  Comment,
  useDeleteCommentMutation,
  User,
  useUpdateCommentMutation,
} from '../../../graphql/types.generated'
import client from '../../../lib/apollo'
import Avatar from '../../user/Avatar'
import { useCallback, useState } from 'react'
import { toast } from 'react-hot-toast'
import ReactMarkdown from 'react-markdown'

interface CommentDetailProps {
  comment: Comment
  viewer: User | null
}

const CommentDetail = (props: CommentDetailProps) => {
  const { comment: PropsComment, viewer } = props

  const [comment, setComment] = useState<Comment>(PropsComment)
  const [canSendComment, setCanSendComment] = useState(false)

  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const [updateComment] = useUpdateCommentMutation()
  const [deleteComment] = useDeleteCommentMutation()

  const validateComment = useCallback((event) => {
    const content = event.target.value
    // match regex markdown image, and don't allow it

    setCanSendComment(
      content.trim().length > 0 && content.match(/!\[.*\]\(.*\)/) === null
    )
  }, [])

  const onEdit = useCallback(
    (event) => {
      event.preventDefault()
      console.log('edit: ', event)
      if (!viewer) {
        toast.error('You must be logged in to save a comment.')
        return
      }
      if (!canSendComment) {
        toast.error('This comment is invalid')
        return
      }
      setIsSaving(true)
      updateComment({
        variables: {
          id: comment.id,
          content: event.target.elements.content.value.trim(),
        },
      })
        .then(async () => {
          setIsEditing(false)
          setIsSaving(false)
          setComment({
            ...comment,
            content: event.target.elements.content.value.trim(),
            updatedAt: new Date(),
          })
          toast.success('Comment updated!')
        })
        .catch((err) => {
          setIsSaving(false)
          toast.error(err.message)
        })
    },
    [viewer, canSendComment, updateComment, comment]
  )

  const onDelete = useCallback(
    (event) => {
      event.preventDefault()
      if (!isConfirmingDelete) {
        setIsConfirmingDelete(true)
      }
      if (isConfirmingDelete) {
        setIsDeleting(true)
        deleteComment({
          variables: {
            id: comment.id,
          },
        })
          .then(async () => {
            await client.refetchQueries({
              include: 'active',
            })
            setIsDeleting(false)
            setIsEditing(false)
            setIsConfirmingDelete(false)
            toast.success('Comment deleted!')
          })
          .catch((err) => {
            setIsDeleting(false)
            setIsConfirmingDelete(false)
            toast.error(err.message)
          })
      }
    },
    [comment.id, deleteComment, isConfirmingDelete]
  )

  return (
    <div className="flex flex-col space-y-2">
      <div className="flex flex-none flex-row space-x-2">
        <Avatar
          image={comment.author.avatar || undefined}
          name={comment.author.name}
        />
        <div className="flex flex-1 flex-col">
          <div className="flex flex-row space-x-2">
            <div className="flex flex-col">
              <p className="flex flex-row space-x-2 font-semibold">
                <span>{comment.author.name}</span>
                {comment.viewerCanEdit && (
                  <button
                    className="text-neutral-600"
                    onClick={() => setIsEditing(true)}
                    type="button"
                  >
                    Edit
                  </button>
                )}
                {comment.viewerCanDelete && (
                  <button
                    className="text-red-600"
                    onClick={onDelete}
                    type="button"
                  >
                    {isDeleting
                      ? 'Deleting...'
                      : isConfirmingDelete
                      ? 'Confirm'
                      : 'Delete'}
                  </button>
                )}
              </p>
              <CommentDate comment={comment} />
            </div>
          </div>
          <p className="text-neutral-600">
            {isEditing ? (
              <CommentEditor
                canSendComment={canSendComment}
                comment={comment}
                isSaving={isSaving}
                onEdit={onEdit}
                setIsEditing={setIsEditing}
                validateComment={validateComment}
              />
            ) : (
              <ReactMarkdown className="comment" disallowedElements={['img']}>
                {comment.content}
              </ReactMarkdown>
            )}
          </p>
        </div>
      </div>
    </div>
  )
}

export default CommentDetail
