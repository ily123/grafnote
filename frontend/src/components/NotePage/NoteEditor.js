import MDEditor from '@uiw/react-md-editor';
import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { editNote } from '../../store/notes';

export default function NoteEditor ({ notes }) {
  const dispatch = useDispatch();
  const activeNoteId = useSelector(state => state.notes.activeNoteId);
  const [content, setContent] = useState('Create a new note :-)');
  const timeout = useRef();

  useEffect(() => {
    if (activeNoteId) {
      const note = notes[activeNoteId];
      setContent(note.content);
    }
  }, [activeNoteId]);

  console.log('component scope', activeNoteId);
  const handleContentChange = (content) => {
    setContent(content);
    clearTimeout(timeout.current);
    console.log('outer scope', activeNoteId);
    timeout.current = setTimeout(() => {
      console.log('handle change note id', activeNoteId);
      dispatch(editNote(activeNoteId, 'xyz', content));
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
