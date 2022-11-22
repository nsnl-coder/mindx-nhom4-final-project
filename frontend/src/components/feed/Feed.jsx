import { useState, useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import { TailSpin } from 'react-loader-spinner'
import Masonry from 'react-masonry-css'
import ScrollToTop from 'react-scroll-to-top'

import './Feed.css'
import PostCard from './postCard/PostCard'
import useCallApi from '../../hooks/useCallApi'
import deleteIcon from '../../assets/icon-delete.svg'
import iconUp from '../../assets/icon-angle-up.svg'

const breakpointColumnsObj = {
  default: 6,
  1280: 5,
  1024: 4,
  768: 3,
  640: 2,
}

const Spinner = () => (
  <TailSpin
    height="80"
    width="80"
    color="#F81411"
    ariaLabel="tail-spin-loading"
    radius="1"
    wrapperStyle={{}}
    wrapperClass=""
    visible={true}
  />
)

const Feed = ({ userId, user, collection }) => {
  const { isLoading, error, sendRequest } = useCallApi()

  const [posts, setPosts] = useState([])
  const [hasMore, setHasMore] = useState(true)

  let userName = user?.username

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const loadFuncSaved = (page) => {
    let saved = user?.savedPosts?.slice(page * 10, page * 10 + 9)
    if (saved?.length > 0 || page === 0) {
      setHasMore(true)
      const newData = [...posts, ...saved]
      setPosts(newData)
    } else {
      setHasMore(false)
    }
  }

  const useApiData = (data) => {
    if (data.length > 0) {
      setHasMore(true)
      // setPosts((prev) => [...prev, ...data])
      const newData = [...posts, ...data]
      setPosts(newData)
    } else {
      setHasMore(false)
      return
    }
  }

  const loadFuncOther = (page) => {
    let apiUrl = userId
      ? `${import.meta.env.VITE_BACKEND_HOST}/api/post/name/?page=${page}&userName=${userName}`
      : `${import.meta.env.VITE_BACKEND_HOST}/api/post/?page=${page}`
    // console.log(apiUrl)

    sendRequest(
      {
        url: apiUrl,
        method: 'get',
      },
      useApiData
    )

  }

  if (error)
    return (
      <div className="w-full min-h-screen bg-white p-4 flex flex-col items-center justify-center">
        <div className="scale-[2] -translate-y-10">
          <img src={deleteIcon} alt="error" />
        </div>
        <h3 className="text-primary font-semibold text-2xl">
          Oops! Something went wrong.
        </h3>
      </div>
    )

  if (collection === 'saved')
    return (
      <div className="bg-white relative">
        <InfiniteScroll
          pageStart={0}
          loadMore={loadFuncSaved}
          hasMore={hasMore}
          loader={
            <div className="w-full flex justify-center mb-5" key={0}>
              <Spinner />
            </div>
          }
        >
          {posts.length > 0 ?
            <Masonry
              breakpointCols={breakpointColumnsObj}
              className="my-masonry-grid"
              columnClassName="my-masonry-grid_column"
              key={1}
            >
              {posts.map((post) => (
                <PostCard post={post} key={post._id} user={user} />
              ))}
            </Masonry> :
            <div
              className="h-[50vh] flex flex-col items-center justify-center"
              key={1}
            >
              <h3 className="text-text font-semibold text-2xl">
                It seems there is no post.
              </h3>
            </div>
          }
        </InfiniteScroll>
        <ScrollToTop
          smooth
          className="w-11 h-11 flex justify-center items-center rounded-full"
          component={<img src={iconUp} alt="icon-up" />}
        />
      </div>
    )

  return (
    <div className={`bg-white relative ${!user && "min-h-screen"}`}>
      <InfiniteScroll
        pageStart={0}
        loadMore={loadFuncOther}
        hasMore={hasMore}
        loader={
          <div className="w-full flex justify-center mb-5" key={0}>
            <Spinner />
          </div>
        }
      >
        {posts.length > 0 ?
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
            key={1}
          >
            {posts.map((post) => (
              <PostCard post={post} key={post._id} user={user} />
            ))}
          </Masonry> :
          <div
            className="h-[50vh] flex flex-col items-center justify-center"
            key={1}
          >
            <h3 className="text-text font-semibold text-2xl">
              It seems there is no post.
            </h3>
          </div>
        }
      </InfiniteScroll>
      <ScrollToTop
        smooth
        className="w-11 h-11 flex justify-center items-center rounded-full"
        component={<img src={iconUp} alt="icon-up" />}
      />
    </div>
  )
}

export default Feed