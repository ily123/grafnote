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

export const fetchNotes = userId => async dispatch => {
  const options = {};
  const response = await csrfFetch('', options);
  if (response.ok) {
    dispatch();
  }
  return response;
};
export const newNote = (title, content) => {};
export const deleteNote = id => {};
export const editNote = (id, title, content) => {};

export const notesReducer = (state = null, action) => {
  switch (action.type) {
    case LOAD_NOTES: {
      return null;
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
  }
};
