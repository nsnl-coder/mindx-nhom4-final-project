import Masonry from 'react-masonry-css'

import posts from '../../data/post (1).json'
import logo from '../../assets/logo-icon-small.svg'
import './Feed.css'

const breakpointColumnsObj = {
  default: 6,
  1280: 5,
  1024: 4,
  768: 3,
  640: 2,
};

const Feed = () => {
  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column"
    >
      {posts.slice(0, 20).map((post) => (
        <div>
          <img key={post.photo} src={post.photo} className="rounded-lg" alt={post.title} />
          <div className="flex py-4 items-center">
            <img className="h-8 w-8 mr-4" src={logo} alt="logo" />
            <h4>Author</h4>
          </div>
        </div>
      ))}
    </Masonry>
  )
}

export default Feed