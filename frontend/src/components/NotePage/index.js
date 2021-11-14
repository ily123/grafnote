import './NotePage.css';
import SideBar from './SideBar';
import NoteEditor from './NoteEditor';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { fetchNotesAndNotebooks } from '../../store/notes';

export default function NotePage () {
  const user = useSelector(state => state.session);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchNotesAndNotebooks());
  }, [dispatch]);

  const { notes, folders } = useSelector(state => state.notes);
  if (!user) return <Redirect to='/login' />;
  if (!notes || !folders) return null;
  return (
    <div className='note-container'>
      <SideBar notes={notes} folders={folders}/>
      <NoteEditor notes={notes} folders={folders}/>
    </div>
  );
}
