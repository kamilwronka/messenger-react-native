import { get } from 'lodash';

export const getUserData = state => get(state, 'user');
export const getUserAvatar = state => get(state, 'user.data.avatar');
