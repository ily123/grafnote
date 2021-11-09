import { csrfFetch } from './csrf';

const LOAD_NOTES = 'notes/load';
const ADD_NOTE = 'notes/add';
const DESTROY_NOTE = 'notes/destroy';
const PATCH_NOTE = 'notes/patch';

export const loadNotes = notes => {
  return {
    type: LOAD_NOTES,
    notes
  };
};

export const addNote = (id, title, content) => {};
export const destroyNote = id => {};
export const patchNote = (id, title, content) => {};

export const fetchNotes = () => async dispatch => {
  const response = await csrfFetch('/api/note');
  if (response.ok) {
    console.log(response);
    const { notes } = await response.json();
    console.log(notes);
    dispatch(loadNotes(notes));
  }
  return response;
};
export const newNote = (title, content) => {};
export const deleteNote = id => {};
export const editNote = (id, title, content) => {};

const initialState = {
  notes: null
};
export const notesReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_NOTES: {
      const notes = {};
      action.notes.forEach(note => {
        notes[note.id] = note;
      });
      return { ...state, notes };
    }
    case ADD_NOTE: {
      return null;
    }
    case DESTROY_NOTE: {
      return null;
    }
    case PATCH_NOTE: {
      return null;
    }
    default: {
      return null;
    }
  }
};
