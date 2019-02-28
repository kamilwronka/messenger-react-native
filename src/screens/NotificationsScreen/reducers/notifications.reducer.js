import { ACTIONS } from '../actions/notifications.actions';

const INITIAL_STATE = {
  data: null,
  error: null,
  fetching: false,
  intact: true,
};

const searchUserReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case `${ACTIONS.FETCH_NOTIFICATIONS}_PENDING`:
      return { ...state, fetching: true };
    case `${ACTIONS.FETCH_NOTIFICATIONS}_FULFILLED`:
      return {
        ...state,
        data: action.payload.data,
        intact: false,
        fetching: false,
      };
    case `${ACTIONS.FETCH_NOTIFICATIONS}_REJECTED`:
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

export default searchUserReducer;
