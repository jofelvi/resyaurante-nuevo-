import {
  CLIENTS_START,
  CLIENTS_END,
  CLIENTS_FAIL,
  SET_CLIENTS_SUCCESS,
} from "./Constants";

const initialState = {
  error: null,
  loading: false,
  msg: "",
  msgmesas: "",
  clients: [],
  mesas: [],
};

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case CLIENTS_START: {
      return { ...state, loading: true, error: null };
    }

    case CLIENTS_END: {
      return { ...state, loading: false };
    }

    case CLIENTS_FAIL: {
      return { ...state, ...payload };
    }

    case SET_CLIENTS_SUCCESS: {
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
