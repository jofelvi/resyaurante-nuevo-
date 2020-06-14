import React from "react";

// Material UI
import { CardContent, Typography, makeStyles, Button } from "@material-ui/core";

import styles from "./styles";

const ProductCardViewList = ({ products, openModal }) => {
  const classes = styles();

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
  const classes2 = useStyles();

  return (
    <Button className={classes.marginxy} onClick={() => openModal(products)}>
      <CardContent className={classes2.contentColumn}>
        <div className={classes.infoContentList}>
          <div className={classes.textContent}>
            <Typography
              variant="body1"
              color="textPrimary"
              align="left"
              className={classes.title}
            >
              Pedido {products.id}
            </Typography>
            <Typography
              variant="subtitle1"
              color="textSecondary"
              align="left"
              className={classes.descriptionList}
            >
              Estado: {products.status}
            </Typography>

            <Typography
              variant="subtitle1"
              color="textSecondary"
              align="left"
              className={classes.descriptionList}
            >
              Tiempo: {products.tiempoinicial}
            </Typography>

            <Typography
              variant="subtitle1"
              color="textSecondary"
              align="right"
              className={classes.descriptionList}
            >
              $ {products.precio}
            </Typography>
          </div>
        </div>
      </CardContent>
    </Button>
  );
};

export default ProductCardViewList;
