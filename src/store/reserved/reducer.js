import { RESERVED_START, RESERVED_END, RESERVED_FAIL, SET_RESERVED_SUCCESS } from "./Constants";

const initialState = {
  error: null,
  loading: false,
  msg: "",
  reserved: [],
  reservedEdit: null,
};

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case RESERVED_START: {
      return { ...state, loading: true, error: null };
    }

    case RESERVED_END: {
      return { ...state, loading: false };
    }

    case RESERVED_FAIL: {
      return { ...state, ...payload };
    }

    case SET_RESERVED_SUCCESS: {
      return {
        ...state,
        error: false,
        loading: false,
        ...payload,
      };
    }
    default:
      return state;
  }
}
