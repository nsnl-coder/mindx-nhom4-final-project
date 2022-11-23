import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

//
import {
  Home,
  UserProfile,
  Auth,
  NewPost,
  PageNotFound,
  PostDetail,
  UserSettings
} from './pages/index'

import ContextProvider from './contexts/ContextProvider'
import ChatApp from './pages/ChatApp/ChatApp'
import { useEffect } from 'react'

const App = () => {
  return (
    <ContextProvider>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile/:id/*" element={<UserProfile />} />
        <Route path="settings" element={<UserSettings />} />
        <Route path="/post/:id" element={<PostDetail />} />
        <Route path="/auth/*" element={<Auth />} />
        <Route path="/new-post" element={<NewPost />} />
        <Route path="/chat" element={<ChatApp />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </ContextProvider>
  )
}

export default App
