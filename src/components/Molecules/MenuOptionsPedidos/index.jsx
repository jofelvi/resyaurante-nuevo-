import React, { useState } from "react";
import { Redirect } from "react-router-dom";

import Collapse from "@material-ui/core/Collapse";

import ModalelegirPersona from "../ModalElegirPersona";

// Material UI
import { makeStyles, Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: "#1e3a56",
    padding: 0,

    display: "flex",
  },
  container: {
    width: "100%",
  },
  paper: {
    position: "relative",
    width: 250,
    boxShadow: theme.shadows[1],
    padding: theme.spacing(0, 1),
  },
}));

const MenuOpcion = ({ checked }) => {
  const classes1 = useStyles();

  const [redirigir, setredirigir] = useState(false);
  const [modalOpen, setmodalOpen] = useState(false);

  const handleClose = () => {
    setmodalOpen(false);
  };

  const BottomMenu = [
    {
      nombre: "Asignar Cliente",
      tipo: "path",
    },
    {
      nombre: "Transferir Orden",
      tipo: "modal",
    },
    {
      nombre: "Transferir Producto",
      tipo: "modal",
    },
    {
      nombre: "Reimprimir Ticket",
      tipo: "modal",
    },
  ];

  const path = () => {
    setredirigir(true);
  };
  const modal = () => {
    setmodalOpen(true);
  };

  return (
    // <div className={classes1.paper}>
    <div className={classes1.root}>
      <Collapse in={checked} className="col-12 p-0">
        {BottomMenu.map((item, i) => (
          <div key={i} style={{ borderBottom: `2px solid #fff` }}>
            <Button
              style={{
                width: "100%",
                color: "#fff",
              }}
              className="d-flex justify-content-center py-2"
              onClick={() => (item.tipo === "path" ? path() : modal())}
            >
              {item.nombre}
            </Button>
          </div>
        ))}
      </Collapse>
      <ModalelegirPersona openModal={modalOpen} handleClose={handleClose} />

      {redirigir ? (
        <Redirect
          to={{
            pathname: "/clients",
          }}
        />
      ) : (
        ""
      )}
    </div>
    // </div>
  );
};
export default MenuOpcion;
