import React from "react";

// Material UI
import { Card, CardContent, Avatar, Typography } from "@material-ui/core";

import styles from "./styles";

const ProductCardViewColumn = ({ products }) => {
  const classes = styles();
  return (
    <Card>
      <CardContent className={classes.contentColumn}>
        <Typography
          variant="subtitle2"
          color="textPrimary"
          className={classes.priceColumn}
        >
          {`$ ${
            products.precioUnitario ? products.precioUnitario : products.precio
          }`}
        </Typography>

        <Avatar className={classes.avatarColumn}>
          <img
            src="https://img.icons8.com/color/48/000000/pizza.png"
            alt="img"
          />
        </Avatar>
        <Typography
          variant="body1"
          color="textPrimary"
          className={classes.title}
        >
          {products.nombre}
        </Typography>
        <Typography
          variant="subtitle1"
          color="textSecondary"
          align="center"
          paragraph
          className={classes.description}
        >
          {products.descripcion ? products.descripcion : products.nombre}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ProductCardViewColumn;
