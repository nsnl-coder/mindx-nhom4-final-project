import React from 'react'
import Header from '../header/Header'

const wrapperWithHeader = (OriginalComponent) => {
  const NewComponent = () => {
    return (
      <>
        <Header>
          <OriginalComponent />
        </Header>
      </>
    )
  }
  return NewComponent
}

export default wrapperWithHeader
