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

  useEffect(() => {
    clearTimeout(timeout.current);
    timeout.current = setTimeout(() => {
      const { title } = notes[activeNoteId];
      dispatch(editNote(activeNoteId, title, content));
    }, 1000);
  }, [content]);
  // we will figure this out later
  // console.log('component scope', activeNoteId);
  // const handleContentChange = (content, id) => {
  //  setContent(content);
  //  clearTimeout(timeout.current);
  //  console.log('outer scope', id);
  //  timeout.current = setTimeout(() => {
  //    console.log('handle change note id', id);
  //    dispatch(editNote(id, 'xyz', content));
  //    console.log('i should not print more than once per second');
  //  }, 1000);
  // };

  return (
    <div className="note-editor-container">
      <MDEditor
        className="note-editor"
        type="textarea"
        value={content}
        onChange={setContent}
      />
    </div>
  );
}
