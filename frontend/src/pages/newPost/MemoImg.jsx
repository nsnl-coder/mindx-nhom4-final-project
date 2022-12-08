import React from 'react'

const MemoImg = ({ link, setFormError, errorMessage }) => {
  const onImageLoad = (e) => {
    const width = e.target.naturalWidth
    const height = e.target.naturalHeight

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
