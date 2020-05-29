import {
  USER_SIGN_IN,
  USER_SIGN_IN_FAILED,
  USER_SIGN_OUT,
  CLEAR_LOGIN_ERROR,
  START_LOADING,
  END_LOADING,
  USER_SIGN_UP_SUCCESS,
  USER_UP_IN_FAILED,
} from "./Constants";

export const INITIAL_STATE = {
  info: true,
  loading: false,
  error: {
    flag: false,
    msg: null,
  },
  register: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case START_LOADING:
      return {
        ...state,
        loading: true,
      };
    case END_LOADING:
      return {
        ...state,
        loading: false,
      };
    case USER_SIGN_IN:
      return {
        ...state,
        loading: true,
      };
    case USER_SIGN_IN_FAILED:
      return {
        ...state,
        info: null,
        loading: false,
        error: {
          flag: true,
          msg: action.payload,
        },
      };
    case USER_UP_IN_FAILED:
      return {
        ...state,
        loading: false,
        error: {
          flag: true,
          msg: action.payload,
        },
      };
    case USER_SIGN_UP_SUCCESS:
      return {
        ...state,
        register: true,
        loading: false,
      };

    case USER_SIGN_OUT:
      return INITIAL_STATE;
    case CLEAR_LOGIN_ERROR:
      return {
        ...state,
        error: {
          flag: false,
          msg: null,
        },
      };
    default:
      return state;
  }
};