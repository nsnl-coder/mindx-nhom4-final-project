import React from 'react'
import Header from '../header/Header'

const wrapperWithHeader = (OriginalComponent) => {
  const NewComponent = () => {
    return (
      <>
        <Header />
        <OriginalComponent />
      </>
    )
  }
  return NewComponent
}

export default wrapperWithHeader
