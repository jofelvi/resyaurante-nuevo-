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

const FabButton = ({ color, label, addmenu, addOrden }) => {
  const classes = styles();

  return (
    <Fab
      color={color}
      aria-label={label}
      className={classes.root}
      onClick={() => {
        if (addmenu) {
          addmenu();
        } else if (addOrden) {
          addOrden();
        }
      }}
    >
      <Add />
    </Fab>
  );
};

export default FabButton;
