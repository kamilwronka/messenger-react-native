import { isNil, get } from "lodash";
import { ACTIONS } from "../actions/homeScreen.actions";
import { ACTIONS as MSG_ACTIONS } from "../../../actions/msg.actions";

const INITIAL_STATE = {
  data: null,
  error: null,
  fetching: false,
  intact: true
};

const conversationReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case `${ACTIONS.FETCH_CONVERSATION_INFO}_PENDING`:
      return { ...state, fetching: true };
    case `${ACTIONS.FETCH_CONVERSATION_INFO}_FULFILLED`:
      return {
        ...state,
        data: { ...state.data, ...action.payload.data },
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
    case `${ACTIONS.FETCH_CONVERSATION_MESSAGES}_PENDING`:
      return { ...state, fetching: true };
    case `${ACTIONS.FETCH_CONVERSATION_MESSAGES}_FULFILLED`:
      return {
        ...state,
        data: {
          ...state.data,
          messagesContainer: {
            messages: get(state, "data.messagesContainer.messages")
              ? [
                  ...state.data.messagesContainer.messages,
                  ...action.payload.data.messages
                ]
              : action.payload.data.messages,

            metadata: action.payload.data.metadata
          }
        },
        intact: false,
        fetching: false
      };
    case `${ACTIONS.FETCH_CONVERSATION_MESSAGES}_REJECTED`:
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
    case `${ACTIONS.CLEAR_CONVERSATION}`:
      return INITIAL_STATE;
    case `${ACTIONS.PUSH_NEW_MESSAGE}`:
      return {
        ...state,
        data: {
          ...state.data,
          messagesContainer: get(state.data, "messagesContainer.messages")
            ? {
                messages: [
                  action.payload,
                  ...state.data.messagesContainer.messages
                ]
              }
            : { messages: [action.payload] }
        }
      };
    default:
      return state;
  }
};

export default conversationReducer;
