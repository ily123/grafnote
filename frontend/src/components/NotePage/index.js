import './NotePage.css';
import SideBar from './SideBar';
import NoteEditor from './NoteEditor';

export default function NotePage () {
  console.log('hello from the notes component!');
  // we need to fetch user's notes
  return (
    <div className='note-container'>
      <SideBar />
      <NoteEditor />
    </div>
  );
}
