import './NoteEditor.css';
import ReactMarkdown from 'react-markdown';
import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { editNote, deleteNote } from '../../store/notes';

function TextEntryArea ({ readonly, content, setContent }) {
  return (
    <textarea
      readOnly={readonly}
      className="note-editor"
      type="text"
      value={content}
      onChange={(e) => setContent(e.target.value)}
    />
  );
}

// function PreviewArea ({}) {
//  return <></>;
// }

export default function NoteEditor ({ notes, folders }) {
  const dispatch = useDispatch();
  const activeNoteId = useSelector(state => state.notes.activeNoteId);
  const [content, setContent] = useState('Create a new note :)');
  const [title, setTitle] = useState('Create a new note!');
  const [selectedFolder, setSelectedFolder] = useState(0);
  const [edit, setEdit] = useState(false);
  const timeout = useRef();

  useEffect(() => {
    if (activeNoteId) {
      const note = notes[activeNoteId];
      setContent(note.content);
      setTitle(note.title);
      setSelectedFolder(note.folderId || 0);
    }
  }, [activeNoteId]);

  useEffect(() => {
    clearTimeout(timeout.current);
    timeout.current = setTimeout(() => {
      dispatch(editNote(activeNoteId, title, content, selectedFolder));
    }, 1000);
  }, [content, title]);

  useEffect(() => {
    dispatch(editNote(activeNoteId, title, content, selectedFolder));
  }, [selectedFolder]);
  const deleteActiveNote = () => {
    dispatch(deleteNote(activeNoteId));
  };

  return (
    <div className="note-editor-container">
      <div className="note-header-container">
        <input
          className='note-title'
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="editor-note-controls">
          <div className="folderSelect">
            <div>move to</div>
            <select
              value={selectedFolder}
              onChange={(e) => setSelectedFolder(e.target.value)}
            >
              <option value="0">No Folder</option>
              {(Object.entries(folders).map(([id, folder]) => {
                return <option key={id} value={id}>{folder.title}</option>;
              }))};
            </select>
          </div>
          <div
            onClick={() => setEdit(state => !state)}
            className={`readToggle ${edit ? 'editing' : 'reading'}`}
          >
            {edit
              ? (<><i className="fas fa-circle"></i><div>editing</div></>)
              : (<><i className="far fa-circle"></i><div>reading</div></>)
            }
          </div>
          <i className="far fa-trash-alt"
            onClick={() => deleteActiveNote()}
          ></i>
        </div>
      </div>
      {(edit
        ? (<TextEntryArea readonly={!activeNoteId} content={content} setContent={setContent}/>)
        : (<ReactMarkdown className='note-markdown-preview'>{content}</ReactMarkdown>)
      )}
    </div>
  );
}
