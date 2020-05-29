import React from "react";

// Material UI
import { makeStyles } from "@material-ui/core";

// Organisms
import { NewProduct } from "../../../components/Organisms";

const styles = makeStyles({
  root: {
    display: "flex",
  },
});

const FormProduct = () => {
  const classes = styles();

  return (
    <section className={classes.root}>
      <NewProduct />
    </section>
  );
};

export default FormProduct;
