import { csrfFetch } from './csrf';

const LOAD_NOTES = 'notes/load';
const ADD_NOTE = 'notes/add';
const DESTROY_NOTE = 'notes/destroy';
const PATCH_NOTE = 'notes/patch';
const SET_ACTIVE_NOTE = 'notes/set_active_note';
const LOAD_FOLDERS = 'folders/load';
const ADD_FOLDER = 'folders/add';
const DESTROY_FOLDER = 'folders/destroy';

export const loadNotes = notes => {
  return {
    type: LOAD_NOTES,
    notes
  };
};

export const addNote = (note) => {
  return {
    type: ADD_NOTE,
    note
  };
};

export const destroyNote = id => {
  return {
    type: DESTROY_NOTE,
    id
  };
};

export const setActiveNoteId = id => {
  return {
    type: SET_ACTIVE_NOTE,
    id
  };
};

export const loadFolders = (folders) => {
  return {
    type: LOAD_FOLDERS,
    folders
  };
};

export const createFolder = (title) => async dispatch => {
  const options = {
    method: 'POST',
    body: JSON.stringify({ title })
  };
  const response = await csrfFetch('api/folder', options);
  if (response.ok) {
    const { folder } = await response.json();
    dispatch({ type: ADD_FOLDER, folder });
  }
  return response;
};

export const deleteFolder = (id) => async dispatch => {
  const options = { method: 'DELETE' };
  const response = await csrfFetch(`api/folder/${id}`, options);
  if (response.ok) {
    dispatch({ type: DESTROY_FOLDER, id });
  }
};

export const editFolderTitle = (id, title) => async dispatch => {
  const options = {
    method: 'PATCH',
    body: JSON.stringify({ title })
  };
  console.log('thunk -->', id);
  console.log('thunk -->', title);
  const response = await csrfFetch(`api/folder/${id}`, options);
  if (response.ok) {
    const { folder } = await response.json();
    console.log('this is thunk reponse folder', folder);
    dispatch({ type: ADD_FOLDER, folder });
  }
};

export const fetchNotesAndNotebooks = () => async dispatch => {
  const response = await csrfFetch('/api/note');
  if (response.ok) {
    const { notes } = await response.json();
    console.log('this is notes', notes);
    dispatch(loadNotes(notes));
  }

  // this is bad two calls inside one function
  // Fix later TODO
  const response2 = await csrfFetch('/api/folder');
  if (response2.ok) {
    const { folders } = await response2.json();
    console.log(folders);
    dispatch(loadFolders(folders));
  }
  return response;
};

export const createNote = (title, content) => async dispatch => {
  const options = {
    method: 'POST',
    body: JSON.stringify({ title, content })
  };
  const response = await csrfFetch('api/note', options);
  if (response.ok) {
    const { note } = await response.json();
    dispatch(addNote(note));
    dispatch(setActiveNoteId(note.id));
  }
  return response;
};

export const deleteNote = id => async dispatch => {
  const options = { method: 'DELETE' };
  const response = await csrfFetch(`api/note/${id}`, options);
  if (response.ok) {
    dispatch(destroyNote(id));
    dispatch(setActiveNoteId(null));
  }
  return response;
};

export const editNote = (id, title, content, folderId) => async dispatch => {
  console.log('this is the id of editNOTE', id);
  if (!id) return null;
  const options = {
    method: 'PATCH',
    body: JSON.stringify({ title, content, folderId })
  };
  const response = await csrfFetch(`api/note/${id}`, options);
  if (response.ok) {
    const { note } = await response.json();
    dispatch(addNote(note));
  }
  return response;
};

const initialState = {
  notes: null,
  activeNoteId: null,
  folders: null
};
export const notesReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_FOLDERS: {
      const folders = {};
      action.folders.forEach(folder => {
        folders[folder.id] = folder;
      });
      return { ...state, folders };
    }
    case ADD_FOLDER: {
      const folders = { ...state.folders };
      folders[action.folder.id] = action.folder;
      return { ...state, folders };
    }
    case DESTROY_FOLDER: {
      const folders = { ...state.folders };
      const notes = { ...state.notes };
      Object.values(notes).forEach(note => {
        if (action.id === note.folderId) {
          delete notes[note.id];
        }
      });
      delete folders[action.id];
      return { ...state, folders, notes };
    }
    case LOAD_NOTES: {
      const notes = {};
      action.notes.forEach(note => {
        notes[note.id] = note;
      });
      return { ...state, notes };
    }
    case ADD_NOTE: {
      const notes = { ...state.notes };
      notes[action.note.id] = action.note;
      return { ...state, notes };
    }
    case DESTROY_NOTE: {
      const notes = { ...state.notes };
      delete notes[action.id];
      return { ...state, notes };
    }
    case PATCH_NOTE: {
      return state;
    }
    case SET_ACTIVE_NOTE: {
      if (action.id) {
        return { ...state, activeNoteId: action.id };
      } else if (!Object.keys(state.notes).length) {
        return state;
      } else {
        // this will break if there are no notes left TODO
        const firstNoteId = Object.keys(state.notes)[0];
        return { ...state, activeNoteId: firstNoteId };
      }
    }
    case 'user/DESTROY': {
      return initialState;
    }
    default: {
      return state;
    }
  }
};
