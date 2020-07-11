import React from "react";

// Material UI
import { makeStyles } from "@material-ui/core";

// Organisms
import { Calculadora, TableOrdenPagar } from "../../../components/Organisms";
import MethodPayment from "../../../components/Molecules/methodPayment";

const styles = makeStyles({
  root: {
    display: "flex",
  },
});

const CalculadoraPago = () => {
  const classes = styles();

  return (
    <section className={classes.root}>
      <TableOrdenPagar />
      <Calculadora />
      <MethodPayment />
    </section>
  );
};

export default CalculadoraPago;
