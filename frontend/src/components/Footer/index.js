import './Footer.css';

export default function Footer () {
  return (
    <footer>
      <div className='my-name'>
        <div className='one'>made by</div> <div className="two"><a href="https://ilyanovikov.io">ilya novikov</a></div>
      </div>
      <div className="social-media-links">
        <a target="_blank" href='https://github.com/ily123/grafnote' rel="noreferrer">
          <i className="fab fa-github-square"/>
        </a>
        <a target="_blank" href='https://www.linkedin.com/in/ilyabnovikov' rel="noreferrer">
          <i className="fab fa-linkedin"/>
        </a>
        <a target="_blank" href='mailto:ibnovikov@gmail.com' rel="noreferrer">
          <i className="fas fa-envelope-square"/>
        </a>
      </div>
    </footer>
  );
}
