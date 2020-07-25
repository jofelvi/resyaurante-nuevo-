import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// Material UI
import { Grid } from "@material-ui/core";
import Button from '@material-ui/core/Button';

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
  const [bandera, setBandera] = useState(true);
  /*
  useEffect(() => {
    if (productosAllmenu.length === 0) {
      
      console.log(productosAllmenu);
      pintar();
    }
  });
*/
  useEffect(() => {
    //Código
    pintar()
  }, []);

  const pintar = () => {
    console.log("toco boton")
    console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++")
    dispatch(filterMenuOnline(productosAllmenu, "online"));
    console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++")

  }
  //const dataProducts = useSelector((state) => state.addmenu.menufilter);
  const data = Object.keys(dataProducts).map((i) => {
    // console.log(dataProducts[i]);
    dataProducts[i].id = i;

    return dataProducts[i];
  });


  return (
    <div>
      <Button onClick={() => pintar()} variant="contained">Default</Button>

      {data.map((item, index) => (
        <Grid item gridSize={12} key={index}>
          <ProductCardViewColumn variant={"column"} products={item} />
        </Grid>
      ))}
    </div>
  );
};

export default EcommerProducts;
