import { UserProfile, Auth, NewPost, PageNotFound } from './pages/index'
import { Routes, Route } from 'react-router-dom'

import Home from './pages/home/Home'

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile/:id" element={<UserProfile />} />
        <Route path="/auth/*" element={<Auth />} />
        <Route path="/new-post" element={<NewPost />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <div className="h-screen"></div>
    </>
  )
}

export default App
