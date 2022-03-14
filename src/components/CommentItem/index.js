import {formatDistanceToNow} from 'date-fns'

const CommentItem = props => {
  const {commentDetails} = props
  const {id, name, comment, date, isLiked, initialbg} = commentDetails
  const initial = name ? name[0].toUpperCase() : ''
  const likeImage = isLiked
    ? 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'
  const postedTime = formatDistanceToNow(date)

  const onLike = () => {
    const {toggleIsLiked} = props
    toggleIsLiked(id)
  }

  const onDeleteComment = () => {
    const {onDelete} = props
    onDelete(id)
  }
  return (
    <li>
      <div>
        <div>
          <p>{initial}</p>
        </div>
        <div>
          <p>{name}</p>
          <p>{postedTime}</p>
        </div>
        <p>{comment}</p>
      </div>
      <div>
        <div>
          <img src={likeImage} alt="like" />
          <button type="button" onClick={onLike}>
            Like{' '}
          </button>
        </div>
        <button onClick={onDeleteComment} type="button">
          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
            alt="delete"
          />
        </button>
      </div>
      <hr />
    </li>
  )
}

export default CommentItem
