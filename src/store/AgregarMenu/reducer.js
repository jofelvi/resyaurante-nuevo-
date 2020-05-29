import {
  ADDMENU_START,
  ADDMENU_END,
  ADDMENU_FAIL,
  ADDMENU_SUCCESS,
  ADDMENU_EDIT,
  GET_ADDMENU_SUCCESS,
} from "./Constants";

const initialState = {
  error: null,
  loading: false,
  msg: "",
  addmenu: [],
};

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case ADDMENU_START: {
      return { ...state, loading: true, error: null };
    }

    case ADDMENU_END: {
      return { ...state, loading: false };
    }

    case ADDMENU_FAIL: {
      return { ...state, error: payload };
    }

    case ADDMENU_SUCCESS: {
      return {
        ...state,
        error: false,
        loading: false,
        msg: payload,
      };
    }
    case GET_ADDMENU_SUCCESS: {
      return {
        ...state,
        error: false,
        loading: false,
        addmenu: payload,
      };
    }
    case ADDMENU_EDIT: {
      return state;
    }

    default:
      return state;
  }
}
