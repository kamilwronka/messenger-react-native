import axios from "axios";
import { apiConfig } from "../config";
import { getUserData } from "../selectors/user.selectors";

export const ACTIONS = {
  REGISTER_USER: "AUTH_REGISTER_USER",
  LOGOUT_USER: "AUTH_LOGOUT_USER",
  LOGIN_USER: "AUTH_LOGIN_USER"
};

export const registerUser = data => dispatch => {
  return dispatch({
    type: ACTIONS.REGISTER_USER,
    payload: axios.post(`${apiConfig.ROOT_URL}/api/auth/register`, data)
  });
};

export const logoutUser = () => (dispatch, getState) => {
  const user = getUserData(getState());

  return dispatch({
    type: ACTIONS.LOGOUT_USER,
    payload: axios({
      url: `${apiConfig.ROOT_URL}/api/auth/logout`,
      method: "delete",
      headers: { Authorization: user.token }
    })
  });
};

export const loginUser = data => dispatch => {
  return dispatch({
    type: ACTIONS.LOGIN_USER,
    payload: axios.post(`${apiConfig.ROOT_URL}/api/auth/login`, data)
  });
};
