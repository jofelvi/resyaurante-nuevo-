import React, { useState } from "react";
import {
  SwipeableListItem,
  SwipeableList,
} from "@sandstreamdev/react-swipeable-list";

import "@sandstreamdev/react-swipeable-list/dist/styles.css";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { Payment, EuroSymbol } from "@material-ui/icons";

import { useDispatch, useSelector } from "react-redux";

// Material UI
import { Typography, Button } from "@material-ui/core";
import { eliminarListaProductos } from "../../../store/agregaralaCuenta/actions";
import styles from "./styles";

import ModalScreenProducto from "../../Molecules/ModalScreenProdcuto";

const AllTables = () => {
  const classes = styles();
  const [checked, setChecked] = useState(false);
  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  // const dispatch = useDispatch();
  // let productosAll = useSelector((state) => state.addcuenta.listaProducts);

  // if (!productosAll) {
  //   productosAll = [];
  // }

  // let productosDinamicosPedido = useSelector(
  //   (state) => state.addcuenta.menudinamicoorden
  // );
  // if (!productosDinamicosPedido) {
  //   productosDinamicosPedido = [];
  // }
  const precioPagado = useSelector(
    (state) => state.listaPorPagar.productsPagados
  );
  const precioAcumulado = useSelector(
    (state) => state.listaPorPagar.productsCuenta
  );

  const productosAllPedido = useSelector(
    (state) => state.listaPorPagar.listaProducts
  );

  // const eliminarProductolist = (prod) => {
  //   if (prod.bases) {
  //     const nuevoArrayDinamico = productosDinamicosPedido.filter(
  //       (item) => item.nombre !== prod.nombre
  //     );

  //     const arrayall = [...nuevoArrayDinamico, ...productosAll];

  //     let total = 0;
  //     for (const key in arrayall) {
  //       total += arrayall[key].precioUnitario
  //         ? Number(arrayall[key].precioUnitario)
  //         : 0;
  //       console.log(total);
  //     }

  //     dispatch(
  //       eliminarListaProductos(
  //         productosAll,
  //         nuevoArrayDinamico,
  //         "dinamico",
  //         total
  //       )
  //     );
  //   } else {
  //     const nuevoArray = productosAll.filter(
  //       (item) => item.nombre !== prod.nombre
  //     );

  //     const arrayall = [...nuevoArray, ...productosDinamicosPedido];

  //     let total = 0;
  //     for (const key in arrayall) {
  //       total += Number(arrayall[key].precioUnitario);
  //       console.log(total);
  //     }

  //     dispatch(
  //       eliminarListaProductos(
  //         productosDinamicosPedido,
  //         nuevoArray,
  //         "estatico",
  //         total
  //       )
  //     );
  //   }
  // };

  const [openProducto, setopenProducto] = useState({
    open: false,
    menuItem: "",
  });

  // const handleClose = (prod) => {
  //   if (prod.bases) {
  //     const nuevoArrayDinamico = productosDinamicosPedido.filter(
  //       (item) => item.nombre !== prod.nombre
  //     );
  //     nuevoArrayDinamico.push(prod);

  //     const arrayall = [...nuevoArrayDinamico, ...productosAll];

  //     let total = 0;

  //     for (const key in arrayall) {
  //       let cantidad = arrayall[key].cantidad
  //         ? Number(arrayall[key].cantidad)
  //         : 1;

  //       total += Number(arrayall[key].precioUnitario) * cantidad;
  //       console.log(total);
  //     }

  //     dispatch(
  //       eliminarListaProductos(
  //         productosAll,
  //         nuevoArrayDinamico,
  //         "dinamico",
  //         total
  //       )
  //     );
  //   } else {
  //     const nuevoArray = productosAll.filter(
  //       (item) => item.nombre !== prod.nombre
  //     );
  //     nuevoArray.push(prod);

  //     const arrayall = [...nuevoArray, ...productosDinamicosPedido];

  //     let total = 0;

  //     for (const key in arrayall) {
  //       let cantidad = arrayall[key].cantidad
  //         ? Number(arrayall[key].cantidad)
  //         : 1;

  //       total += Number(arrayall[key].precioUnitario) * cantidad;
  //       console.log(total);
  //     }

  //     dispatch(
  //       eliminarListaProductos(
  //         productosDinamicosPedido,
  //         nuevoArray,
  //         "estatico",
  //         total
  //       )
  //     );
  //   }

  //   setopenProducto({
  //     open: false,
  //   });
  // };

  return (
    <div className={classes.root}>
      <div
        className={`${classes.header} d-flex justify-content-start align-items-center`}
      >
        <Typography variant="subtitle2" color="primary">
          Lista de Productos
        </Typography>
      </div>
      <div>
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
                // action: () => eliminarProductolist(item),
              }}
            >
              <Button
                style={{
                  width: "100%",
                  backgroundColor: "#f5f8fa",
                }}
                className="d-flex justify-content-between py-2"
                // onClick={() => setopenProducto({ menuItem: item, open: true })}
              >
                <Typography variant="body1" color="textPrimary" align="left">
                  {item.cantidad} x {item.nombre}
                </Typography>
                <Typography variant="body1" color="textPrimary" align="left">
                  {item.precioUnitario}
                </Typography>
              </Button>
            </SwipeableListItem>
          </SwipeableList>
        ))}

        <div className="d-flex justify-content-between border-bottom border-top mx-2">
          <div className=" py-2 d-flex flex-column align-items-center">
            <p className="p-0 m-0">Pagado:</p>
            <p className="p-0 m-0 text-success"> {`$ ${precioPagado}`}</p>
          </div>
          <div className=" py-2 d-flex flex-column align-items-center">
            <p className="p-0 m-0">Restante:</p>
            <p className="p-0 m-0 text-danger">{`$ ${precioAcumulado}`}</p>
          </div>
        </div>
        <div
          className={`${classes.header} d-flex justify-content-between border-bottom py-1`}
        >
          <Typography variant="subtitle2" color="primary">
            Total
          </Typography>
          <Typography variant="subtitle2" color="primary">
            {`$ ${precioAcumulado}`}
          </Typography>
        </div>
      </div>

      {/* <ModalScreenProducto
        openModal={openProducto.open}
        handleClose={handleClose}
        menuItem={openProducto.menuItem}
      /> */}
    </div>
  );
};

export default AllTables;
