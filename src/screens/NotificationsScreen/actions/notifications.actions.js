import axios from 'axios';
import { apiConfig } from '@/config';
import { getUserData } from '@/selectors/user.selectors';

export const ACTIONS = {
  FETCH_NOTIFICATIONS: 'FETCH_NOTIFICATIONS',
  IGNORE_REQUEST: 'IGNORE_REQUEST',
};

export const fetchNotifications = () => (dispatch, getState) => {
  const user = getUserData(getState());

  return dispatch({
    type: ACTIONS.FETCH_NOTIFICATIONS,
    payload: axios({
      url: `${apiConfig.ROOT_URL}/api/requests`,
      method: 'get',
      headers: { Authorization: user.token },
    }),
  });
};

export const ignoreRequest = id => (dispatch, getState) => {
  const user = getUserData(getState());

  return dispatch({
    type: ACTIONS.IGNORE_REQUEST,
    payload: axios({
      url: `${apiConfig.ROOT_URL}/api/users/requests/${id}`,
      method: 'delete',
      headers: { Authorization: user.token },
    }),
  });
};

export const confirmRequest = id => (dispatch, getState) => {
  const user = getUserData(getState());

  return dispatch({
    type: ACTIONS.IGNORE_REQUEST,
    payload: axios({
      url: `${apiConfig.ROOT_URL}/api/users/requests/${id}`,
      method: 'post',
      headers: { Authorization: user.token },
    }),
  });
};
