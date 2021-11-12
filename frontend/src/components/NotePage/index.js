import './NotePage.css';
import SideBar from './SideBar';
import NoteEditor from './NoteEditor';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNotesAndNotebooks } from '../../store/notes';

export default function NotePage () {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchNotesAndNotebooks());
  }, [dispatch]);

  const { notes, folders } = useSelector(state => state.notes);
  if (!notes || !folders) return null;
  return (
    <div className='note-container'>
      <SideBar notes={notes} folders={folders}/>
      <NoteEditor notes={notes}/>
    </div>
  );
}
