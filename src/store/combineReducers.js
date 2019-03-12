import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

import userReducer from "../reducers/user.reducer";
import contactsScreenReducer from "../screens/ContactsScreen/reducers";
import notificationsScreenReducer from "../screens/NotificationsScreen/reducers";
import messagesScreenReducer from "../screens/MessagesScreen/reducers";

export default combineReducers({
  form: formReducer,
  user: userReducer,
  contactsScreen: contactsScreenReducer,
  notificationsScreen: notificationsScreenReducer,
  messagesScreen: messagesScreenReducer
});
