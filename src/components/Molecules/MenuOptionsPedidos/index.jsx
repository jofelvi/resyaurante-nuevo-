import React, { Fragment } from "react";
import Collapse from "@material-ui/core/Collapse";

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
}));

const MenuOpcion = ({ checked }) => {
  const classes1 = useStyles();

  const BottomMenu = [
    {
      nombre: "Asignar Cliente",
    },
    {
      nombre: "Transferir Orden",
    },
    {
      nombre: "Transferir Producto",
    },
    {
      nombre: "Reimprimir Ticket",
    },
  ];

  return (
    <Fragment>
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
              >
                {item.nombre}
              </Button>
            </div>
          ))}
        </Collapse>
      </div>
    </Fragment>
  );
};
export default MenuOpcion;
