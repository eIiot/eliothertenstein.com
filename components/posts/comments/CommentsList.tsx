import CommentDetail from './CommentDetail'
import {
  Comment,
  useCreateCommentMutation,
  useGetCommentsQuery,
  User,
} from '../../../graphql/types.generated'

interface CommentsDetailProps {
  postId: string
  viewer: User | null
  inViewRef: (node: Element | null) => void
}

const CommentsList = (props: CommentsDetailProps) => {
  const { postId, viewer, inViewRef } = props

  // get comments from the post slug

  const { data, loading, error } = useGetCommentsQuery({
    variables: {
      postId,
    },
  })

  return (
    <div
      className={
        'mx-auto max-w-2xl space-y-3 border-t-2 border-t-neutral-200 px-4 pt-10' +
        ' ' +
        (viewer ? 'pb-[100px]' : 'pb-10')
      }
      ref={inViewRef}
    >
      {!loading ? (
        data && data.comments && data.comments.length > 0 ? (
          data.comments.map((comment) => (
            // @ts-expect-error, it thinks the comment will be null for some reason
            <CommentDetail comment={comment} key={comment.id} viewer={viewer} />
          ))
        ) : (
          <div className="flex flex-col space-y-2">
            <p>No comments yet.</p>
          </div>
        )
      ) : (
        <div className="flex flex-col space-y-2">
          <p>Loading comments...</p>
        </div>
      )}
    </div>
  )
}

export default CommentsList
