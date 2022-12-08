import React from 'react'

const MemoImg = ({ link, setFormError, errorMessage }) => {
  const onImageLoad = (e) => {
    const width = e.target.width
    const height = e.target.height

    console.log(width, height)

    if (width < 300 || height < 300) {
      setFormError((prev) => {
        return {
          ...prev,
          photo: errorMessage,
        }
      })
    } else {
      setFormError((prev) => {
        return { ...prev, photo: undefined }
      })
    }
  }
  return <img onLoad={onImageLoad} src={link} alt="Selected Photo" />
}

export default React.memo(MemoImg)
