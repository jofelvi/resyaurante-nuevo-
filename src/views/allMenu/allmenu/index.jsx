import React from "react";

// Material UI
import { makeStyles } from "@material-ui/core";

// Organisms
import { AllMenu } from "../../../components/Organisms";

const styles = makeStyles({
  root: {
    display: "flex",
  },
});

const Menu = () => {
  const classes = styles();

  return (
    <section className={classes.root}>
      <AllMenu />
    </section>
  );
};

export default Menu;
