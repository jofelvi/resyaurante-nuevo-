import React from "react";

// Material UI
import { makeStyles, Fab } from "@material-ui/core";

// Icons
import { Add } from "@material-ui/icons";

const styles = makeStyles({
  root: {
    position: "fixed",
    bottom: 0,
    right: 0,
    margin: 24,
  },
});

const FabButton = ({ color, label }) => {
  const classes = styles();

  return (
    <Fab
      color={color}
      aria-label={label}
      className={classes.root}
      href="/product/new"
    >
      <Add />
    </Fab>
  );
};

export default FabButton;
