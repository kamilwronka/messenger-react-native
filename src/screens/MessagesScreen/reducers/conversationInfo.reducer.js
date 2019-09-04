import { get } from "lodash";
import { ACTIONS } from "../actions/homeScreen.actions";
import { ACTIONS as MSG_ACTIONS } from "../../../actions/msg.actions";

const INITIAL_STATE = {
  data: null,
  error: null,
  fetching: false,
  intact: true
};

const conversationsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case `${ACTIONS.FETCH_CONVERSATION_INFO}_PENDING`:
      return { ...state, fetching: true };
    case `${ACTIONS.FETCH_CONVERSATION_INFO}_FULFILLED`:
      return {
        ...state,
        data: action.payload.data,
        intact: false,
        fetching: false
      };
    case `${ACTIONS.FETCH_CONVERSATION_INFO}_REJECTED`:
      return {
        ...state,
        error: action.payload.data,
        intact: false,
        fetching: false
      };
    case MSG_ACTIONS.UPDATE_CONVERSATION_COLOR:
      return {
        ...state,
        data: { ...state.data, color: action.payload.color }
      };
    default:
      return state;
  }
};

export default conversationsReducer;
