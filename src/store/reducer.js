import { combineReducers } from 'redux';
import { SET_USER } from './actionstypes';

const initialState = {
  currentUser: null
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        currentUser: action.payload.currentUser
      };
    default:
      return state;
  }
};

export const rootReducer = combineReducers({
  user: userReducer
});
