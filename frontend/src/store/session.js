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
  console.log('hello from loginUser thunk');
  console.log(credential);
  console.log(password);
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

const initUser = {};
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
