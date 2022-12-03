import { useContext } from 'react'
import { AuthContext } from '../contexts'
import { showToastSuccess } from '../utils/toast'
import { useNavigate } from 'react-router-dom'
import useCallApi from './useCallApi'
export default function useLogUserOut() {
  const { sendRequest } = useCallApi()
  const { setAuth } = useContext(AuthContext)
  const navigate = useNavigate()

  const logOut = () => {
    setAuth({ isLoggedIn: false })
    localStorage.removeItem('auth')
    sendRequest({ url: '/api/auth/logout' })
    showToastSuccess('Log out successfully')
    navigate('/')
  }

  return { logOut }
}
