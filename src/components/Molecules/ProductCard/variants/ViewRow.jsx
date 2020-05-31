import React from "react";

// Material UI
import { Card, CardContent, Avatar, Typography } from "@material-ui/core";

// Atoms
import { DropdownMenu } from "../../../../components/Atoms";

import styles from "./styles";

const ProductCardViewRow = ({ products, edit, eliminarProducts }) => {
  const classes = styles();
  return (
    <Card className={classes.marginxy}>
      <CardContent className={classes.contentRow}>
        <Typography
          variant="subtitle2"
          color="textPrimary"
          className={classes.priceRow}
        >
          {`$ ${products.sm}`}
        </Typography>
        <DropdownMenu
          edit={edit}
          eliminarProducts={eliminarProducts}
          products={products}
          label="Opciones"
          className={classes.options}
          options={[
            {
              label: "Editar",
            },
            {
              label: "Eliminar",
            },
          ]}
        />
        <Avatar className={classes.avatarRow}>
          <img
            src="https://img.icons8.com/color/48/000000/hot-dog.png"
            alt="img"
          />
        </Avatar>
        <div className={classes.textContent}>
          <Typography
            variant="body1"
            color="textPrimary"
            align="left"
            className={classes.title}
          >
            {products.nombre}
          </Typography>
          <Typography
            variant="subtitle1"
            color="textSecondary"
            align="left"
            paragraph
            className={classes.description}
          >
            {products.descripcion ? products.descripcion : products.nombre}
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCardViewRow;
