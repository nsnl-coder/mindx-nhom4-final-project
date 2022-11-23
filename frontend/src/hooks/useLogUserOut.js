import { useContext } from 'react'
import { AuthContext } from '../contexts'
import { showToastSuccess } from '../utils/toast'
import { useNavigate } from 'react-router-dom'

export default function useLogUserOut() {
  const { setAuth } = useContext(AuthContext)
  const navigate = useNavigate()

  const logOut = () => {
    setAuth({ isLoggedIn: false })
    localStorage.removeItem('auth')
    showToastSuccess('Log out successfully')
    navigate('/')
  }

  return { logOut }
}
