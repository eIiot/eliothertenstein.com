import CommentDetail from './CommentDetail'
import {
  Comment,
  useCreateCommentMutation,
  useGetCommentsQuery,
  User,
} from '../../../graphql/types.generated'
import { useViewer } from '../../providers/ViewerProvider'

interface CommentsDetailProps {
  postId: string
  inViewRef: (node: Element | null) => void
}

const CommentsList = (props: CommentsDetailProps) => {
  const { postId, inViewRef } = props

  const {
    data: viewerData,
    loading: viewerLoading,
    error: viewerError,
  } = useViewer()

  const viewer = viewerData?.viewer

  const {
    data: commentsData,
    loading: commentsLoading,
    error: commentsError,
  } = useGetCommentsQuery({
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
      {!commentsLoading ? (
        commentsData &&
        commentsData.comments &&
        commentsData.comments.length > 0 ? (
          commentsData.comments.map((comment) => (
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
