import {
  addMenuRef,
  addMenuEditRef,
  addListaPedidosRef,
  addListaPedidosEditRef,
} from "../../config/firebase";
import {
  ADDALACUENTA_START,
  ADDALACUENTA_END,
  ADDALACUENTA_SUCCESS,
  SET_ADDALACUENTA_SUCCESS,
  SET_ADDALACUENTA_DINAMICO_SUCCESS,
  SET_LISTAPEDIDOSPENDIENTES,
  GET_LISTAPEDIDOSPENDIENTES,
  GET_PRODUCTSDETAILS,
  EDIT_LISTA_PRODUCTOS,
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

export const eliminarListaProductos = (
  listaProductosOld,
  nueva,
  method,
  total
) => (dispatch) => {
  if (method === "dinamico") {
    dispatch({
      type: EDIT_LISTA_PRODUCTOS,
      payload: {
        old: listaProductosOld,
        new: nueva,
      },
    });
  } else {
    dispatch({
      type: EDIT_LISTA_PRODUCTOS,
      payload: {
        old: nueva,
        new: listaProductosOld,
        total: total,
      },
    });
  }
};

export const verproductodetails = (statico, dinamico, precio, id) => (
  dispatch
) => {
  dispatch({
    type: ADDALACUENTA_START,
  });
  dispatch({
    type: GET_PRODUCTSDETAILS,
    payload: {
      statico: statico,
      dinamico: dinamico,
      precio: precio,
      id: id,
      detailspedido: true,
    },
  });
  dispatch({
    type: ADDALACUENTA_END,
  });
};
export const addListaPedidosPendientes = (products_lista, method) => (
  dispatch
) => {
  dispatch({
    type: ADDALACUENTA_START,
  });

  if (method === "add") {
    dispatch({
      type: SET_LISTAPEDIDOSPENDIENTES,
      payload: products_lista,
    });

    addListaPedidosRef.push(products_lista);
  } else if (method === "editar") {
    dispatch({
      type: SET_LISTAPEDIDOSPENDIENTES,
      payload: products_lista,
    });

    addListaPedidosEditRef(products_lista.id).set(products_lista);
  } else if (method === "eliminar") {
    addListaPedidosEditRef(products_lista.id).remove();
    dispatch({
      type: SET_LISTAPEDIDOSPENDIENTES,
      payload: "",
    });
  }

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
    filtrado = products.filter((item) => item.categories === filter);
  } else {
    filtrado = products;
  }
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
