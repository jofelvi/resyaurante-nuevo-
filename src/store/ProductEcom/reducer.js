import {
  GET_PRODUCTECO_SUCCESS,
  ADD_PRODUCT_ECO_START,
  PRODUCTECO_FAIL,
  PRODUCTECO_END,
  PRODUCTECO_SUCCESS,
  PRODUCTECO_FILTER
} from "./Constants";

const initialState = {
  error: null,
  loading: false,
  msg: "",
  addmenu: [],
  menufilter: [],
};

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case ADD_PRODUCT_ECO_START: {
      return { ...state, loading: true, error: null };
    }

    case PRODUCTECO_FAIL: {
      return { ...state, loading: false };
    }

    case PRODUCTECO_FAIL: {
      return { ...state, error: payload };
    }

    case PRODUCTECO_SUCCESS: {
      return {
        ...state,
        error: false,
        loading: false,
        msg: payload,
      };
    }
    case GET_PRODUCTECO_SUCCESS: {
      return {
        ...state,
        error: false,
        loading: false,
        addmenu: payload,
      };
    }
    case PRODUCTECO_FILTER: {
      return {
        ...state,
        error: false,
        loading: false,
        menufilter: payload,
      };
    }
    default:
      return state;
  }
}
