import React from "react";

import { useSelector } from "react-redux";

// Material UI
import {
  Grid,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Tooltip,
} from "@material-ui/core";

// Icons
import { ViewList, ViewStream, ViewColumn } from "@material-ui/icons";

// Atoms
import { FabButton } from "../../Atoms";

// Molecules
import { ProductCard } from "../../Molecules";

import styles from "./styles";

const ProductList = () => {
  const classes = styles();
  const [viewVariant, setViewVariant] = React.useState("column");

  const dataProducts = useSelector((state) => state.products.products);
  const data = Object.keys(dataProducts).map((i) => {
    dataProducts[i].id = i;
    return dataProducts[i];
  });

  let gridSize = {
    xs: 12,
    sm: 6,
    md: 3,
    lg: 3,
    xl: 2,
  };

  if (viewVariant === "list") {
    gridSize = {
      xs: 12,
      sm: 12,
      md: 12,
      lg: 12,
      xl: 12,
    };
  }
  if (viewVariant === "row") {
    gridSize = {
      xs: 12,
      sm: 6,
      md: 6,
      lg: 6,
      xl: 3,
    };
  }
  if (viewVariant === "column") {
    gridSize = {
      xs: 12,
      sm: 6,
      md: 3,
      lg: 3,
      xl: 2,
    };
  }

  const changeView = (variant) => () => {
    setViewVariant(variant);
  };

  // const data = ["a", "a", "a", "a", "a", "a", "a", "a", "a"];

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <AppBar position="static" color="inherit">
          <Toolbar className={classes.toolbar}>
            <Typography variant="subtitle2" color="primary">
              PRODUCTOS
            </Typography>
            <div>
              <Tooltip title="Lista" aria-label="Lista">
                <IconButton
                  color={viewVariant === "list" ? "primary" : "default"}
                  onClick={changeView("list")}
                >
                  <ViewList />
                </IconButton>
              </Tooltip>
              <Tooltip title="Filas" aria-label="Filas">
                <IconButton
                  color={viewVariant === "row" ? "primary" : "default"}
                  onClick={changeView("row")}
                >
                  <ViewStream />
                </IconButton>
              </Tooltip>
              <Tooltip title="Columnas" aria-label="Columnas">
                <IconButton
                  color={viewVariant === "column" ? "primary" : "default"}
                  onClick={changeView("column")}
                >
                  <ViewColumn />
                </IconButton>
              </Tooltip>
            </div>
          </Toolbar>
        </AppBar>
      </Grid>
      {data.map((item, index) => (
        <Grid item {...gridSize} key={index}>
          <ProductCard variant={viewVariant} products={item} />
        </Grid>
      ))}
      {/* <FabButton color="primary" label="addProduct" /> */}
    </Grid>
  );
};

export default ProductList;
