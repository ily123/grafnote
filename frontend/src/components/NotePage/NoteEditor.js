import MDEditor from '@uiw/react-md-editor';
import { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';

export default function NoteEditor ({ notes }) {
  const activeNoteId = useSelector(state => state.notes.activeNoteId);
  const [content, setContent] = useState('Create a new note :-)');
  const timeout = useRef();

  useEffect(() => {
    if (activeNoteId) {
      const note = notes[activeNoteId];
      setContent(note.content);
    }
  }, [activeNoteId]);

  const handleContentChange = (content) => {
    setContent(content);
    clearTimeout(timeout.current);
    timeout.current = setTimeout(() => {
      // thunk will go here:
      // - will save change to redux store (?)
      // - will send PATCH request to the DB
      console.log('i should not print more than once per second');
    }, 1000);
  };

  return (
    <div className="note-editor-container">
      <MDEditor
        className="note-editor"
        type="textarea"
        value={content}
        onChange={handleContentChange}
      />
    </div>
  );
}
