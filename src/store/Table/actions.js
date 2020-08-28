import { addMesasEditRef, addMesasRef } from "../../config/firebase";
import { TABLE_START, TABLE_END, TABLE_FAIL, SET_TABLE_SUCCESS } from "./Constants";
import moment from "moment";

export const fecthTables = () => (dispatch) => {
  dispatch({
    type: TABLE_START,
  });
  addMesasRef.on("value", (snapshot) => {
    if (snapshot.val()) {
      const data = snapshot.val();

      const arr = Object.keys(data).map((i) => {
        data[i].id = i;
        return data[i];
      });

      const tables = arr.map((item) => {
        item.onRangeReserved =
          moment.now() >= moment(`${item.dateReserved}T${item.timeInit}`) &&
          moment.now() <= moment(`${item.dateReserved}T${item.timeEnd}`);

        return item;
      });

      dispatch({
        type: SET_TABLE_SUCCESS,
        payload: {
          tables,
        },
      });
    } else {
      dispatch({
        type: TABLE_FAIL,
        payload: {
          error: true,
          msg: "No hay mesas disponibles",
          tables: [],
        },
      });
    }
  });
  dispatch({
    type: TABLE_END,
  });
};

export const editTable = (table, method) => async (dispatch) => {
  dispatch({
    type: TABLE_START,
  });

  if (method === "Add") {
    delete table.loading;
    delete table.method;
    addMesasRef.push(table);
    dispatch({
      type: SET_TABLE_SUCCESS,
      payload: { msg: "Se creo correctamente la mesa." },
    });
  } else if (method === "Delete") {
    dispatch({
      type: SET_TABLE_SUCCESS,
      payload: { msg: "La mesa ha sido eliminada correctamente." },
    });
    addMesasEditRef(table.id).remove();
  } else {
    delete table.loading;
    delete table.method;
    dispatch({
      type: SET_TABLE_SUCCESS,
      payload: { msg: "La mesa ha sido actualizada correctamente." },
    });
    addMesasEditRef(table.id).set(table);
  }
  dispatch({
    type: TABLE_END,
  });
};

export const getTable = (table) => (dispatch) => {
  dispatch({
    type: TABLE_START,
  });
  addMesasEditRef(table.id).on("value", (snapshot) => {
    if (snapshot.val()) {
      let data = snapshot.val();
      data["id"] = table.id;
      data["method"] = "Editar";
      dispatch({
        type: SET_TABLE_SUCCESS,
        payload: {
          tableEdit: data,
        },
      });
    } else {
      dispatch({
        type: TABLE_FAIL,
        payload: {
          error: true,
          msg: "Problema al consultar la mesa",
          tables: [],
        },
      });
    }
    dispatch({
      type: TABLE_END,
    });
  });
};
