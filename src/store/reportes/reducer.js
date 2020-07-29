import { REPORTES_START, REPORTES_END, REPORTES_SUCCESS } from "./Constants";

const initialState = {
  error: null,
  loading: false,
  msg: "",
  gastos: [],
  view: "/",
};

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case REPORTES_START: {
      return { ...state, loading: true, error: null };
    }
    case REPORTES_END: {
      return { ...state, loading: false };
    }
    case REPORTES_SUCCESS: {
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
