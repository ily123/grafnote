import './NoteEditor.css';
import ReactMarkdown from 'react-markdown';
import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { editNote, deleteNote } from '../../store/notes';

function TextEntryArea ({ readonly, content, setContent }) {
  console.log(readonly);
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

export default function NoteEditor ({ notes, folders }) {
  const dispatch = useDispatch();
  const activeNoteId = useSelector(state => state.notes.activeNoteId);
  const [content, setContent] = useState('Create a new note :)');
  const [title, setTitle] = useState('Create a new note!');
  const [selectedFolder, setSelectedFolder] = useState(0);
  const timeout = useRef();

  useEffect(() => {
    if (activeNoteId) {
      console.log('useEffect', activeNoteId);
      const note = notes[activeNoteId];
      setContent(note.content);
      setTitle(note.title);
      setSelectedFolder(note.folderId || 0);
    }
  }, [activeNoteId]);

  useEffect(() => {
    console.log('text area change trigger');
    clearTimeout(timeout.current);
    timeout.current = setTimeout(() => {
      dispatch(editNote(activeNoteId, title, content, selectedFolder));
    }, 1000);
  }, [content, title]);

  useEffect(() => {
    console.log('select folder trigger');
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
        <select
          value={selectedFolder}
          onChange={(e) => setSelectedFolder(e.target.value)}
        >
          <option value="0">No Folder</option>
          {(Object.entries(folders).map(([id, folder]) => {
            return <option key={id} value={id}>{folder.title}</option>;
          }))};
        </select>
        <i className="far fa-trash-alt"
          onClick={() => deleteActiveNote()}
        ></i>
      </div>
      <TextEntryArea readonly={!activeNoteId} content={content} setContent={setContent}/>
      <div>Mardown preview below is an extra feature, and work in progress.</div>
      <ReactMarkdown className='note-markdown-preview'>{content}</ReactMarkdown>

    </div>
  );
}
