import { Comment } from '../../../../graphql/types.generated'
import moment from 'moment'

const CommentDate = ({ comment }: { comment: Comment }) => {
  return (
    <p className="text-neutral-600">
      {Math.abs(
        moment(comment.createdAt).diff(moment(comment.updatedAt), 'minutes')
      ) > 5
        ? 'Edited ' + moment(comment.updatedAt).fromNow()
        : moment(comment.createdAt).fromNow()}
    </p>
  )
}

export default CommentDate
