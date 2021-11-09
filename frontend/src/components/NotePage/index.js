import './NotePage.css';
import SideBar from './SideBar';
import NoteEditor from './NoteEditor';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchNotes } from '../../store/notes';

export default function NotePage () {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchNotes());
  }, [dispatch]);

  return (
    <div className='note-container'>
      <SideBar />
      <NoteEditor />
    </div>
  );
}
