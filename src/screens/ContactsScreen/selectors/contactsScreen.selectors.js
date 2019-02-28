import { get } from 'lodash';

export const getFriendsRequests = state => get(state, 'user.data.requests');
export const getUsers = state => get(state, 'contactsScreen.searchUser');
export const getFriends = state => get(state, 'contactsScreen.friends');
