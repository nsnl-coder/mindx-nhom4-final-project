import { useState, useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import Masonry from 'react-masonry-css'

import useCallApi from '../../hooks/useCallApi'
import logo from '../../assets/logo-icon-small.svg'
import './Feed.css'

const breakpointColumnsObj = {
  default: 6,
  1280: 5,
  1024: 4,
  768: 3,
  640: 2,
}

const Feed = () => {
  const { isLoading, error, sendRequest } = useCallApi()

  const [items, setItems] = useState([])

  const useApiData = (data) => {
    if (error) return
    setItems((prev) => [...prev, ...data])
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

  return (
    // items.length !== 0 ?
      (<InfiniteScroll
        pageStart={0}
        loadMore={loadFunc}
        hasMore={true || false}
        loader={<div className="loader" key={0}>Loading ...</div>}
      >
        <Masonry
          key={1}
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {items.map((item) => (
            <div key={item._id["$oid"]}>
              <img
                src={item.photo}
                className="rounded-lg"
                alt={item.title}
              />
              <div className="flex py-4 items-center">
                <img className="h-8 w-8 mr-4" src={logo} alt="logo" />
                <h4>Author</h4>
              </div>
            </div>
          ))}
        </Masonry>
      </InfiniteScroll>)
      // : <h4>Empty...</h4>
  )
}

export default Feed
