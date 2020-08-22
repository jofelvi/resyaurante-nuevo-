import React from "react";

// Material UI
import { makeStyles } from "@material-ui/core";

import { FormReserved } from "./../../../components/Organisms";

const styles = makeStyles({
  root: {
    display: "flex",
  },
});

const AddReserved = () => {
  const classes = styles();

  return (
    <section className={classes.root}>
      <FormReserved />
    </section>
  );
};

export default AddReserved;
