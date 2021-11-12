import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setActiveNoteId, createNote } from '../../store/notes';

function FileTree ({ notes, folders, setActiveNoteId }) {
  const dispatch = useDispatch();
  // this is amazingly bad
  // you are killing me, go to sleep
  // so, for later, here is what I am doing:
  // loop 1: go through each folder and put it into the list
  // loop 2: go through each note and push it into the list
  const tree = [];
  const trackNotes = new Set();
  Object.entries(folders).forEach(([id, folder]) => {
    tree.push({ type: 'folder', payload: folder });
    Object.keys(notes).forEach(noteId => {
      const note = notes[noteId];
      if (note.folderId === folder.id) {
        tree.push({ type: 'note', payload: note });
        trackNotes.add(note.id);
      }
    });
  });
  // loop through notes again, and append folder-less
  // to the end of the list
  Object.values(notes).forEach(note => {
    if (!trackNotes.has(note.id)) {
      tree.push({ type: 'note', payload: note });
    }
  });

  console.log(tree);
  return (
    <div>
      {(tree.map(({ type, payload }) => {
        return (
          <div
            className={type + '-link'}
            key={type + payload.id}
            onClick={type === 'note' ? () => dispatch(setActiveNoteId(payload.id)) : null}
          >{payload.title}</div>
        );
      }))}
    </div>
  );
};

export default function SideBar ({ notes, folders }) {
  const dispatch = useDispatch();
  const firstNoteId = Object.keys(notes)[0];
  console.log(folders);
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
      <>
        <FileTree notes={notes} folders={folders} setActiveNoteId={setActiveNoteId}/>
      </>
    </div>
  );
}
