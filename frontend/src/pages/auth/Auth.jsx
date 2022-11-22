import { Routes, Route } from 'react-router-dom'
import notLoggedInOnly from '../../components/hoc/notLoggedInOnly'
import Login from './Login'
import Register from './Register'
import VerifySuccess from './VerifiedSuccess'
import Verify from './Verify'
const Auth = () => {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="verified/:id/:token" element={<VerifySuccess />} />
      <Route path="verify" element={<Verify />} />
    </Routes>
  )
}

export default notLoggedInOnly(Auth)
