import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <>
      <li className='text-primary'>
        <Link to='/'>Home</Link>
      </li>
      <li className='text-primary'>
        <Link to='/profile/testprofile'>Profile</Link>
      </li>
      <li className='text-primary'>
        <Link to='/auth/login'>Login</Link>
      </li>
      <li className='text-primary'>
        <Link to='/auth/register'>Register</Link>
      </li>
      <li className='text-primary'>
        <Link to='/new-post'>New post</Link>
      </li>
    </>
  )
}

export default Header
