import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

import userReducer from "../reducers/user.reducer";
import contactsScreenReducer from "../screens/ContactsScreen/reducers";
import notificationsScreenReducer from "../screens/NotificationsScreen/reducers";
import messagesScreenReducer from "../screens/MessagesScreen/reducers";

import { ACTIONS } from "../actions/auth.actions";

const appReducer = combineReducers({
  form: formReducer,
  user: userReducer,
  contactsScreen: contactsScreenReducer,
  notificationsScreen: notificationsScreenReducer,
  messagesScreen: messagesScreenReducer
});

export default (rootReducer = (state, action) => {
  if (
    action.type === `${ACTIONS.LOGOUT_USER}_FULFILLED` ||
    action.type === `${ACTIONS.LOGOUT_USER}_FULFILLED`
  ) {
    state = undefined;
  }

  return appReducer(state, action);
});
