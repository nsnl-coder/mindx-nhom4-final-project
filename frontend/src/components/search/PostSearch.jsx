import { useState, useEffect, useRef } from 'react'
import Masonry from 'react-masonry-css'
import ScrollToTop from 'react-scroll-to-top'

import '../feed/Feed.jsx'
import { Spinner } from '..'
import PostCard from '../feed/postCard/PostCard'
import iconUp from '../../assets/icon-angle-up.svg'
import Error from '../ui/Error'
import useInfiniteFetch from '../../hooks/useInfiniteFetch'

const breakpointColumnsObj = {
  default: 6,
  1280: 5,
  1024: 4,
  768: 3,
  640: 2,
}

const SearchPost = ({ search }) => {
  const {
    isLoading,
    error,
    sendRequest,
    setHasMore,
    lastElementRef,
    pageNumber,
  } = useInfiniteFetch()

  const [posts, setPosts] = useState([])
  const [request, setRequest] = useState(false)
  const [notFound, setNotFound] = useState(false)
  const timeoutRef = useRef()

  const useApiData = (data) => {
    if (data.length === 0) {
      setHasMore(false)
      return
    } else {
      setHasMore(true)
      const newData = [...posts, ...data]
      setPosts(newData)
      return
    }
  }
  const useApiData2 = (data) => {
    if (data.length == 0) {
      setNotFound(true)
    }
    setPosts(data)
    setRequest(true)
  }
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    if (request) {
      clearTimeout(timeoutRef.current)

      timeoutRef.current = setTimeout(() => {
        sendRequest(
          {
            url: `/api/post/search?search=${search}&page=${pageNumber}`,
            method: 'get',
          },
          useApiData
        )
      })
    }
  }, [pageNumber, request])
  useEffect(() => {
    setRequest(false)
    sendRequest(
      {
        url: `/api/post/search?search=${search}&page=1`,
        method: 'get',
      },
      useApiData2
    )
    console.log('a')
  }, [search])
  useEffect(() => {
    console.log(posts)
  }, [posts])
  if (notFound)
    return (
      <div
        className="h-[50vh] flex flex-col items-center justify-center"
        key={1}
      >
        <h3 className="text-text font-semibold text-2xl">
          It seems there is no post.
        </h3>
      </div>
    )
  if (error) return <Error />

  return (
    <div className={`bg-white relative`}>
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
                return <PostCard key={post._id} post={post} />
              } else {
                return <PostCard key={post._id} post={post} />
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

export default SearchPost
