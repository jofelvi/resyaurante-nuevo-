import React from "react";

// Material UI
import { Card, CardContent, Avatar, Typography } from "@material-ui/core";

// Atoms
import { DropdownMenu } from "../../../../components/Atoms";

import styles from "./styles";

const ProductCardViewList = ({ products }) => {
  const classes = styles();
  return (
    <Card className={classes.marginxy}>
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
              {products.nombre}
            </Typography>
            <Typography
              variant="subtitle1"
              color="textSecondary"
              align="left"
              className={classes.descriptionList}
            >
              Comida rapida
            </Typography>
          </div>
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
        </div>
        <Typography
          variant="subtitle2"
          color="textPrimary"
          className={classes.priceList}
        >
          {`$ ${products.sm}`}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ProductCardViewList;
