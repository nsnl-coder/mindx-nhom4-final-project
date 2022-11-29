import { MdAddComment } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { useContext, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
//
import { Button, LoadingSpinner } from '../../components'
import { AuthContext } from '../../contexts'
import useAddNewComment from '../../hooks/useAddNewComment'
import ReactMentions from '../../components/react-mentions/ReactMentions'
import CommentContent from './CommentContent'

const Comments = ({ comments }) => {
  const { auth } = useContext(AuthContext)
  const { profileImage, isLoggedIn } = auth
  const [comment, setComment] = useState('')
  const [commentError, setcommentError] = useState('')
  const { isLoading, newComments, addNewCommentRequest } = useAddNewComment()
  const { t } = useTranslation()
  const commentRef = useRef()
  const commentId = new URLSearchParams(window.location.search).get('commentId')

  const displayComments = [...newComments, ...comments]

  const onSubmitCommentHandler = () => {
    if (comment.trim().length === 0) {
      return setcommentError('Please provide comment content')
    }
    addNewCommentRequest(comment)
    setComment('')
  }

  useEffect(() => {
    commentRef.current?.scrollIntoView()
  }, [])

  return (
    <>
      {!isLoggedIn && (
        <div className="text-gray-500 text-sm !mb-2">
          {t('login_to_comment')}
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
            <ReactMentions
              value={comment}
              setValue={setComment}
              placeholder={t('comment_placeholder')}
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
          <div
            key={comment._id}
            className={`flex items-start gap-x-6 py-3 px-1 ${
              comment._id === commentId ? 'bg-gray-100' : ''
            }`}
            ref={comment._id === commentId ? commentRef : null}
          >
            <div className="w-10 aspect-square overflow-hidden bg-gray-100 flex-shrink-0 rounded-full">
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
              <CommentContent
                text={comment.content}
                mentionsId={comment.mentions}
              />
            </div>
          </div>
        ))}
      {displayComments.length == 0 && (
        <div className="flex-col flex flex-grow justify-center items-center text-gray-300 text-8xl">
          <MdAddComment />
          <p className="text-base mb-12">{t('empty_comments')}</p>
        </div>
      )}
    </>
  )
}

export default Comments
