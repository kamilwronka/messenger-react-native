import axios from "axios";
import { apiConfig } from "../config";

export const ACTIONS = {
  FETCH_CONVERSATION_STATE: "MSG_FETCH_CONVERSATION_STATE",
  MSG_RECEIVED: "MSG_RECEIVED",
  MSG_SENT: "MSG_SENT",
  UPDATE_CONVERSATION_COLOR: "UPDATE_CONVERSATION_COLOR"
};

export const sendMessage = data => {
  return {
    type: ACTIONS.MSG_SENT,
    payload: data
  };
};

export const receiveMessage = data => {
  return {
    type: ACTIONS.MSG_RECEIVE,
    payload: data
  };
};

export const fetchConversationState = data => dispatch => {
  return dispatch({
    type: ACTIONS.REGISTER_USER,
    payload: axios.get(`${apiConfig.ROOT_URL}/api/messages`)
  });
};

export const updateConversationColor = (conversationId, color) => {
  return {
    type: ACTIONS.UPDATE_CONVERSATION_COLOR,
    payload: { color, conversationId }
  };
};
