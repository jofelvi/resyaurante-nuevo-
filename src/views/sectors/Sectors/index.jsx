import React from "react";

// Material UI
import { makeStyles } from "@material-ui/core";

// Organisms
import { SectorList } from "../../../components/Organisms";

import { useDispatch, useSelector } from "react-redux";

import styles from "./styles";

const AllSectors = () => {
  const classes = styles();

  return (
    <section className={classes.root}>
      <SectorList />
    </section>
  );
};

export default AllSectors;
