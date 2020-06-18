import React from "react";
import { useSelector } from "react-redux";

// Material UI
import { makeStyles } from "@material-ui/core";

// Organisms
import {
  Calculadora,
  CalculadoraListPedidos,
  TableOrdenPagar,
} from "../../../components/Organisms";

const styles = makeStyles({
  root: {
    display: "flex",
  },
});

const CalculadoraPago = () => {
  const classes = styles();
  const data = useSelector((state) => state.categories.categoriesMenu);

  return (
    <section className={classes.root}>
      <TableOrdenPagar />
      <Calculadora />
      <CalculadoraListPedidos data={data} posicion={true} icons={true} />
    </section>
  );
};

export default CalculadoraPago;
