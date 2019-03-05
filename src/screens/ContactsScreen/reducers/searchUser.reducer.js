import { ACTIONS } from "../actions/contactsScreen.actions";

const INITIAL_STATE = {
  data: null,
  error: null,
  fetching: false,
  intact: true
};

const searchUserReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case `${ACTIONS.SEARCH_FOR_USER}_PENDING`:
      return { ...state, fetching: true };
    case `${ACTIONS.SEARCH_FOR_USER}_FULFILLED`:
      return {
        ...state,
        data: action.payload.data,
        intact: false,
        fetching: false
      };
    case `${ACTIONS.SEARCH_FOR_USER}_REJECTED`:
      return {
        ...state,
        error: action.payload.data,
        intact: false,
        fetching: false
      };
    default:
      return state;
  }
};

export default searchUserReducer;
