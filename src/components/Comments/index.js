import {Component} from 'react'
import {v4} from 'uuid'
import CommentItem from '../CommentItem'
import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

class Comments extends Component {
  state = {name: '', comment: '', commentsList: []}

  onChangeName = event => {
    this.setState({name: event.target.value})
  }

  onChangeComment = event => {
    this.setState({comment: event.target.value})
  }

  onAddButton = event => {
    event.preventDefault()
    const {name, comment} = this.state
    const initialBackGroundColor = `${
      initialContainerBackgroundClassNames[
        Math.ceil(
          Math.random() * initialContainerBackgroundClassNames.length - 1,
        )
      ]
    }`
    const newComment = {
      id: v4(),
      name,
      comment,
      date: new Date(),
      isLiked: false,
      initialbg: initialBackGroundColor,
    }
    this.setState(prevState => ({
      commentsList: [...prevState.commentsList, newComment],
      name: '',
      comment: '',
    }))
  }

  toggleIsLiked = id => {
    this.setState(prevState => ({
      commentsList: prevState.commentsList.map(eachComment => {
        if (id === eachComment.id) {
          return {...eachComment, isLiked: !eachComment.isLiked}
        }
        return eachComment
      }),
    }))
  }

  onDelete = id => {
    const {commentsList} = this.state

    this.setState({
      commentsList: commentsList.filter(comment => comment.id !== id),
    })
  }

  renderCommentsList = () => {
    const {commentsList} = this.state

    return commentsList.map(eachComment => (
      <CommentItem
        key={eachComment.id}
        commentDetails={eachComment}
        toggleIsLiked={this.toggleIsLiked}
        deleteComment={this.onDelete}
      />
    ))
  }

  render() {
    const {comment, name, commentsList} = this.state
    return (
      <div>
        <div>
          <h1>Comments</h1>
          <form onSubmit={this.onAddButton}>
            <p>Say something about 4.0 Technologies</p>
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={this.onChangeName}
            />
            <textarea
              type="text"
              placeholder="Your Comment"
              value={comment}
              row="6"
              onChange={this.onChangeComment}
            />
            <button type="submit" onClick={this.onAddButton}>
              Add Comment
            </button>
          </form>
          <img
            className="image"
            src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
            alt="comments"
          />
        </div>
        <hr />
        <div>
          <p>
            <span>{commentsList.length}Comments</span>
          </p>
          <ul>{this.renderCommentsList}</ul>
        </div>
      </div>
    )
  }
}
export default Comments
