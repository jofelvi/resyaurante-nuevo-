import React from "react";
import { useSelector } from "react-redux";

// Material UI
import { makeStyles } from "@material-ui/core";

// Organisms
import {
  CategoryFilterMenu,
  ListaOrdenes,
} from "../../../components/Organisms";

const styles = makeStyles({
  root: {
    display: "flex",
  },
});

const Menu = () => {
  const classes = styles();
  const data = useSelector((state) => state.categories.categoriesMenu);

  return (
    <section className={classes.root}>
      {/* <CategoryFilterMenu data={data} posicion={true} icons={true} /> */}
      <ListaOrdenes />
    </section>
  );
};

export default Menu;
