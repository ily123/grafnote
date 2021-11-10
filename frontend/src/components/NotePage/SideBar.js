import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setActiveNoteId } from '../../store/notes';

export default function SideBar ({ notes }) {
  const dispatch = useDispatch();
  const firstNoteId = Object.keys(notes)[0];

  useEffect(() => {
    dispatch(setActiveNoteId(firstNoteId));
  }, [dispatch]);

  return (
    <div className="note-sidebar-container">
      <h2>Your Notes</h2>
      {(Object.entries(notes).map(([id, note]) => {
        return <div key={id} onClick={() => dispatch(setActiveNoteId(note.id))}>{note.title}</div>;
      }))}
    </div>
  );
}
