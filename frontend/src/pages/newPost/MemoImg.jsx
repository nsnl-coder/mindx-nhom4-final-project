import React from 'react'

const MemoImg = ({ link, setFormError, errorMessage }) => {
  const onImageLoad = (e) => {
    const width = e.target.offsetWidth
    const height = e.target.offsetHeight

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
  return <img src={link} onLoad={onImageLoad} alt="Selected Photo" />
}

export default React.memo(MemoImg)
