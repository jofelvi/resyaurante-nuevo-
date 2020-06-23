import React from "react";
import Collapse from "@material-ui/core/Collapse";

// Material UI
import { makeStyles, Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "60%",
    backgroundColor: "#1e3a56",
    padding: 0,
  },
  container: {
    width: "100%",
  },
  paper: {
    position: "relative",
    width: 250,
    // backgroundColor: theme.palette.background.paper,
    // border: "2px solid #000",
    boxShadow: theme.shadows[1],
    padding: theme.spacing(0, 1),
  },
}));

const MenuOpcion = ({ checked }) => {
  const classes1 = useStyles();

  const BottomMenu = [
    {
      nombre: "Efectivo",
    },
    {
      nombre: "Trajeta de Credito",
    },
    {
      nombre: "Ticket Restaurante",
    },
    {
      nombre: "Deber",
    },
  ];

  return (
    // <div className={classes1.paper}>
    <div className={classes1.root}>
      {BottomMenu.map((item, i) => (
        <div key={i} style={{ borderBottom: `0.5px solid #fff` }}>
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
      <div style={{ borderBottom: `0.5px solid #fff` }}>
        <Button
          style={{
            width: "100%",
            color: "#fff",
          }}
          className="d-flex justify-content-center py-2"
        >
          Descuento
        </Button>
      </div>
    </div>
    // </div>
  );
};
export default MenuOpcion;
