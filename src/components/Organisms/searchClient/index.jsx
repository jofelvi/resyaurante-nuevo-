import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import { personaParaOrden } from "../../../store/agregaralaCuenta/actions";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    fontSize: 18,
    fontWeight: "normal",
    textAlign: "start",
  },
  subtitle: {
    fontSize: 14,
    fontWeight: "normal",
    textAlign: "start",
    color: "#1e3a56",
  },
  bgcolor: { backgroundColor: "#1e3a56", color: "#fff" },
}));

const SeachClients = () => {
  const classes = useStyles();
  const clients = useSelector((state) => state.clients.clients);
  const dispatch = useDispatch();

  const asignarOrden = (client) => {
    dispatch(personaParaOrden({ tipo: "cliente", tranferir: client }));
  };
  return (
    <div className="col-5 border">
      <div className="py-3 d-flex justify-content-center border-bottom">
        <h5>Todos los Usuarios</h5>
      </div>
      {clients.map((item) => (
        <div
          key={item.id}
          className="py-3 col-12 btn justify-content-start border-bottom"
          onClick={() => asignarOrden(item)}
        >
          <p className={`${classes.title} p-0 m-0`}>
            {`${item.nombre} ${item.apellido}`}
          </p>
          <p className={`${classes.subtitle} p-0 m-0`}>{item.rol}</p>
        </div>
      ))}
    </div>
  );
};

export default SeachClients;
