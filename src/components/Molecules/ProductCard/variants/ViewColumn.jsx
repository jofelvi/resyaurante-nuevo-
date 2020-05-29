import React from "react";

// Material UI
import { Card, CardContent, Avatar, Typography } from "@material-ui/core";

// Atoms
import { DropdownMenu } from "../../../../components/Atoms";

import styles from "./styles";

const ProductCardViewColumn = ({ products }) => {
  const classes = styles();
  return (
    <Card className={classes.marginxy}>
      <CardContent className={classes.contentColumn}>
        <Typography
          variant="subtitle2"
          color="textPrimary"
          className={classes.priceColumn}
        >
          {`$ ${products.sm}`}
        </Typography>
        <DropdownMenu
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
        />
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
          Comida rapida
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ProductCardViewColumn;