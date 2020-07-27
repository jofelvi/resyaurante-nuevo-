import React from "react";

// Material UI
import { makeStyles } from "@material-ui/core";

// Organisms
import { TableList, CategoryFilter } from "../../../components/Organisms";

import { useDispatch, useSelector } from "react-redux";

const styles = makeStyles({
  root: {
    display: "flex",
  },
});

const AllTables = () => {
  const dataLogin = useSelector((state) => state.auth);

  const classes = styles();
  const data = [
    {
      label: "Terraza",
      quantity: 12,
    },
    {
      label: "Patio",
      quantity: 8,
    },
  ];

  return (
    <section className={classes.root}>
      <CategoryFilter data={data} />
      <TableList />
    </section>
  );
};

export default AllTables;
