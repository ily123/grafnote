import './Navigation.css';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';

export default function Navigation () {
  const user = useSelector(state => state.session);
  return (
    <header>
      <div className='logo'><NavLink to='/'>G R A F N O T E</NavLink></div>
      <ul className="navigation-container">
        <li><NavLink to='/'>Home</NavLink></li>
        <li><NavLink to='/test'>Test</NavLink></li>
        {user
          ? (<li><ProfileButton user={user}/></li>)
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
