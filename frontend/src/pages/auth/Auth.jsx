import { Routes, Route } from 'react-router-dom'
import notLoggedInOnly from '../../components/hoc/notLoggedInOnly'
import Login from './Login'
import Register from './Register'
import VerifySuccess from './VerifiedSuccess'
import Verify from './Verify'
import ForgottenPass from './ForgottenPass'
import NewPass from './NewPass'
const Auth = () => {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="verified/:id/:token" element={<VerifySuccess />} />
      <Route path="verify/:id" element={<Verify />} />
      <Route path="forgot" element={<ForgottenPass />} />
      <Route path="newPass/:id/:token" element={<NewPass />} />
    </Routes>
  )
}

export default notLoggedInOnly(Auth)
