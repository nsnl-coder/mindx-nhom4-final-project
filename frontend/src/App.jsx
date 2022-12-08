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

import { useTranslation } from 'react-i18next'
import { useState } from 'react'

import { BiGlobe } from 'react-icons/bi'

const App = () => {
  const { i18n } = useTranslation()
  const [language, setLanguage] = useState(localStorage.getItem('language'))

  const onLanguageChange = (e) => {
    const newLanguage = e.target.dataset.name
    setLanguage(newLanguage)
    i18n.changeLanguage(newLanguage)
    localStorage.setItem('language', newLanguage)
  }

  return (
    <ContextProvider>
      <div className="absolute -top-6 md:-top-5 right-1 md:right-2 xl:right-10 z-10">
        <div className="dropdown dropdown-hover dropdown-end pl-6 text-text">
          <label tabIndex={0} className="collapse-title text-4xl font-medium cursor-pointer">
            <BiGlobe />
          </label>
          <div className="collapse-content text-md rounded-xl bg-white">
            <ul tabIndex={0} className="dropdown-content menu w-32 bg-base-100 shadow-md rounded-xl top-24">
              <li data-name="en" className={`w-full p-2 hover:bg-gray-200 ${language === 'en' ? 'font-semibold' : ''} cursor-pointer`} onClick={onLanguageChange}>English</li>
              <li data-name="vi" className={`w-full p-2 hover:bg-gray-200 ${language === 'vi' ? 'font-semibold' : ''} cursor-pointer`} onClick={onLanguageChange}>Tiếng Việt</li>
            </ul>
          </div>
        </div>
      </div>
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
