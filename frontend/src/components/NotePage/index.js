import './NotePage.css';
import SideBar from './SideBar';
import NoteEditor from './NoteEditor';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNotes } from '../../store/notes';

export default function NotePage () {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchNotes());
  }, [dispatch]);

  const { notes } = useSelector(state => state.notes);
  if (!notes) return null;
  return (
    <div className='note-container'>
      <SideBar notes={notes}/>
      <NoteEditor notes={notes}/>
    </div>
  );
}
