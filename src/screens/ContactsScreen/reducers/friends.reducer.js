import { ACTIONS } from '../actions/contactsScreen.actions';

const INITIAL_STATE = {
  data: null,
  error: null,
  fetching: false,
  intact: true,
};

const friendsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case `${ACTIONS.FETCH_USER_FRIENDS}_PENDING`:
      return { ...state, fetching: true };
    case `${ACTIONS.FETCH_USER_FRIENDS}_FULFILLED`:
      return {
        ...state,
        data: action.payload.data,
        intact: false,
        fetching: false,
      };
    case `${ACTIONS.FETCH_USER_FRIENDS}_REJECTED`:
      return {
        ...state,
        error: action.payload.data,
        intact: false,
        fetching: false,
      };
    default:
      return state;
  }
};

export default friendsReducer;
