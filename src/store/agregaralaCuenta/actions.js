import {
  addMenuRef,
  addMenuEditRef,
  addListaPedidosRef,
} from "../../config/firebase";
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
} from "./Constants";

export const getListaPedidos = () => (dispatch) => {
  dispatch({
    type: ADDALACUENTA_START,
  });
  addListaPedidosRef.on("value", (snapshot) => {
    if (snapshot.val()) {
      const data = snapshot.val();

      const arr = Object.keys(data).map((i) => {
        data[i].id = i;
        return data[i];
      });
      dispatch({
        type: GET_LISTAPEDIDOSPENDIENTES,
        payload: arr,
      });
    }
  });
  dispatch({
    type: ADDALACUENTA_END,
  });
};

export const verproductodetails = (statico, dinamico, precio) => (dispatch) => {
  dispatch({
    type: ADDALACUENTA_START,
  });
  dispatch({
    type: GET_PRODUCTSDETAILS,
    payload: {
      statico: statico,
      dinamico: dinamico,
      precio: precio,
    },
  });
  dispatch({
    type: ADDALACUENTA_END,
  });
};
export const addListaPedidosPendientes = (products_lista) => (dispatch) => {
  dispatch({
    type: ADDALACUENTA_START,
  });

  dispatch({
    type: SET_LISTAPEDIDOSPENDIENTES,
    payload: products_lista,
  });

  addListaPedidosRef.push(products_lista);
  dispatch({
    type: ADDALACUENTA_END,
  });
};
export const addProductosCosto = (
  products_lista,
  precioAnterior = 0,
  prodNuevo
) => (dispatch) => {
  dispatch({
    type: ADDALACUENTA_START,
  });

  let preciototal = precioAnterior;
  if (prodNuevo.extras) {
    for (const key in prodNuevo.extras) {
      let number = prodNuevo.extras[key].precioUnitario
        ? Number(prodNuevo.extras[key].precioUnitario)
        : 0;
      preciototal += number;
    }
  }
  preciototal += Number(prodNuevo.precioUnitario);
  dispatch({
    type: SET_ADDALACUENTA_SUCCESS,
    payload: {
      costo: preciototal,
      lista: products_lista,
    },
  });
  dispatch({
    type: ADDALACUENTA_END,
  });
};
export const addProductosMenuDinamicos = (
  products_lista,
  plato,
  precioAnterior
) => (dispatch) => {
  dispatch({
    type: ADDALACUENTA_START,
  });

  let precioPlato = precioAnterior;

  if (plato === "Pequeño") {
    precioPlato += 9.5;
  } else if (plato === "Grande") {
    precioPlato += 11.5;
  } else if (plato === "Extra Grande") {
    precioPlato += 12.5;
  }

  dispatch({
    type: SET_ADDALACUENTA_DINAMICO_SUCCESS,
    payload: {
      products: products_lista,
      costoTotal: precioPlato,
    },
  });
  dispatch({
    type: ADDALACUENTA_END,
  });
};

export const filterMenu = (products, filter) => async (dispatch) => {
  dispatch({
    type: ADDALACUENTA_START,
  });

  let filtrado;
  if (filter !== "All") {
    filtrado = products.filter((item, index) => item.categories === filter);
  } else {
    filtrado = products;
  }

  // dispatch({
  //   type: MENU_FILTER,
  //   payload: filtrado,
  // });
};

export const editMenuCosto = (addMenu, method) => async (dispatch) => {
  dispatch({
    type: ADDALACUENTA_START,
    payload: method,
  });

  if (method === "Add") {
    addMenuRef.push(addMenu);

    dispatch({
      type: ADDALACUENTA_SUCCESS,
      payload: "Se creo correctamente",
    });
  } else if (method === "Delete") {
    dispatch({
      type: ADDALACUENTA_SUCCESS,
      payload: "Se borro correctamente",
    });
    addMenuEditRef(addMenu.id).remove();
  } else {
    dispatch({
      type: ADDALACUENTA_SUCCESS,
      payload: "Se edito correctamente",
    });
    addMenuEditRef(addMenu.id).set(addMenu);
  }
  dispatch({
    type: ADDALACUENTA_END,
  });
};