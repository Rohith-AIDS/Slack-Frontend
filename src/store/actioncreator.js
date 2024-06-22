import { SET_USER } from './actionstypes';

// Define your action creators
export const setUser = (user) => ({
  type: SET_USER,
  payload: { currentUser: user }
});
