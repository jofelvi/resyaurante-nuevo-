import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import createHash from "hash-generator";
// Material UI
import { Grid } from "@material-ui/core";

import { ModalScreenEstatico, ModalScreenDinamico } from "../../Molecules";

// Molecules

import ProductoCardRow from "../../Molecules/ProductCard/variants/ViewColumn";

import { addProductosCosto } from "../../../store/agregaralaCuenta/actions";

const MenuList = () => {
  const dispatch = useDispatch();
  const costosAddCuenta = useSelector(
    (state) => state.addcuenta.productsCuenta
  );
  const listaProducts = useSelector((state) => state.addcuenta.listaProducts);

  const dataProducts = useSelector((state) => state.addmenu.menufilter);
  const data = Object.keys(dataProducts).map((i) => {
    // console.log(dataProducts[i]);
    dataProducts[i].id = i;

    return dataProducts[i];
  });

  const [tipoPedido, settipoPedido] = useState({
    estatico: true,
    dinamico: false,
  });

  const [openProducto, setopenProducto] = useState({
    open: false,
    menuItem: "",
  });

  const handleClickOpen = (opcion) => {
    settipoPedido({
      estatico: true,
      dinamico: true,
    });
  };

  const handleClose = () => {
    setopenProducto({ ...openProducto, open: false, menuItem: "" });
    settipoPedido({
      estatico: true,
      dinamico: false,
    });
  };
  const openMenuProduct = (menu) => {
    if (menu.products) {
      setopenProducto({
        ...openProducto,
        open: true,
        menuItem: menu,
      });
    } else {
      siguientesProd(menu);
    }
  };

  const siguientesProd = (prod) => {
    const menuNuevo = {
      precioUnitario: prod.precioUnitario ? prod.precioUnitario : prod.precio,
      categories: prod.categories,
      nombre: prod.nombre,
      cantidad: 1,
      id: createHash(12),
    };
    const productoslista = [...listaProducts, menuNuevo];

    dispatch(addProductosCosto(productoslista, costosAddCuenta, menuNuevo));
  };

  let gridSize = {
    xs: 12,
    sm: 6,
    md: 4,
    lg: 3,
    xl: 2,
  };

  return (
    <Grid container spacing={2}>
      <Grid item {...gridSize} onClick={() => handleClickOpen()}>
        <ProductoCardRow
          variant={"column"}
          products={{
            nombre: "Crear tu Bowl",
            precioUnitario: "9,50",
            descripcion: "Crea tu Bowl con los ingredientes que mas gustes",
          }}
        />
      </Grid>
      {data.map((item, index) => (
        <Grid
          item
          {...gridSize}
          key={index}
          onClick={() => (tipoPedido.estatico ? openMenuProduct(item) : "")}
        >
          <ProductoCardRow variant={"column"} products={item} />
        </Grid>
      ))}
      {openProducto.menuItem ? (
        <ModalScreenEstatico
          openModal={openProducto.open}
          handleClose={handleClose}
          menuItem={openProducto.menuItem}
        />
      ) : (
        ""
      )}

      <ModalScreenDinamico
        openModal={tipoPedido.dinamico}
        handleClose={handleClose}
        // mostrandoModal={mostrandoModal}
      />
    </Grid>
  );
};

export default MenuList;
