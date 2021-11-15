import './Footer.css';
import { Link } from 'react-router-dom';

export default function Footer () {
  return (
    <footer>
      <div className='my-name'>
        <div className='one'>made by</div> <div className="two"><a href="https://ilyanovikov.io">ilya novikov</a></div>
      </div>
      <div className="social-media-links">
        <Link to='https://github.com/ily123/grafnote'>
          <i className="fab fa-github-square"/>
        </Link>
        <a href='https://www.linkedin.com/in/ilyabnovikov'>
          <i className="fab fa-linkedin"/>
        </a>
        <a href='mailto:ibnovikov@gmail.com'>
          <i className="fas fa-envelope-square"/>
        </a>
      </div>
    </footer>
  );
}
