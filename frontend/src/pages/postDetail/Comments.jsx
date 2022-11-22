import { Button } from '../../components'
import { MdAddComment } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../contexts'
import { useContext } from 'react'

const Comments = ({ comments }) => {
  const { auth } = useContext(AuthContext)

  return (
    <>
      <div className="flex gap-x-3 !mb-6">
        <input
          type="text"
          className="border-b-2 flex-grow outline-none"
          placeholder="What do you think?"
        />
        <Button text="comment" />
      </div>
      {comments.length > 0 &&
        comments.map((comment) => (
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
      {comments.length == 0 && (
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
