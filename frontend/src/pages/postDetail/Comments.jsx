import { Button, LoadingSpinner } from '../../components'
import { MdAddComment } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../contexts'
import { useContext, useState } from 'react'
import useAddNewComment from '../../hooks/useAddNewComment'

const Comments = ({ comments }) => {
  const { auth } = useContext(AuthContext)
  const { profileImage, isLoggedIn } = auth
  const [comment, setComment] = useState('')
  const [commentError, setcommentError] = useState('')
  const { isLoading, newComments, addNewCommentRequest } = useAddNewComment()

  const displayComments = [...newComments, ...comments]

  console.log(displayComments)

  const onCommentChange = (e) => {
    setcommentError('')
    setComment(e.target.value)
  }

  const onSubmitCommentHandler = () => {
    if (comment.trim().length === 0) {
      return setcommentError('Please provide comment content')
    }
    addNewCommentRequest(comment)
    setComment('')
  }

  return (
    <>
      {!isLoggedIn && (
        <div className="text-gray-500 text-sm !mb-2">
          Please login to leave comment!
        </div>
      )}
      {isLoggedIn && (
        <div className="flex gap-x-6 !mb-6 items-start">
          <div className="w-12 aspect-square overflow-hidden bg-gray-100 flex-shrink-0 rounded-full">
            <img
              src={profileImage}
              alt="profile image"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-grow">
            <textarea
              type="text"
              className="border-b-2 w-full h-24 outline-none"
              placeholder="What do you think?"
              onChange={onCommentChange}
              value={comment}
            />
            {commentError && (
              <p className="text-red-400 text-sm">{commentError}</p>
            )}
          </div>

          <Button
            text="comment"
            className="self-end mb-2"
            onClick={onSubmitCommentHandler}
          />
        </div>
      )}
      {isLoading && <LoadingSpinner />}
      {displayComments.length > 0 &&
        displayComments.map((comment) => (
          <div key={comment._id} className="flex items-start gap-x-6">
            <div className="w-12 aspect-square overflow-hidden bg-gray-100 flex-shrink-0 rounded-full">
              <Link to={`/profile/${comment.authorId._id}`}>
                <img
                  src={comment.authorId.profileImage}
                  alt="profile image"
                  className="w-full h-full object-cover"
                />
              </Link>
            </div>
            <div>
              <Link to={`/profile/${comment.authorId._id}`}>
                <p className="font-semibold">{comment.authorId.username}</p>
              </Link>
              <p>{comment.content}</p>
            </div>
          </div>
        ))}
      {displayComments.length == 0 && (
        <div className="flex-col flex flex-grow justify-center items-center text-gray-300 text-8xl">
          <MdAddComment />
          <p className="text-base mb-12">
            No one comments yet! Why not be the first one!
          </p>
        </div>
      )}
    </>
  )
}

export default Comments
