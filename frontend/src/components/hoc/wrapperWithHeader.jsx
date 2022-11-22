import React from 'react'
import { Header } from '../index'

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
