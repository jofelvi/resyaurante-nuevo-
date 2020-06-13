import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";

// Material UI
import { Typography } from "@material-ui/core";
import { addListaPedidosPendientes } from "../../../store/agregaralaCuenta/actions";
import styles from "./styles";

const AllTables = () => {
  const classes = styles();

  const dispatch = useDispatch();
  let productosAll = useSelector((state) => state.addcuenta.listaProducts);
  if (!productosAll) {
    productosAll = [];
  }

  let productosDinamicosPedido = useSelector(
    (state) => state.addcuenta.menudinamicoorden
  );
  if (!productosDinamicosPedido) {
    productosDinamicosPedido = [];
  }
  const precioAcumulado = useSelector(
    (state) => state.addcuenta.productsCuenta
  );

  const detailspedidos = useSelector((state) => state.addcuenta.detailspedido);
  const idDetailsOrden = useSelector((state) => state.addcuenta.idDetailsOrden);
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

    dispatch(addListaPedidosPendientes(pedido, "add"));
  };
  const editarPedido = (e) => {
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

    if (e === "editar") {
      const pedido = {
        status: "aprovado",
        static: productosAll,
        dinamic: productosDinamicosPedido,
        precio: precioAcumulado,
        id: idDetailsOrden,
      };

      dispatch(addListaPedidosPendientes(pedido, "editar"));
    } else if (e === "cancelar") {
      const pedido = {
        id: idDetailsOrden,
      };

      dispatch(addListaPedidosPendientes(pedido, "eliminar"));
    }
  };

  return (
    <div className={classes.root}>
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
        {productosAllPedido.map((item, index) => (
          <div key={index} className="d-flex justify-content-between py-2">
            <Typography variant="body1" color="textPrimary" align="left">
              {item.nombre}
            </Typography>
            <Typography variant="body1" color="textPrimary" align="left">
              {item.precioUnitario}
            </Typography>
          </div>
        ))}
      </div>

      {detailspedidos ? (
        <div className="d-flex justify-content-around my-3">
          <button
            onClick={() => editarPedido("cancelar")}
            className="btn btn-danger btn-sm"
          >
            Eliminar
          </button>
          <button
            onClick={() => editarPedido("editar")}
            className="btn btn-success btn-sm"
          >
            Ordenar
          </button>
        </div>
      ) : (
        <div className="d-flex justify-content-end my-3 mr-2">
          <button
            onClick={() => addPedido()}
            className="btn btn-primary btn-sm"
          >
            Crear Pedido
          </button>
        </div>
      )}
    </div>
  );
};

export default AllTables;
