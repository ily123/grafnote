import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../store/session';
// import { NavLink } from 'react-router-dom';

export default function ProfileButton ({ user }) {
  const dispatch = useDispatch();
  const [menuOpen, setMenuOpen] = useState(false);

  const openMenu = () => setMenuOpen(true);
  const hideMenu = () => setMenuOpen(false);
  useEffect(() => {
    if (menuOpen) {
      document.addEventListener('click', hideMenu);
      return () => document.removeEventListener('click', hideMenu);
    }
  }, [menuOpen]);

  const menu =
    <ul>
      <li>{user.username}</li>
      <li>{user.email}</li>
      <li onClick={() => dispatch(logoutUser())}><i className="fas fa-sign-out-alt"/>Log out</li>
    </ul>;

  return (
    <div>
      <button onClick={openMenu}>Profile</button>
      {menuOpen && menu}
    </div>
  );
}
