import {
  COBRARPEDIDO_START,
  COBRARPEDIDO_END,
  COBRARPEDIDO_FAIL,
  SET_COBRARPEDIDO_SUCCESS,
} from "./Constants";

const initialState = {
  error: null,
  loading: false,
  msg: "",
  productsCuenta: 0,
  productsPagados: 0,
  listaProducts: [],
  listaPedidosPagados: [],
  idDetailsOrden: "",
};

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case COBRARPEDIDO_START: {
      return { ...state, loading: true, error: null };
    }

    case COBRARPEDIDO_END: {
      return { ...state, loading: false };
    }

    case COBRARPEDIDO_FAIL: {
      return { ...state, error: payload };
    }

    case SET_COBRARPEDIDO_SUCCESS: {
      return {
        ...state,
        ...payload,
        error: false,
        loading: false,
      };
    }
    default:
      return state;
  }
}
