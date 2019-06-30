import { get } from "lodash";
import { ACTIONS } from "../actions/homeScreen.actions";

const INITIAL_STATE = {
  data: null,
  error: null,
  fetching: false,
  intact: true
};

const conversationsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case `${ACTIONS.FETCH_CONVERSATION_PHOTOS}_PENDING`:
      return { ...state, fetching: true };
    case `${ACTIONS.FETCH_CONVERSATION_PHOTOS}_FULFILLED`:
      return {
        ...state,
        data: action.payload.data,
        intact: false,
        fetching: false
      };
    case `${ACTIONS.FETCH_CONVERSATION_PHOTOS}_REJECTED`:
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

export default conversationsReducer;
