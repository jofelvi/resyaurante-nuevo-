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
      products_lista[key].estado = "pendiente";
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

export const addProductosPagados = (products_lista, precioAnterior = 0) => (
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

      products_lista[key].estado = "pagado";
      preciototal += number;
    }
  }

  dispatch({
    type: SET_COBRARPEDIDO_SUCCESS,
    payload: {
      listaPedidosPagados: products_lista,
      productsPagados: preciototal,
    },
  });

  dispatch({
    type: COBRARPEDIDO_END,
  });
};
