import { TABLE_START, TABLE_END, TABLE_FAIL, SET_TABLE_SUCCESS } from "./Constants";

const initialState = {
  error: null,
  loading: false,
  msg: "",
  tables: [],
  tableEdit: null,
};

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case TABLE_START: {
      return { ...state, loading: true, error: null };
    }

    case TABLE_END: {
      return { ...state, loading: false };
    }

    case TABLE_FAIL: {
      return { ...state, ...payload };
    }

    case SET_TABLE_SUCCESS: {
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
