// import MDEditor from '@uiw/react-md-editor';
import ReactMarkdown from 'react-markdown';
import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { editNote, deleteNote } from '../../store/notes';

export default function NoteEditor ({ notes }) {
  const dispatch = useDispatch();
  const activeNoteId = useSelector(state => state.notes.activeNoteId);
  const [content, setContent] = useState('Create a new note :-)');
  const [title, setTitle] = useState('Untitled');
  const timeout = useRef();

  useEffect(() => {
    if (activeNoteId) {
      console.log('useEffect', activeNoteId);
      const note = notes[activeNoteId];
      setContent(note.content);
      setTitle(note.title);
    }
  }, [activeNoteId]);

  useEffect(() => {
    clearTimeout(timeout.current);
    timeout.current = setTimeout(() => {
      dispatch(editNote(activeNoteId, title, content));
    }, 1000);
  }, [content, title]);

  const deleteActiveNote = () => {
    console.log('delete note', activeNoteId);
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
        <i className="far fa-trash-alt"
          onClick={() => deleteActiveNote()}
        ></i>
      </div>
      <textarea
        className="note-editor"
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <ReactMarkdown>{content}</ReactMarkdown>

    </div>
  );
}
