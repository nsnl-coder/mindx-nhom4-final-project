import { useEffect, useState } from 'react'
import { BsArrowUpCircleFill } from 'react-icons/bs'

const ScrollToTop = ({ topContainerRef }) => {
  const scrollHandler = () => {
    topContainerRef.current.scrollIntoView({ behavior: 'instant' })
  }

  return (
    <div
      onClick={scrollHandler}
      className="absolute bottom-4 right-3 cursor-pointer rounded-full"
    >
      <BsArrowUpCircleFill fontSize={26} />
    </div>
  )
}

export default ScrollToTop
