import { ACTIONS } from "../actions/auth.actions";
import { ACTIONS as PROFILE_ACTIONS } from "../screens/ProfileScreen/actions/profile.actions";

const INITIAL_STATE = {
  data: null,
  token: null,
  logged: false,
  error: null,
  fetching: false,
  intact: true
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case `${ACTIONS.REGISTER_USER}_PENDING`:
      return { ...state, fetching: true };
    case `${ACTIONS.REGISTER_USER}_FULFILLED`:
      return {
        ...state,
        data: action.payload.data,
        token: action.payload.headers.authorization,
        intact: false,
        logged: true,
        fetching: false
      };
    case `${ACTIONS.REGISTER_USER}_REJECTED`:
      return {
        ...state,
        error: action.payload.data,
        intact: false,
        fetching: false
      };
    case `${ACTIONS.LOGIN_USER}_PENDING`:
      return { ...state, fetching: true };
    case `${ACTIONS.LOGIN_USER}_FULFILLED`:
      return {
        ...state,
        data: action.payload.data,
        token: action.payload.headers.authorization,
        intact: false,
        logged: true,
        fetching: false
      };
    case `${ACTIONS.LOGIN_USER}_REJECTED`:
      return {
        ...state,
        error: action.payload.data,
        intact: false,
        fetching: false
      };
    case `${ACTIONS.LOGOUT_USER}_PENDING`:
      return { ...state, fetching: true };
    case `${ACTIONS.LOGOUT_USER}_FULFILLED`:
      return INITIAL_STATE;
    case `${ACTIONS.LOGOUT_USER}_REJECTED`:
      return INITIAL_STATE;
    case `${PROFILE_ACTIONS.SET_USER_AVATAR}_PENDING`:
      return { ...state, fetching: true };
    case `${PROFILE_ACTIONS.SET_USER_AVATAR}_FULFILLED`:
      return {
        ...state,
        data: { ...state.data, avatar: action.payload.data },
        fetching: false
      };
    case `${PROFILE_ACTIONS.SET_USER_AVATAR}_REJECTED`:
      return { ...state, error: action.payload.data, fetching: true };
    case `${PROFILE_ACTIONS.SET_USER_BACKGROUND_IMAGE}_PENDING`:
      return { ...state, fetching: true };
    case `${PROFILE_ACTIONS.SET_USER_BACKGROUND_IMAGE}_FULFILLED`:
      return {
        ...state,
        data: { ...state.data, backgroundImage: action.payload.data },
        fetching: false
      };
    case `${PROFILE_ACTIONS.SET_USER_BACKGROUND_IMAGE}_REJECTED`:
      return { ...state, error: action.payload.data, fetching: true };
    default:
      return state;
  }
};

export default userReducer;
