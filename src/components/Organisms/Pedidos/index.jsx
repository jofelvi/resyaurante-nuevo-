import React, { useState } from "react";

import { useSelector, useDispatch } from "react-redux";

// Material UI
import { Grid } from "@material-ui/core";

import { ModalScreenEstatico, ModalScreenDinamico } from "../../Molecules";

// Molecules

import ProductoCardRow from "../../Molecules/ProductCard/variants/ViewColumn";

import { addProductosCosto } from "../../../store/agregaralaCuenta/actions";
import ModalProductosEco from "../../Molecules/ModalProductosEco/ModalProductosEco";

const MenuList = () => {
  const dispatch = useDispatch();
  const costosAddCuenta = useSelector(
    (state) => state.addcuenta.productsCuenta
  );
  const listaProducts = useSelector((state) => state.addcuenta.listaProducts);
  const [abrirModal, setAbrirModal] = useState(false);
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

  const [openModal, setOpenModal] = useState(false);

  const [producModalNew, setProducModalNew] = useState();

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
      setopenProducto(menu);
    } else {
      siguientesProd(menu);
    }
  };

  const closeMenuProduct = (menu) => {
    if (menu.products) {
      setopenProducto(menu);
    } else {
      siguientesProd(menu);
    }
  };

  const handleOpenModalProducNew = (item) => {
    console.log(producModalNew)
    setProducModalNew(item)
    setAbrirModal(true)
  }

  const handlecloseModalProducNew = () => {
    setAbrirModal(false)
  }

  const siguientesProd = (prod) => {
    const menuNuevo = {
      precioUnitario: prod.precioUnitario ? prod.precioUnitario : prod.precio,
      categories: prod.categories,
      nombre: prod.nombre,
      cantidad: 1,
    };
    const productoslista = [...listaProducts, menuNuevo];

    dispatch(addProductosCosto(productoslista, costosAddCuenta, menuNuevo));
  };

  let gridSize = {
    xs: 12,
    sm: 6,
    md: 5,
    lg: 4,
    xl: 4,
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
          onClick={() => (tipoPedido.estatico ? handleOpenModalProducNew(item) : openMenuProduct(item))}
        >
          <ProductoCardRow variant={"column"} products={item} />

        </Grid>
      ))}

      <ModalScreenEstatico
        openModal={openProducto.open}
        handleClose={handleClose}
        menuItem={openProducto.menuItem}
      />,
      <ModalProductosEco
        abierto={abrirModal}
        cerrado={handlecloseModalProducNew}
        menuItem={producModalNew}
      />

      <ModalScreenDinamico
        openModal={tipoPedido.dinamico}
        handleClose={handleClose}
      // mostrandoModal={mostrandoModal}
      />
    </Grid>
  );
};

export default MenuList;
