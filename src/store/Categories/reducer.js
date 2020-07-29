import {
  CATEGORIES_START,
  CATEGORIES_END,
  CATEGORIES_FAIL,
  CATEGORIES_SUCCESS,
  CATEGORIES_EDIT,
  GET_CATEGORIES_SUCCESS,
  GET_CATEGORIES_MENU_SUCCESS,
} from "./Constants";

const initialState = {
  error: null,
  loading: false,
  msg: "",
  categories: [],
  categoriesMenu: [],
};

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case CATEGORIES_START: {
      return { ...state, loading: true, error: null };
    }

    case CATEGORIES_END: {
      return { ...state, loading: false };
    }

    case CATEGORIES_FAIL: {
      return { ...state, error: payload };
    }

    case CATEGORIES_SUCCESS: {
      return {
        ...state,
        error: false,
        loading: false,
        msg: payload,
      };
    }
    case GET_CATEGORIES_SUCCESS: {
      return {
        ...state,
        error: false,
        loading: false,
        categories: payload,
      };
    }
    case GET_CATEGORIES_MENU_SUCCESS: {
      return {
        ...state,
        error: false,
        loading: false,
        categoriesMenu: payload,
      };
    }
    case CATEGORIES_EDIT: {
      return state;
    }

    default:
      return state;
  }
}
