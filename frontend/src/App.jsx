import { Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'

import useCallApi from './hooks/useCallApi'
import { Home, UserProfile, Auth, NewPost, PageNotFound } from './pages/index'

const App = () => {
  // const { isLoading, error, sendRequest } = useCallApi()

  // const useApiData = (data) => {
  //   console.log(data)
  // }

  // useEffect(() => {
  //   sendRequest(
  //     {
  //       url: 'https://dummyjson.com/products/1',
  //       method: 'get',
  //     },
  //     useApiData
  //   )
  // }, [])

  return (
    <>
      {/* {error && <p>error</p>}
      {isLoading && <p>Loading....</p>} */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile/:id" element={<UserProfile />} />
        <Route path="/auth/*" element={<Auth />} />
        <Route path="/new-post" element={<NewPost />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  )
}

export default App
