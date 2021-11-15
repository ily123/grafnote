import './SideBar.css';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setActiveNoteId, createNote, createFolder, deleteFolder, editFolderTitle } from '../../store/notes';

function FileLink ({ type, payload }) {
  const dispatch = useDispatch();
  return (
    <div
      className={type + '-link'}
      key={type + payload.id}
      onClick={() => dispatch(setActiveNoteId(payload.id))}
    >{payload.title}</div>
  );
}

function FolderLink ({ type, payload }) {
  const dispatch = useDispatch();
  const [title, setTitle] = useState(payload.title);
  const [readOnly, setReadOnly] = useState(true);
  if (!payload || !type) return null;

  const sendNewTitle = () => {
    setReadOnly(true);
    dispatch(editFolderTitle(payload.id, title));
  };

  return (
    <div
      className={type + '-link'}
      key={type + payload.id}
    >
      <i className="fas fa-folder" style={{ paddingRight: '5px' }}></i>
      <input type="text"
        value={title}
        readOnly={readOnly}
        className={readOnly ? 'inactive' : 'active'}
        onDoubleClick={() => setReadOnly(false)}
        onBlur={(e) => sendNewTitle(e.target.value)}
        onChange={(e) => setTitle(e.target.value)}
      ></input>
      <i className="far fa-trash-alt"
        onClick={() => dispatch(deleteFolder(payload.id))}
      ></i>
    </div>
  );
}

function FileTree ({ notes, folders, setActiveNoteId }) {
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
  // to the start of the list
  Object.values(notes).forEach(note => {
    if (!trackNotes.has(note.id)) {
      tree.unshift({ type: 'note-top', payload: note });
    }
  });

  return (
    <div>
      {(tree.map(({ type, payload }) => {
        if (type.startsWith('note')) {
          return <FileLink type={type} payload={payload} />;
        } else {
          return <FolderLink type={type} payload={payload} />;
        }
      }))}
    </div>
  );
};

export default function SideBar ({ notes, folders }) {
  const dispatch = useDispatch();
  const firstNoteId = Object.keys(notes)[0];
  useEffect(() => {
    dispatch(setActiveNoteId(firstNoteId));
  }, [dispatch]);

  const newNote = async () => {
    const response = dispatch(createNote('Untitled', ''));
    if (response.ok) {
      // dispatch(setActiveNoteId());
    }
  };

  const newFolder = async () => {
    const response = dispatch(createFolder('New Folder'));
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
        <div className='folder-add-button' onClick={newFolder}>
          <i className="far fa-folder-open"></i>
        </div>
      </div>
      <>
        <FileTree notes={notes} folders={folders} setActiveNoteId={setActiveNoteId}/>
      </>
    </div>
  );
}
