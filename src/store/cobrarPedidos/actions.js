import {
  COBRARPEDIDO_START,
  COBRARPEDIDO_END,
  SET_COBRARPEDIDO_SUCCESS,
} from "./Constants";

export const addProductosCosto = (products_lista, precioAnterior = 0) => (
  dispatch
) => {
  dispatch({
    type: COBRARPEDIDO_START,
  });

  let preciototal = precioAnterior;
  if (products_lista) {
    for (const key in products_lista) {
      let number = products_lista[key].precioUnitario
        ? Number(products_lista[key].precioUnitario)
        : 0;
      products_lista[key].estado =
        products_lista[key].estado === "pagado" ? "pagado" : "pendiente";
      preciototal += number;
    }
  }
  dispatch({
    type: SET_COBRARPEDIDO_SUCCESS,
    payload: {
      listaProducts: products_lista,
      productsCuenta: preciototal,
    },
  });

  dispatch({
    type: COBRARPEDIDO_END,
  });
};

export const addProductosParaPagar = (products_lista) => (dispatch) => {
  dispatch({
    type: COBRARPEDIDO_START,
  });

  let preciototal = 0;
  if (products_lista) {
    for (const key in products_lista) {
      let number = products_lista[key].precioUnitario
        ? Number(products_lista[key].precioUnitario)
        : 0;
      preciototal += number;
    }
  }

  dispatch({
    type: SET_COBRARPEDIDO_SUCCESS,
    payload: {
      listaPedidosPorPagar: products_lista,
      productoPorPagar: preciototal,
    },
  });

  dispatch({
    type: COBRARPEDIDO_END,
  });
};

export const addProductosPagados = (
  products_lista,
  precioPagado = 0,
  metodo,
  products_lista_old
) => (dispatch) => {
  dispatch({
    type: COBRARPEDIDO_START,
  });

  let preciototal = precioPagado;

  if (products_lista) {
    for (const key in products_lista) {
      let number = products_lista[key].precioUnitario
        ? Number(products_lista[key].precioUnitario)
        : 0;

      products_lista[key].estado = "pagado";
      products_lista[key].metodo = metodo;
      preciototal += number;
    }
  }

  dispatch({
    type: SET_COBRARPEDIDO_SUCCESS,
    payload: {
      productoPorPagar: 0,
      listaProducts: products_lista_old,
      productsPagados: preciototal,
      listaPedidosPorPagar: [],
    },
  });

  dispatch({
    type: COBRARPEDIDO_END,
  });
};
