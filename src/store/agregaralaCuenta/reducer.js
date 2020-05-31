import {
  ADDALACUENTA_START,
  ADDALACUENTA_END,
  ADDALACUENTA_FAIL,
  ADDALACUENTA_SUCCESS,
  ADDALACUENTA_EDIT,
  SET_ADDALACUENTA_SUCCESS,
} from "./Constants";

const initialState = {
  error: null,
  loading: false,
  msg: "",
  productsCuenta: 0,
};

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case ADDALACUENTA_START: {
      return { ...state, loading: true, error: null };
    }

    case ADDALACUENTA_END: {
      return { ...state, loading: false };
    }

    case ADDALACUENTA_FAIL: {
      return { ...state, error: payload };
    }

    case ADDALACUENTA_SUCCESS: {
      return {
        ...state,
        error: false,
        loading: false,
        msg: payload,
      };
    }
    case SET_ADDALACUENTA_SUCCESS: {
      return {
        ...state,
        error: false,
        loading: false,
        productsCuenta: payload,
      };
    }
    case ADDALACUENTA_EDIT: {
      return state;
    }

    default:
      return state;
  }
}
