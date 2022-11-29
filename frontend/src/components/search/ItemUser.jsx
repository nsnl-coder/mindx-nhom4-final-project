import { Link } from 'react-router-dom'
import { useEffect, useContext } from 'react'

import { AuthContext } from '../../contexts/AuthContext'
import saveIcon from '../../assets/icon-save.svg'
import deleteIcon from '../../assets/icon-delete.svg'
import useCallApi from '../../hooks/useCallApi'
import { showToastError, showToastSuccess } from '../../utils/toast'

const SearchCard = ({ post, user }) => {
  const { auth } = useContext(AuthContext)
  const { isLoading, error, sendRequest } = useCallApi()
  const useApiData = (data) => {
    if (data) showToastSuccess('Successfully')
  }

  const handleSavePost = (post) => {
    sendRequest(
      {
        url: `/api/user/save-post/${auth?.userId}`,
        method: 'put',
        data: post,
      },
      useApiData
    )
  }

  const handleDeletePost = (id) => {
    console.log(`/api/post/${id}`)
    sendRequest(
      {
        url: `/api/post/${id}`,
        method: 'delete',
      },
      useApiData
    )
  }

  useEffect(() => {
    if (error) {
      showToastError('Something went wrong, please try again')
    }
  }, [error])

  return (
    <div className="w-full h-full">
      <div className="hover:shadow-xl  group relative rounded-xl">
        <Link to={`../../post/${post?._id}`}>
          <div className="w-full h-full  group-hover:bg-black/30 absolute rounded-xl"></div>
          <img
            src={post?.photo}
            alt={post.title}
            className="rounded-xl  2xl:h-[250px] 2xl:w-[250px] sm:w-[150px] sm:h-[150px] lg:w-[170px] lg:h-[170px] md:w-[160px] md:h-[160px] xl:h-[200px] xl:w-[200px]  w-[140px] h-[140px] overflow-hidden object-cover"
          />
          <p className="hidden group-hover:block absolute bottom-2 left-3 right-3 text-white text-md truncate">
            {post?.title}
          </p>
        </Link>
        {auth?.userId === post?.author?._id ? (
          <button
            type="button"
            className="hidden group-hover:block absolute top-2 left-2"
            onClick={() => handleDeletePost(post?._id)}
          >
            <img src={deleteIcon} alt="delete-icon" />
          </button>
        ) : (
          <button
            type="button"
            className="hidden group-hover:block absolute top-2 left-2"
            onClick={() => handleSavePost(post)}
          >
            <img src={saveIcon} alt="save-icon" />
          </button>
        )}
      </div>
      {!user ? (
        <Link
          to={`../profile/${post?.author?._id}`}
          className="flex py-2 items-end"
        >
          <img
            className="h-10 w-10 md:h-8 md:w-8 mr-4 rounded-full shadow-md"
            src={post?.author?.profileImage}
            alt="logo"
          />
          <h4 className="text-text mr-2 text-lg md:text-md truncate hover:text-primary hover:font-medium">
            {post?.author?.firstName && post.author.lastName
              ? `${post?.author?.firstName} ${post.author.lastName}`
              : `User-${post?.author?._id}`}
          </h4>
        </Link>
      ) : null}
    </div>
  )
}

export default SearchCard
