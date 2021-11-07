import { csrfFetch } from './csrf';

const LOAD_USER = 'user/LOAD';
const DESTROY_USER = 'user/DESTROY';

export const loadUser = user => {
  return {
    type: LOAD_USER,
    user
  };
};

export const destroyUser = user => {
  return {
    type: DESTROY_USER
  };
};

export const loginUser = (credential, password) => async dispatch => {
  const options = {
    method: 'POST',
    body: JSON.stringify({ credential, password })
  };
  const response = await csrfFetch('/api/login', options);
  if (response.ok) {
    const { user } = await response.json();
    dispatch(loadUser(user));
  }
  return response;
};

export const restoreUser = () => async dispatch => {
  const response = await csrfFetch('/api/session');
  if (response.ok) {
    const { user } = await response.json();
    dispatch(loadUser(user));
  }
  return response;
};

export const signupUser = (email, username, password) => async dispatch => {
  const options = {
    method: 'POST',
    body: JSON.stringify({ email, username, password })
  };
  const response = await csrfFetch('api/signup', options);
  console.error(response);
  if (response.ok) {
    const { user } = await response.json();
    console.log(user);
    dispatch(loadUser(user));
  }
  return response;
};

const initUser = null;
export const sessionReducer = (state = initUser, action) => {
  switch (action.type) {
    case LOAD_USER: {
      return action.user;
    }
    case DESTROY_USER: {
      return {};
    }
    default: {
      return state;
    }
  }
};
