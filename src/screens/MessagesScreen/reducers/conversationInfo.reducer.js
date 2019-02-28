import { get } from 'lodash';
import { ACTIONS } from '../actions/homeScreen.actions';

const INITIAL_STATE = {
  data: null,
  error: null,
  fetching: false,
  intact: true,
};

const conversationsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case `${ACTIONS.FETCH_CONVERSATION_INFO}_PENDING`:
      return { ...state, fetching: true };
    case `${ACTIONS.FETCH_CONVERSATION_INFO}_FULFILLED`:
      return {
        ...state,
        data: action.payload.data,
        intact: false,
        fetching: false,
      };
    case `${ACTIONS.FETCH_CONVERSATION_INFO}_REJECTED`:
      return {
        ...state,
        error: action.payload.data,
        intact: false,
        fetching: false,
      };
    case `${ACTIONS.SET_CONVERSATION_COLOR}_FULFILLED`:
      console.log(get(action.payload, 'data.color'));
      return {
        ...state,
        data: { ...state.data, color: get(action.payload, 'data.color') },
      };
    default:
      return state;
  }
};

export default conversationsReducer;
