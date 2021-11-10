import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setActiveNoteId, createNote } from '../../store/notes';

export default function SideBar ({ notes }) {
  const dispatch = useDispatch();
  const firstNoteId = Object.keys(notes)[0];
  console.log(createNote);
  useEffect(() => {
    dispatch(setActiveNoteId(firstNoteId));
  }, [dispatch]);

  const newNote = async () => {
    console.log('create new notes...');
    const response = dispatch(createNote('Untitled', ''));
    console.log(response);
    if (response.ok) {
      // dispatch(setActiveNoteId());
    }
  };

  return (
    <div className='note-sidebar-container'>
      <h2>Your Notes</h2>
      <div className='note-sidebar-controls'>
        <div className='note-add-button' onClick={newNote}>
          <i className="far fa-file-alt"></i>
        </div>
        <div className='folder-add-button' onClick={() => alert('this button is not functional yet')}>
          <i className="far fa-folder-open"></i>
        </div>
      </div>
      {(Object.entries(notes).map(([id, note]) => {
        return <div key={id} onClick={() => dispatch(setActiveNoteId(note.id))}>{note.title}</div>;
      }))}
    </div>
  );
}
