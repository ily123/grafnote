import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setActiveNoteId, createNote } from '../../store/notes';

export default function SideBar ({ notes }) {
  const dispatch = useDispatch();
  const firstNoteId = Object.keys(notes)[0];

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
      <div className='note-sidebar-controls'>
        <div className='note-add-button' onClick={newNote}>
          <i className="far fa-file-alt"></i>
        </div>
        <div className='folder-add-button' onClick={() => alert('this button is not functional yet')}>
          <i className="far fa-folder-open"></i>
        </div>
      </div>
      {(Object.entries(notes).map(([id, note]) => {
        return (
          <div
            className='note-link'
            key={id}
            onClick={() => dispatch(setActiveNoteId(note.id))}>{note.title}
          </div>
        );
      }))}
    </div>
  );
}
