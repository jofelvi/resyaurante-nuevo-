import {
  PRODUCT_START,
  PRODUCT_END,
  PRODUCT_FAIL,
  PRODUCT_SUCCESS,
  PRODUCT_EDIT,
  GET_PRODUCT_SUCCESS,
  PRODUCT_FILTER,
} from "./Constants";

const initialState = {
  error: null,
  loading: false,
  msg: "",
  products: [],
  productsFilter: [],
};

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case PRODUCT_START: {
      return { ...state, loading: true, error: null };
    }
    case PRODUCT_END: {
      return { ...state, loading: false };
    }

    case PRODUCT_FAIL: {
      return { ...state, error: payload };
    }

    case PRODUCT_SUCCESS: {
      return {
        ...state,
        error: false,
        loading: false,
        msg: payload,
      };
    }
    case GET_PRODUCT_SUCCESS: {
      return {
        ...state,
        error: false,
        loading: false,
        products: payload,
      };
    }
    case PRODUCT_FILTER: {
      return {
        ...state,
        error: false,
        loading: false,
        productsFilter: payload,
      };
    }
    case PRODUCT_EDIT: {
      return state;
    }

    default:
      return state;
  }
}
