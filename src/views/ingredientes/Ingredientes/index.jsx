import React from "react";
import { useSelector } from "react-redux";
// Material UI
import { makeStyles } from "@material-ui/core";

// Organisms
import {
  FormIngredientes,
  CategoryFilter,
} from "../../../components/Organisms";

const styles = makeStyles({
  root: {
    display: "flex",
  },
});

const Ingredientes = () => {
  const classes = styles();
  const data = useSelector((state) => state.categories.categories);

  return (
    <section className={classes.root}>
      <CategoryFilter data={data} posicion={true} />
      <FormIngredientes />
    </section>
  );
};

export default Ingredientes;
