import MDEditor from '@uiw/react-md-editor';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default function NoteEditor ({ notes }) {
  const activeNoteId = useSelector(state => state.notes.activeNoteId);
  if (!activeNoteId) return null;

  const [content, setContent] = useState('Create a new note :-)');
  useEffect(() => {
    const note = notes[activeNoteId];
    setContent(note.content);
  }, [activeNoteId]);

  return (
    <div className="note-editor-container">
      <MDEditor
        type="textarea"
        value={content}
        onChange={setContent}
      />
    </div>
  );
}
