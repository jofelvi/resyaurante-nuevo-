import {
  ADDMENU_START,
  ADDMENU_END,
  ADDMENU_FAIL,
  ADDMENU_SUCCESS,
  ADDMENU_EDIT,
  GET_ADDMENU_SUCCESS,
  MENU_FILTER,
  MENU_FILTER_ONLINE
} from "./Constants";

const initialState = {
  error: null,
  loading: false,
  msg: "",
  addmenu: [],
  menufilter: [],
  menuFilterOnline: [],
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
    case MENU_FILTER: {
      return {
        ...state,
        error: false,
        loading: false,
        menufilter: payload,
      };
    }
    case MENU_FILTER_ONLINE: {
      return {
        ...state,
        error: false,
        loading: false,
        menuFilterOnline: payload,
      };
    }
    case ADDMENU_EDIT: {
      return state;
    }

    default:
      return state;
  }
}
