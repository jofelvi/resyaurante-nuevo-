import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

// Material UI
import { makeStyles, Button } from "@material-ui/core";

import { addProductosPagados } from "../../../store/cobrarPedidos/actions";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "40%",
    backgroundColor: "#1e3a56",
    padding: 0,
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

const MenuOpcion = () => {
  const classes1 = useStyles();
  const dispatch = useDispatch();

  const [methodPayment, setmethodPayment] = useState("");

  const listPorPagar = useSelector((state) => state.listaPorPagar);

  const setmethodoPayment = (item) => {
    setmethodPayment(item);

    dispatch(
      addProductosPagados(
        listPorPagar.listaPedidosPorPagar,
        listPorPagar.productsPagados,
        item,
        listPorPagar.listaProducts
      )
    );
  };

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
        <div
          key={i}
          style={{
            borderBottom: `0.5px solid #fff`,
            backgroundColor: methodPayment === item.nombre ? "#000" : "",
          }}
        >
          <Button
            style={{
              width: "100%",
              color: "#fff",
            }}
            className="d-flex justify-content-center py-2"
            onClick={() => setmethodoPayment(item.nombre)}
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
