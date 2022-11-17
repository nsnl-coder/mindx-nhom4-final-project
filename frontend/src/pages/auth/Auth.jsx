import { Routes, Route } from 'react-router-dom'
import notLoggedInOnly from '../../components/hoc/notLoggedInOnly'
import Login from './Login'
import Register from './Register'

const Auth = () => {
  return (
    <Routes>
      <Route path='login' element={<Login />} />
      <Route path='register' element={<Register />} />
    </Routes>
  )
}

export default notLoggedInOnly(Auth)
