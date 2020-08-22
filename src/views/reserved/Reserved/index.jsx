import React from "react";

// Organisms
import { ReservedList } from "../../../components/Organisms";

import styles from "./styles";

const AllReserved = () => {
  const classes = styles();

  return (
    <section className={classes.root}>
      <ReservedList />
    </section>
  );
};

export default AllReserved;
