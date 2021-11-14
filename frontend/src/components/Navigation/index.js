import './Navigation.css';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../store/session';

export default function Navigation () {
  const dispatch = useDispatch();
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
              <li><NavLink to='/notes'>
                <i className="fas fa-sticky-note"></i> Notes</NavLink>
              </li>
              <li onClick={() => dispatch(logoutUser())}>
                <i className="fas fa-sign-out-alt"/> {`Log out (${user.email})`}
              </li>
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
