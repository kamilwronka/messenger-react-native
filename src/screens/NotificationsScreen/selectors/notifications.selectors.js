import { get } from 'lodash';

export const getNotifications = state => get(state, 'notificationsScreen.notifications');
