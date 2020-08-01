import React from "react";

// Material UI
import { CardContent, Typography, makeStyles, Card, Avatar } from "@material-ui/core";

// Atoms
import { DropdownMenu } from "../../../../components/Atoms";

import styles from "./styles";
import uploadImage from "./../../../../assets/icons/frame.svg";

const ProductCardViewRow = ({ products, edit, eliminarProducts }) => {
  const classes = styles();

  const rand1 = Math.ceil(Math.random() * 200);
  const rand2 = Math.ceil(Math.random() * 200);
  const rand3 = Math.ceil(Math.random() * 200);
  const useStyles = makeStyles((theme) => ({
    contentRow: {
      display: "flex",
      alignItems: "center",
      position: "relative",
      paddingTop: theme.spacing(10),
      paddingBottom: `${theme.spacing(4)}px !important`,
      backgroundColor: `rgba(${rand1}, ${rand2}, ${rand3}, 1)`,
    },
  }));

  const classes2 = useStyles();

  return (
    <Card>
      <CardContent className={classes2.contentRow}>
        <Typography variant="subtitle2" color="textPrimary" className={classes.priceRow}>
          {`$ ${products.precioUnitario ? products.precioUnitario : products.precio}`}
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
            src={products.imageUrl ? products.imageUrl : uploadImage}
            className={classes.avatarLarge}
            alt="img"
          />
        </Avatar>
        <div className={classes.textContent}>
          <Typography variant="body1" color="textPrimary" align="left" className={classes.title}>
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
