import { Link } from 'react-router-dom';
import logo from '../../assets/logo-full.svg';

const Header = () => {
  return (
    <>
      <div>
        <img src={logo} alt="" />
        <input type="search" className="border text-primary" />
      </div>
      <div></div>
      {/* <li className='text-primary'>
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
      </li> */}
    </>
  );
};

export default Header;
