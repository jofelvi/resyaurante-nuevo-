import React from "react";

// Material UI
import { Card, CardContent, Typography, makeStyles } from "@material-ui/core";

import styles from "./styles";

const ProductCardViewColumn = ({ products }) => {
  const rand1 = Math.ceil(Math.random() * 200);
  const rand2 = Math.ceil(Math.random() * 200);
  const rand3 = Math.ceil(Math.random() * 200);
  const useStyles = makeStyles((theme) => ({
    contentColumn: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      height: 120,
      justifyContent: "center",
      backgroundColor: `rgba(${rand1}, ${rand2}, ${rand3}, 1)`,
    },
  }));
  const classes = styles();
  const classes2 = useStyles();
  return (
    <Card>
      <CardContent className={classes2.contentColumn}>
        <Typography variant="body1" className={classes.title}>
          {products.nombre} avatar
        </Typography>
        <Typography
          variant="subtitle1"
          color="textSecondary"
          // paragraphs
          className={classes.priceColumnRight}
        >
          {`$ ${products.precioUnitario ? products.precioUnitario : products.precio}`}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ProductCardViewColumn;
