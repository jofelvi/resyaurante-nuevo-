import React from "react";

// Material UI
import { makeStyles } from "@material-ui/core";

// Organisms
import { ListaOrdenes } from "../../../components/Organisms";

const styles = makeStyles({
  root: {
    display: "flex",
  },
});

const Menu = () => {
  const classes = styles();

  return (
    <section className={classes.root}>
      <ListaOrdenes />
    </section>
  );
};

export default Menu;
