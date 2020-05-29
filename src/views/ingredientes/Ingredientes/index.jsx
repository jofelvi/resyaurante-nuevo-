import React from "react";
// Material UI
import { makeStyles } from "@material-ui/core";

// Organisms
import { FormIngredientes } from "../../../components/Organisms";

const styles = makeStyles({
  root: {
    display: "flex",
  },
});

const Ingredientes = () => {
  const classes = styles();

  return (
    <section className={classes.root}>
      <FormIngredientes />
    </section>
  );
};

export default Ingredientes;
