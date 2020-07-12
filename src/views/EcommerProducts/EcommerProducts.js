import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// Material UI
import { Grid } from "@material-ui/core";

import { editproducts } from "../../store/Products/actions";
import ModalScreenNuevoProd from "../../components/Molecules/ModalScreenNuevoProd/index";

import TableProduct from "../../components/Organisms/FormIngredientes/table";
import {
  editAddMenu,
  filterMenu,
  filterMenuOnline,
} from "../../store/AgregarMenu/actions";
import ProductCardViewColumn from "../../components/Molecules/ProductCard/variants/ViewColumn";

const EcommerProducts = () => {
  const dispatch = useDispatch();
  const dataProducts = useSelector((state) => state.addmenu.menuFilterOnline);
  //const productosIngredientes = useSelector((state) => state.products.products);
  const productosAllmenu = useSelector((state) => state.addmenu.addmenu);
  const productosIngredientes = useSelector((state) => state.products.products);

  const activarFiltro = async () => {};
  useEffect(() => {
    if (productosAllmenu === []) {
      dispatch(filterMenuOnline(productosAllmenu, "online"));
    }
  }, [productosAllmenu]);

  //const dataProducts = useSelector((state) => state.addmenu.menufilter);
  const data = Object.keys(dataProducts).map((i) => {
    // console.log(dataProducts[i]);
    dataProducts[i].id = i;

    return dataProducts[i];
  });

  let gridSize = {
    xs: 12,
    sm: 4,
    md: 3,
    lg: 2,
    xl: 2,
  };

  return (
    <div>
      {data.map((item, index) => (
        <Grid item gridSize={12} key={index}>
          <ProductCardViewColumn variant={"column"} products={item} />
        </Grid>
      ))}
    </div>
  );
};

export default EcommerProducts;
