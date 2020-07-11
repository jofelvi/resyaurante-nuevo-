import {
  ADDALACUENTA_START,
  ADDALACUENTA_END,
  ADDALACUENTA_FAIL,
  ADDALACUENTA_SUCCESS,
  ADDALACUENTA_EDIT,
  SET_ADDALACUENTA_SUCCESS,
  SET_ADDALACUENTA_DINAMICO_SUCCESS,
  SET_LISTAPEDIDOSPENDIENTES,
  GET_LISTAPEDIDOSPENDIENTES,
  GET_PRODUCTSDETAILS,
  EDIT_LISTA_PRODUCTOS,
  SET_PARA_PRODUCTOS,
} from "./Constants";

const initialState = {
  error: null,
  loading: false,
  msg: "",
  productsCuenta: 0,
  listaProducts: [],
  menudinamicoorden: [],
  listaPedidosOrdenados: [],
  getListaPedidosPendientes: [],
  detailspedido: false,
  idDetailsOrden: "",
  recibirOrden: {},
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

    case SET_PARA_PRODUCTOS: {
      return { ...state, recibirOrden: payload };
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
        productsCuenta: payload.costo,
        listaProducts: payload.lista,
      };
    }
    case GET_LISTAPEDIDOSPENDIENTES: {
      return {
        ...state,
        error: false,
        loading: false,
        getListaPedidosPendientes: payload,
      };
    }
    case SET_ADDALACUENTA_DINAMICO_SUCCESS: {
      return {
        ...state,
        error: false,
        loading: false,
        menudinamicoorden: payload.products,
        productsCuenta: payload.costoTotal,
      };
    }
    case EDIT_LISTA_PRODUCTOS: {
      return {
        ...state,
        menudinamicoorden: payload.new,
        listaProducts: payload.old,
        productsCuenta: payload.total,
      };
    }
    case GET_PRODUCTSDETAILS: {
      return {
        ...state,
        error: false,
        loading: false,
        listaProducts: payload.statico,
        menudinamicoorden: payload.dinamico,
        productsCuenta: payload.precio,
        detailspedido: payload.detailspedido,
        idDetailsOrden: payload.id,
      };
    }
    case SET_LISTAPEDIDOSPENDIENTES: {
      return {
        ...state,
        error: false,
        loading: false,
        listaPedidosOrdenados: payload,
        listaProducts: [],
        menudinamicoorden: [],
        productsCuenta: 0,
      };
    }
    case ADDALACUENTA_EDIT: {
      return state;
    }

    default:
      return state;
  }
}
