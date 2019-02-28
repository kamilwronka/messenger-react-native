import { combineReducers } from 'redux';

import notificationsReducer from './notifications.reducer';

export default combineReducers({
  notifications: notificationsReducer,
});
