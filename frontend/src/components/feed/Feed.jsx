import { useState, useEffect, useRef } from 'react'
import { useContext } from 'react'
import Masonry from 'react-masonry-css'
import ScrollToTop from 'react-scroll-to-top'

import './Feed.css'
import { Spinner } from '../'
import PostCard from './postCard/PostCard'
import iconUp from '../../assets/icon-angle-up.svg'
import Error from '../ui/Error'
import useInfiniteFetch from '../../hooks/useInfiniteFetch'
import { AuthContext } from '../../contexts/AuthContext'
import { showToastSuccess } from '../../utils/toast'
const breakpointColumnsObj = {
  default: 6,
  1280: 5,
  1024: 4,
  768: 3,
  640: 2,
}

const Feed = ({ user, collection, apiUrl }) => {
  const { auth } = useContext(AuthContext)
  const {
    isLoading,
    error,
    sendRequest,
    setHasMore,
    lastElementRef,
    pageNumber,
    setPageNumber,
  } = useInfiniteFetch()

  const [posts, setPosts] = useState([])
  const [notFound, setNotFound] = useState(false)

  const timeoutRef = useRef()

  const useApiData = (data) => {
    if (data.length === 0) {
      setHasMore(false)
      setNotFound(true)
      return
    } else {
      setHasMore(true)
      const newData = [...new Set([...posts, ...data])]
      setPosts(newData)
      return
    }
  }

  const handleDeletePost = (id) => {
    const successfullyDelete = () => {
      showToastSuccess('Successful Deleted')
      setPosts((posts) => posts.filter((item) => item._id !== id))
    }
    sendRequest(
      {
        url: `/api/post/${auth?.userId}/${id}`,
        method: 'delete',
      },
      successfullyDelete
    )
  }
  const handleDeleteSavedPost = (id) => {
    const successfullyDelete = () => {
      showToastSuccess('Successful Deleted')
      setPosts((posts) => posts.filter((item) => item._id !== id))
    }
    sendRequest(
      {
        url: `/api/user/remove-savedPost/${auth?.userId}`,
        method: 'put',
        data: { id },
      },
      successfullyDelete
    )
  }
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => {
      if (collection === 'saved') {
        setPageNumber(1)
        let saved = user?.savedPosts?.slice(
          (pageNumber - 1) * 10,
          (pageNumber - 1) * 10 + 9
        )

        if (saved?.length > 0 || pageNumber === 0) {
          setHasMore(true)
          const newData = [...new Set([...posts, ...saved])]
          setPosts(newData)

          return
        } else {
          setHasMore(false)
          return
        }
      } else if (collection === 'posts') {
        setPageNumber(1)
        let saved = user?.userPosts?.slice(
          (pageNumber - 1) * 10,
          (pageNumber - 1) * 10 + 9
        )

        if (saved?.length > 0 || pageNumber === 0) {
          setHasMore(true)
          const newData = [...new Set([...posts, ...saved])]
          setPosts(newData)

          return
        } else {
          setHasMore(false)
          return
        }
      } else {
        sendRequest(
          {
            url: `${apiUrl}?page=${pageNumber}`,
            method: 'get',
          },
          useApiData
        )
      }
    }, 500)
  }, [pageNumber, apiUrl])
  useEffect(() => {
    console.log(user)
  }, [user])
  if (posts.length === 0 && notFound) {
    return (
      <div className="h-[50vh] flex flex-col items-center justify-center">
        <h3 className="text-text font-semibold text-2xl">
          It seems there is no post.
        </h3>
      </div>
    )
  }

  if (error) return <Error />

  return (
    <div className={`bg-white relative ${!user && 'min-h-screen'}`}>
      {posts.length > 0 && (
        <div className="min-h-screen">
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
            key={1}
          >
            {posts.map((post, index) => {
              if (posts.length === index + 1) {
                return (
                  <PostCard
                    key={post._id}
                    user={user}
                    post={post}
                    handleDeletePost={handleDeletePost}
                    collection={collection}
                    handleDeleteSavedPost={handleDeleteSavedPost}
                  />
                )
              } else {
                return (
                  <PostCard
                    key={post._id}
                    user={user}
                    post={post}
                    handleDeletePost={handleDeletePost}
                    collection={collection}
                    handleDeleteSavedPost={handleDeleteSavedPost}
                  />
                )
              }
            })}
          </Masonry>
        </div>
      )}
      <ScrollToTop
        smooth
        className="w-11 h-11 flex justify-center items-center rounded-full"
        component={<img src={iconUp} alt="icon-up" />}
      />
      {isLoading ? <Spinner /> : null}
      <div className="h-2 absolute bottom-0" ref={lastElementRef}></div>
    </div>
  )
}

export default Feed
