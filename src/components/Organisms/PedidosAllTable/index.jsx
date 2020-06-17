import React, { useState } from "react";
import {
  SwipeableListItem,
  SwipeableList,
} from "@sandstreamdev/react-swipeable-list";

import "@sandstreamdev/react-swipeable-list/dist/styles.css";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

import { useDispatch, useSelector } from "react-redux";
import { ExpandMore } from "@material-ui/icons";

// Material UI
import { Typography, Button } from "@material-ui/core";
import {
  addListaPedidosPendientes,
  eliminarListaProductos,
} from "../../../store/agregaralaCuenta/actions";
import styles from "./styles";

import ModalScreenProducto from "../../Molecules/ModalScreenProdcuto";
import MenuOptionsPedidos from "../../Molecules/MenuOptionsPedidos";

const AllTables = () => {
  const classes = styles();
  const [checked, setChecked] = useState(false);
  const handleChange = () => {
    setChecked((prev) => !prev);
  };

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

  const eliminarProductolist = (prod) => {
    if (prod.bases) {
      const nuevoArrayDinamico = productosDinamicosPedido.filter(
        (item) => item.nombre !== prod.nombre
      );

      const arrayall = [...nuevoArrayDinamico, ...productosAll];

      let total = 0;
      for (const key in arrayall) {
        total += arrayall[key].precioUnitario
          ? Number(arrayall[key].precioUnitario)
          : 0;
        console.log(total);
      }

      dispatch(
        eliminarListaProductos(
          productosAll,
          nuevoArrayDinamico,
          "dinamico",
          total
        )
      );
    } else {
      const nuevoArray = productosAll.filter(
        (item) => item.nombre !== prod.nombre
      );

      const arrayall = [...nuevoArray, ...productosDinamicosPedido];

      let total = 0;
      for (const key in arrayall) {
        total += Number(arrayall[key].precioUnitario);
        console.log(total);
      }

      dispatch(
        eliminarListaProductos(
          productosDinamicosPedido,
          nuevoArray,
          "estatico",
          total
        )
      );
    }
  };

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
    const hora = new Date();
    const pedido = {
      status: "pendiente",
      static: productosAll,
      dinamic: productosDinamicosPedido,
      precio: precioAcumulado,
      tiempoinicial:
        hora.getHours() + ":" + hora.getMinutes() + ":" + hora.getSeconds(),
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
      const hora = new Date();
      const pedido = {
        status: "aprovado",
        static: productosAll,
        dinamic: productosDinamicosPedido,
        precio: precioAcumulado,
        id: idDetailsOrden,
        tiempoinicial:
          hora.getHours() + ":" + hora.getMinutes() + ":" + hora.getSeconds(),
      };

      dispatch(addListaPedidosPendientes(pedido, "editar"));
    } else if (e === "cancelar") {
      const pedido = {
        id: idDetailsOrden,
      };

      dispatch(addListaPedidosPendientes(pedido, "eliminar"));
    }
  };

  const [openProducto, setopenProducto] = useState({
    open: false,
    menuItem: "",
  });

  const handleClose = (prod) => {
    if (prod.bases) {
      const nuevoArrayDinamico = productosDinamicosPedido.filter(
        (item) => item.nombre !== prod.nombre
      );
      nuevoArrayDinamico.push(prod);

      const arrayall = [...nuevoArrayDinamico, ...productosAll];

      let total = 0;

      for (const key in arrayall) {
        let cantidad = arrayall[key].cantidad
          ? Number(arrayall[key].cantidad)
          : 1;

        total += Number(arrayall[key].precioUnitario) * cantidad;
        console.log(total);
      }

      dispatch(
        eliminarListaProductos(
          productosAll,
          nuevoArrayDinamico,
          "dinamico",
          total
        )
      );
    } else {
      const nuevoArray = productosAll.filter(
        (item) => item.nombre !== prod.nombre
      );
      nuevoArray.push(prod);

      const arrayall = [...nuevoArray, ...productosDinamicosPedido];

      let total = 0;

      for (const key in arrayall) {
        let cantidad = arrayall[key].cantidad
          ? Number(arrayall[key].cantidad)
          : 1;

        total += Number(arrayall[key].precioUnitario) * cantidad;
        console.log(total);
      }

      dispatch(
        eliminarListaProductos(
          productosDinamicosPedido,
          nuevoArray,
          "estatico",
          total
        )
      );
    }

    setopenProducto({
      open: false,
    });
  };

  return (
    <div className={classes.root}>
      <div
        className={`${classes.header} d-flex justify-content-between align-items-center`}
      >
        <Typography variant="subtitle2" color="primary">
          Lista de Productos
        </Typography>
        <Button
          onClick={handleChange}
          style={{
            color: "#1e3a56",
            padding: 0,
            margin: 0,
          }}
          className="d-flex justify-content-center"
        >
          <ExpandMore />
        </Button>
      </div>
      <div>
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

        <MenuOptionsPedidos checked={checked} />

        {productosAllPedido.map((item, index) => (
          <SwipeableList key={index}>
            <SwipeableListItem
              swipeLeft={{
                content: (
                  <div
                    style={{ height: 40, color: "#fff", fontSize: 16 }}
                    className="bg-danger col-12  d-flex justify-content-end align-items-center "
                  >
                    <DeleteForeverIcon />
                  </div>
                ),
                action: () => eliminarProductolist(item),
              }}
            >
              <Button
                style={{
                  width: "100%",
                  backgroundColor: "#f2f2f2",
                }}
                className="d-flex justify-content-between py-2"
                onClick={() => setopenProducto({ menuItem: item, open: true })}
              >
                <Typography variant="body1" color="textPrimary" align="left">
                  {item.nombre}
                </Typography>
                <Typography variant="body1" color="textPrimary" align="left">
                  {item.precioUnitario}
                </Typography>
              </Button>
            </SwipeableListItem>
          </SwipeableList>
        ))}
        <div className={`${classes.header} d-flex justify-content-between`}>
          <Typography variant="subtitle2" color="primary">
            Total
          </Typography>
          <Typography variant="subtitle2" color="primary">
            {`$ ${precioAcumulado}`}
          </Typography>
        </div>
      </div>

      <ModalScreenProducto
        openModal={openProducto.open}
        handleClose={handleClose}
        menuItem={openProducto.menuItem}
      />

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
