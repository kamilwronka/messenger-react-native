import { get } from "lodash";

export const getConversations = state =>
  get(state, "messagesScreen.conversations");
export const getConversation = state =>
  get(state, "messagesScreen.conversation");
export const getConversationInfo = state =>
  get(state, "messagesScreen.conversationInfo");
export const getConversationPhotos = state =>
  get(state, "messagesScreen.conversationPhotos");
