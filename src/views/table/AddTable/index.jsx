import React from "react";

// Material UI
import { makeStyles } from "@material-ui/core";

//import { useDispatch, useSelector } from "react-redux";
import { FormTable, CategoryFilter } from "./../../../components/Organisms";

const styles = makeStyles({
  root: {
    display: "flex",
  },
});

const AddTable = () => {
  //const dataLogin = useSelector((state) => state.auth);

  const classes = styles();
  const sector = [
    {
      id: 1,
      label: "Terraza",
      value: "Terraza",
    },
    {
      id: 2,
      label: "Patio",
      value: "Patio",
    },
  ];

  return (
    <section className={classes.root}>
      <CategoryFilter data={sector} />
      <FormTable />
    </section>
  );
};

export default AddTable;
