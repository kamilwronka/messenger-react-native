import axios from 'axios';
import { apiConfig } from '../../../config';
import { getUserData } from '../../../selectors/user.selectors';

export const ACTIONS = {
  FETCH_USER_REQUESTS: 'FETCH_USER_REQUESTS',
  SEARCH_FOR_USER: 'SEARCH_FOR_USER',
  FETCH_USER_FRIENDS: 'FETCH_USER_FRIENDS',
  JAZDA: 'JAZDA',
};

export const fetchFriends = () => (dispatch, getState) => {
  const user = getUserData(getState());

  return dispatch({
    type: ACTIONS.FETCH_USER_FRIENDS,
    payload: axios({
      url: `${apiConfig.ROOT_URL}/api/friends`,
      method: 'get',
      headers: { Authorization: user.token },
    }),
  });
};

export const fetchFriendsRequests = data => (dispatch, getState) => {
  const user = getUserData(getState());

  return dispatch({
    type: ACTIONS.REGISTER_USER,
    payload: axios.post(`${apiConfig.ROOT_URL}/api/requests/${user.data._id}`, data),
  });
};

export const fetchUserByQuery = query => dispatch => {
  return dispatch({
    type: ACTIONS.SEARCH_FOR_USER,
    payload: axios.get(`${apiConfig.ROOT_URL}/api/users?query=${query}`),
  });
};

export const sendFriendRequest = requestedUserId => (dispatch, getState) => {
  const user = getUserData(getState());

  return dispatch({
    type: ACTIONS.JAZDA,
    payload: axios({
      url: `${apiConfig.ROOT_URL}/api/friends`,
      method: 'post',
      data: { userId: requestedUserId, type: 'friendsRequest' },
      headers: { Authorization: user.token },
    }),
  });
};
