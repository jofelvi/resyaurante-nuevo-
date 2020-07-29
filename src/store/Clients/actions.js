import {
  addClientEditRef,
  addClientRef,
  addMesasEditRef,
  addMesasRef,
} from "../../config/firebase";
import {
  CLIENTS_START,
  CLIENTS_END,
  CLIENTS_FAIL,
  SET_CLIENTS_SUCCESS,
} from "./Constants";

export const fecthClients = () => (dispatch) => {
  dispatch({
    type: CLIENTS_START,
  });
  addClientRef.on("value", (snapshot) => {
    if (snapshot.val()) {
      const data = snapshot.val();

      const arr = Object.keys(data).map((i) => {
        data[i].id = i;
        return data[i];
      });
      dispatch({
        type: SET_CLIENTS_SUCCESS,
        payload: {
          clients: arr,
        },
      });
    } else {
      dispatch({
        type: CLIENTS_FAIL,
        payload: {
          error: true,
          msg: "No hay productos disponibles",
        },
      });
    }
  });
  dispatch({
    type: CLIENTS_END,
  });
};

export const fecthMesas = () => (dispatch) => {
  dispatch({
    type: CLIENTS_START,
  });
  addMesasRef.on("value", (snapshot) => {
    if (snapshot.val()) {
      const data = snapshot.val();

      const arr = Object.keys(data).map((i) => {
        data[i].id = i;
        return data[i];
      });
      dispatch({
        type: SET_CLIENTS_SUCCESS,
        payload: {
          mesas: arr,
        },
      });
    } else {
      dispatch({
        type: CLIENTS_FAIL,
        payload: {
          error: true,
          msgmesas: "No hay productos disponibles",
        },
      });
    }
  });
  dispatch({
    type: CLIENTS_END,
  });
};

export const editClient = (client, method) => async (dispatch) => {
  dispatch({
    type: CLIENTS_START,
  });

  if (method === "Add") {
    addClientRef.push(client);
    dispatch({
      type: SET_CLIENTS_SUCCESS,
      payload: { msg: "Se creo correctamente" },
    });
  } else if (method === "Delete") {
    dispatch({
      type: SET_CLIENTS_SUCCESS,
      payload: { msg: "Se borro correctamente" },
    });
    addClientEditRef(client.id).remove();
  } else {
    dispatch({
      type: SET_CLIENTS_SUCCESS,
      payload: { msg: "Se edito correctamente" },
    });
    addClientEditRef(client.id).set(client);
  }
  dispatch({
    type: CLIENTS_END,
  });
};

export const editMesas = (client, method) => async (dispatch) => {
  dispatch({
    type: CLIENTS_START,
  });

  if (method === "Add") {
    addMesasRef.push(client);
    dispatch({
      type: SET_CLIENTS_SUCCESS,
      payload: { msg: "Se creo correctamente" },
    });
  } else if (method === "Delete") {
    dispatch({
      type: SET_CLIENTS_SUCCESS,
      payload: { msg: "Se borro correctamente" },
    });
    addMesasEditRef(client.id).remove();
  } else {
    dispatch({
      type: SET_CLIENTS_SUCCESS,
      payload: { msg: "Se edito correctamente" },
    });
    addMesasEditRef(client.id).set(client);
  }
  dispatch({
    type: CLIENTS_END,
  });
};
