import React from "react";
import { useSelector } from "react-redux";

// Material UI
import {
  AppBar,
  Toolbar,
  Breadcrumbs,
  Link,
  Typography,
} from "@material-ui/core";

import styles from "./styles";

const Breadcrumb = (props) => {
  const costosAddCuenta = useSelector(
    (state) => state.addcuenta.productsCuenta
  );
  const classes = styles();
  return (
    <AppBar position="static" color="inherit" className={classes.root}>
      <Toolbar className={classes.toolbar}>
        <Typography variant="subtitle2" color="primary">
          FOOD
        </Typography>
        <Breadcrumbs aria-label="Breadcrumb">
          <Typography variant="subtitle2" color="textSecondary">
            {`${costosAddCuenta} $`}
          </Typography>
          <Link color="inherit" href="#" onClick={() => console.log("click")}>
            <Typography variant="subtitle2" color="textSecondary">
              Home
            </Typography>
          </Link>
          <Typography variant="subtitle2" color="primary">
            Food
          </Typography>
        </Breadcrumbs>
      </Toolbar>
    </AppBar>
  );
};

export default Breadcrumb;
