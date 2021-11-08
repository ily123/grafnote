import './LandingPage.css';
import { NavLink } from 'react-router-dom';

export default function LandingPage () {
  return (
    <div className='landing-page'>
      <div className='hero-container'>
        <div className='hero-text'>
          <h1>Organize your notes,<br/>organize your thoughts.</h1>
          <p>Grafnote is a <b>minimalistic</b> note taking app<br/>
             with <b>markdown support</b> and graph navigation.
          </p>
        </div>
        <NavLink className='hero-demo-login' to='/test'><p>Login as Demo User</p><p>No sign up requried</p></NavLink>
        <div className='hero-image'></div>
      </div>
    </div>
  );
}
