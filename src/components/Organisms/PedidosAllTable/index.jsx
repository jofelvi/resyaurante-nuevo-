import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";

// Material UI
import { Card, Typography } from "@material-ui/core";
import { addListaPedidosPendientes } from "../../../store/agregaralaCuenta/actions";
import styles from "./styles";

const AllTables = () => {
  const classes = styles();

  const dispatch = useDispatch();
  const productosAll = useSelector((state) => state.addcuenta.listaProducts);
  const productosDinamicosPedido = useSelector(
    (state) => state.addcuenta.menudinamicoorden
  );
  const precioAcumulado = useSelector(
    (state) => state.addcuenta.productsCuenta
  );
  const listaPedidosPendientes = useSelector(
    (state) => state.addcuenta.listaPedidosOrdenados
  );

  const [alertPedido, setalertPedido] = useState({
    alertSuccess: "",
  });

  const productosAllPedido = [...productosAll, ...productosDinamicosPedido];

  const addPedido = (e) => {
    if (productosAllPedido.length === 0) {
      setalertPedido({
        alertSuccess: "Debe haber un producto agregado",
      });

      setTimeout(() => {
        setalertPedido({
          alertSuccess: "",
        });
      }, 2500);
      return;
    }

    const pedido = {
      status: "pendiente",
      static: productosAll,
      dinamic: productosDinamicosPedido,
      precio: precioAcumulado,
    };

    dispatch(addListaPedidosPendientes(pedido));
  };

  return (
    <Card className={classes.root}>
      <div className={`${classes.header} d-flex justify-content-between`}>
        <Typography variant="subtitle2" color="primary">
          Lista de Productos
        </Typography>
        <Typography variant="subtitle2" color="primary">
          {`$ ${precioAcumulado}`}
        </Typography>
      </div>
      <div className={classes.filtersContainer}>
        {alertPedido.alertSuccess !== "" ? (
          <div
            className={`alert alert-danger text-center my-4 col-12`}
            role="alert"
          >
            {alertPedido.alertSuccess}
          </div>
        ) : (
          ""
        )}
        {productosAllPedido.map((item) => (
          <div
            key={item.nombre}
            className="d-flex justify-content-between py-2"
          >
            <Typography variant="body1" color="textPrimary" align="left">
              {item.nombre}
            </Typography>
            <Typography variant="body1" color="textPrimary" align="left">
              {item.precioUnitario}
            </Typography>
          </div>
        ))}
      </div>

      <div className="d-flex justify-content-end my-3 mr-2">
        <button onClick={() => addPedido()} className="btn btn-primary btn-sm">
          Crear Pedido
        </button>
      </div>
    </Card>
  );
};

export default AllTables;
