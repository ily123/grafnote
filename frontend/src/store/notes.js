import { csrfFetch } from './csrf';

const LOAD_NOTES = 'notes/load';
const ADD_NOTE = 'notes/add';
const DESTROY_NOTE = 'notes/destroy';
const PATCH_NOTE = 'notes/patch';
const SET_ACTIVE_NOTE = 'notes/set_active_note';
export const loadNotes = notes => {
  return {
    type: LOAD_NOTES,
    notes
  };
};

export const addNote = (id, title, content) => {};
export const destroyNote = id => {};
export const patchNote = (id, title, content) => {};
export const setActiveNoteId = id => {
  return {
    type: SET_ACTIVE_NOTE,
    id
  };
};

export const fetchNotes = () => async dispatch => {
  const response = await csrfFetch('/api/note');
  if (response.ok) {
    const { notes } = await response.json();
    console.log('Notes thunk:', notes);
    dispatch(loadNotes(notes));
  }
  return response;
};
export const newNote = (title, content) => {};
export const deleteNote = id => {};
export const editNote = (id, title, content) => {};

const initialState = {
  notes: null,
  activeNoteId: null
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
      return state;
    }
    case DESTROY_NOTE: {
      return state;
    }
    case PATCH_NOTE: {
      return state;
    }
    case SET_ACTIVE_NOTE: {
      return { ...state, activeNoteId: action.id };
    }
    default: {
      return state;
    }
  }
};
