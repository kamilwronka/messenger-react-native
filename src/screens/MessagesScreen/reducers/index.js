import { combineReducers } from "redux";

import conversationsReducer from "./conversations.reducer";
import conversationReducer from "./conversation.reducer";
import conversationInfoReducer from "./conversationInfo.reducer";
import conversationPhotosReducer from "./conversationPhotos.reducer";

export default combineReducers({
  conversations: conversationsReducer,
  conversation: conversationReducer,
  conversationInfo: conversationInfoReducer,
  conversationPhotos: conversationPhotosReducer
});
