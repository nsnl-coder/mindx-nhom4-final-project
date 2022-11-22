import { useState, useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import { TailSpin } from 'react-loader-spinner'
import Masonry from 'react-masonry-css'
import ScrollToTop from 'react-scroll-to-top'

import useCallApi from '../../hooks/useCallApi'
import iconUp from '../../assets/icon-angle-up.svg'
import './Feed.css'
import PostCard from './postCard/PostCard'

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

const Feed = () => {
  const { isLoading, error, sendRequest } = useCallApi()

  const [posts, setPosts] = useState([])
  const [hasMore, setHasMore] = useState(true)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const useApiData = (data) => {
    if (data.length > 0) {
      setHasMore(true)
      setPosts((prev) => [...prev, ...data])
      const newData = [...posts, ...data]
    } else {
      setHasMore(false)
      return
    }
  }

  const loadFunc = (page) => {
    sendRequest(
      {
        url: `${import.meta.env.VITE_BACKEND_HOST}/api/post/?page=${page}`,
        method: 'get',
      },
      useApiData
    )
  }

  if (error) return <Error />

  return (
    <div className="bg-white relative">
      <InfiniteScroll
        pageStart={0}
        loadMore={loadFunc}
        hasMore={hasMore}
        loader={
          <div className="w-full flex justify-center mb-5" key={0}>
            <Spinner />
          </div>
        }
      >
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {posts.map((post) => (
            <PostCard post={post} key={post._id} />
          ))}
        </Masonry>
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

// debounce to ignore triggering too many events

const debounce = (func, timeout = 300) => {
  let timer
  return (...args) => {
    if (!timer) {
      func.apply(this, args)
    }
    clearTimeout(timer)
    timer = setTimeout(() => {
      timer = undefined
    }, timeout)
  }
}
