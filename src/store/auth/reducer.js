import {
  USER_SIGN_IN,
  USER_SIGN_IN_FAILED,
  USER_SIGN_OUT,
  CLEAR_LOGIN_ERROR,
  START_LOADING,
  END_LOADING,
  USER_SIGN_UP_SUCCESS,
  USER_UP_IN_FAILED,
  USER_SIGN_IN_SUCCESS,
  USER_FETCH_SUCCESS,
} from "./Constants";

export const INITIAL_STATE = {
  info: {
    email: "Test@email.com",
    firstName: "Jonathan",
    id: "u46k33xNkPeq9ZuaRKxHqMt25oi1",
    lastName: "Zambrano",
    rol: "ADMIN_MASTER",
    verify: "Activo",
  },
  loading: false,
  error: {
    flag: false,
    msg: null,
  },
  register: false,
  users: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case START_LOADING:
      return {
        ...state,
        loading: true,
      };
    case USER_SIGN_IN_SUCCESS: {
      return {
        ...state,
        loading: false,
        info: action.payload,
      };
    }
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
      return {
        ...state,
        info: null,
        loading: false,
      };
    case CLEAR_LOGIN_ERROR:
      return {
        ...state,
        error: {
          flag: false,
          msg: null,
        },
      };
    case USER_FETCH_SUCCESS: {
      return {
        ...state,
        ...action.payload,
      };
    }
    default:
      return state;
  }
};
