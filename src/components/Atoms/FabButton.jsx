import React from "react";

// Material UI
import { makeStyles, Fab } from "@material-ui/core";

// Icons
import { Add } from "@material-ui/icons";

import DropdownMenu from "./DropdownMenuPedidos";

const styles = makeStyles((theme) => ({
  root: {
    position: "fixed",
    bottom: 0,
    right: 0,
    margin: 24,
  },
  options: {
    position: "absolute",
    right: -3,
    top: -3,
    margin: theme.spacing(2),
  },
}));

const FabButton = ({ color, label, addmenu, addOrden, pedido, estatico }) => {
  const classes = styles();

  return (
    <Fab
      color={color}
      aria-label={label}
      className={classes.root}
      onClick={() => {
        if (!pedido) {
          if (addmenu) {
            addmenu();
          } else if (addOrden) {
            addOrden();
          }
        }
      }}
    >
      {pedido ? (
        <DropdownMenu
          // edit={edit}
          // eliminarProducts={eliminarProducts}
          // products={products}
          // label="Opciones"
          className={classes.options}
          estatico={estatico}
          options={[
            {
              label: "Menu",
            },
            {
              label: "Personalizado",
            },
          ]}
        />
      ) : (
        <Add />
      )}
    </Fab>
  );
};

export default FabButton;
