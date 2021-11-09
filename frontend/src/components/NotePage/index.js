import './NotePage.css';
import SideBar from './SideBar';
import NoteEditor from './NoteEditor';

export default function NotePage () {
  return (
    <div className='note-container'>
      <SideBar />
      <NoteEditor />
    </div>
  );
}
