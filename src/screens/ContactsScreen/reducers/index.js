import { combineReducers } from "redux";

import friendRequestsReducer from "./friendRequests.reducer";
import searchUserReducer from "./searchUser.reducer";
import friendsReducer from "./friends.reducer";

export default combineReducers({
  friendRequests: friendRequestsReducer,
  searchUser: searchUserReducer,
  friends: friendsReducer
});
