import './Navigation.css';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';

export default function Navigation () {
  const user = useSelector(state => state.session);
  return (
    <header>
      <NavLink className='logo-wrapper' to='/'>
        <div className='icons8-jewel'></div>
        <div className='logo'>G R A F N O T E</div>
      </NavLink>
      <ul className="navigation-container">
        {user
          ? (
            <>
              <li><NavLink to='/notes'>Your Notes</NavLink></li>
              <li><ProfileButton user={user}/></li>
            </>)
          : (
            <>
              <li><NavLink to='/login'>Login</NavLink></li>
              <li><NavLink to='/signup'>Signup</NavLink></li>
            </>
          )}
      </ul>
    </header>
  );
}
