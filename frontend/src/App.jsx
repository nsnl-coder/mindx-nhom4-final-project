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
  UserSettings,
  Search,
} from './pages/index'

import ContextProvider from './contexts'
import ChatApp from './pages/ChatApp/ChatApp'
import DirectMessage from './pages/ChatApp/directMessage/DirectMessage'
import Notify from './pages/ChatApp/notify/Notify'
import UserList from './pages/ChatApp/userList/UserList'
import useCallApi from './hooks/useCallApi'

import { useTranslation } from 'react-i18next'
import { useState } from 'react'

const App = () => {
  const { i18n } = useTranslation()
  const [language, setLanguage] = useState(localStorage.getItem('language'))

  const onLanguageChange = (e) => {
    const newLanguage = e.target.value
    setLanguage(newLanguage)
    i18n.changeLanguage(newLanguage)
    localStorage.setItem('language', newLanguage)
  }

  return (
    <ContextProvider>
      <label htmlFor="language"></label>
      <select
        name="language"
        id="language"
        onChange={onLanguageChange}
        value={language}
      >
        <option value="en">English</option>
        <option value="vi">Tiếng việt</option>
      </select>
      <ToastContainer limit={3} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/profile/:id/*" element={<UserProfile />} />
        <Route path="/settings" element={<UserSettings />} />
        <Route path="/post/:id" element={<PostDetail />} />
        <Route path="/auth/*" element={<Auth />} />
        <Route path="/new-post" element={<NewPost />} />
        <Route path="/chat" element={<ChatApp />}>
          <Route path="direct/:id" element={<DirectMessage />} />
          <Route path="my-profile" element={<UserSettings />} />
          <Route path="notify" element={<Notify />} />
          <Route path="/chat/users" element={<UserList />} />
        </Route>

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </ContextProvider>
  )
}

export default App
