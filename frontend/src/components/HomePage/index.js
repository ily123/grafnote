import './LandingPage.css';
import { NavLink } from 'react-router-dom';

const endorsements = [
  {
    text: <div>The password fields need to be type <b>password</b>.</div>,
    person: 'Peter Mai',
    title: 'AppAcademy Instructor'
  },
  {
    text: <div>I like the <b>dynamic validation</b> on the sign-up form.</div>,
    person: 'Jordyn Sechrist',
    title: 'AppAcademy Instructor'
  },
  {
    text: <div>By far, the <b>best note-taking app</b> I have ever developed.</div>,
    person: 'Ilya Novikov',
    title: 'Author of Grafnote'
  }
];

function Endorsement ({ content }) {
  const { text, person, title } = content;
  return (
    <div className="endorsement">
      <div className="endorsement-text">{text}</div>
      <div className="endorsement-person">{person}</div>
      <div className="endorsement-title">{title}</div>
    </div>
  );
}

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
        <div className='hero-image'>
        </div>
      </div>
      <div className='endorsement-container'>
        {(endorsements.map((data, index) => <Endorsement key={index} content={data}/>))}
      </div>
      <div className='features-container'>
        <h2>Core Features</h2>
        <ul>
          <li>Text entry is <span>Markdown</span> by default, with live preview</li>
          <li><span>Intuitive</span> folder structure and browser</li>
          <li>All notes can be connected to create a <span>personal network of knowledge</span></li>
          <li><span>Graph view</span> of note connections to map out your notes</li>
          <li>Easy export of all contents as <span>zip-archive of .md files</span></li>
        </ul>
      </div>
    </div>
  );
}
