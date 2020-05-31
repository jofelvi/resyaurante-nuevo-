import React from "react";

// Material UI
import { Card, CardContent, Avatar, Typography } from "@material-ui/core";

// Atoms
import { DropdownMenu } from "../../../../components/Atoms";

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
          {`$ ${products.sm ? products.sm : products.precioUnitario}`}
        </Typography>

        {/* <Typography
          variant="subtitle1"
          color="textSecondary"
          align="left"
          paragraph
          className={classes.description}
        >
          {products.categorie}
        </Typography> */}
        {/* <DropdownMenu
          label="Opciones"
          className={classes.options}
          options={[
            {
              label: "Ver",
            },
            {
              label: "Editar",
            },
            {
              label: "Eliminar",
            },
          ]}
        /> */}
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
