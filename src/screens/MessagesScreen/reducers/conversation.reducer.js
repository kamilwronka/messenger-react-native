import { isNil, get } from 'lodash';
import { ACTIONS } from '../actions/homeScreen.actions';

const INITIAL_STATE = {
  data: null,
  error: null,
  fetching: false,
  intact: true,
};

const conversationReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case `${ACTIONS.FETCH_CONVERSATION}_PENDING`:
      return { ...state, fetching: true };
    case `${ACTIONS.FETCH_CONVERSATION}_FULFILLED`:
      return {
        ...state,
        data: action.payload.data,
        intact: false,
        fetching: false,
      };
    case `${ACTIONS.FETCH_CONVERSATION}_REJECTED`:
      return {
        ...state,
        error: action.payload.data,
        intact: false,
        fetching: false,
      };
    case `${ACTIONS.SET_CONVERSATION_COLOR}_FULFILLED`:
      return {
        ...state,
        data: { ...state.data, color: get(action.payload, 'data.color') },
      };
    case `${ACTIONS.CLEAR_CONVERSATION}`:
      return INITIAL_STATE;
    case `${ACTIONS.PUSH_NEW_MESSAGE}`:
      return {
        ...state,
        data: {
          ...state.data,
          messages: !isNil(get(state.data, 'messages'))
            ? [...state.data.messages, action.payload]
            : [action.payload],
        },
      };
    default:
      return state;
  }
};

export default conversationReducer;
