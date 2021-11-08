import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../store/session';
// import { NavLink } from 'react-router-dom';

export default function ProfileButton ({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  console.log(showMenu);
  useEffect(() => {
    // do nothing for now
    setShowMenu(false);
  }, []);

  const toggleMenu = () => {
    setShowMenu(state => !state);
  };

  const menu =
    <ul>
      <li>{user.username}</li>
      <li>{user.email}</li>
      <li onClick={() => dispatch(logoutUser())}><i className="fas fa-sign-out-alt"/>Log out</li>
    </ul>;

  return (
    <div>
      <button onClick={toggleMenu}>Profile</button>
      {showMenu && menu}
    </div>
  );
}
