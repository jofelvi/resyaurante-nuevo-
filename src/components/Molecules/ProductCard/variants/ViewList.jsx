import React from "react";

// Material UI
import { Card, CardContent, Avatar, Typography } from "@material-ui/core";

import styles from "./styles";

const ProductCardViewList = ({ products, openModal }) => {
  const classes = styles();

  return (
    <Card className={classes.marginxy} onClick={() => openModal(products)}>
      <CardContent className={classes.contentList}>
        <div className={classes.infoContentList}>
          <Avatar className={classes.avatarList}>
            <img
              src="https://img.icons8.com/color/48/000000/taco.png"
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
              Codigo de pedido {products.id}
            </Typography>
            <Typography
              variant="subtitle1"
              color="textSecondary"
              align="left"
              className={classes.descriptionList}
            >
              Estado: {products.status}
            </Typography>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCardViewList;
