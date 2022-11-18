import { Link } from 'react-router-dom'

import saveIcon from '../../../assets/icon-save.svg'
import deleteIcon from '../../../assets/icon-delete.svg'

const PostCard = ({ post }) => {
  const currentUser = true

  return (
    <div>
      <div className="hover:shadow-xl image-full group relative">
        <Link to={`../post/${post._id}`}>
          <div className="w-full h-full group-hover:bg-black/30 absolute rounded-xl"></div>
          <img src={post.photo} alt={post.title} className="rounded-xl" />
          <p className="hidden group-hover:block absolute bottom-2 left-3 right-3 text-white text-md truncate">
            {post.title}
          </p>
        </Link>
        <button
          type="button"
          className="hidden group-hover:block absolute top-2 left-2"
        >
          <img
            src={currentUser?._id === post.author._id ? deleteIcon : saveIcon}
            alt={currentUser?._id === post.author._id ? 'delete-icon' : 'save-icon'}
          />
        </button>
      </div>
      <Link to={`../profile/${post.author._id}`} className="flex py-2 items-end">
        <img className="h-10 w-10 md:h-8 md:w-8 mr-4 rounded-full shadow-md" src={post.author.profileImage} alt="logo" />
        <h4 className="text-text mr-2 text-lg md:text-md truncate">{`${post.author.firstName} ${post.author.lastName}`}</h4>
      </Link>
    </div>
  )
}

export default PostCard
