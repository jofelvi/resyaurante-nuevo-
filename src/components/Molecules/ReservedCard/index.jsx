import React from "react";

// Material UI
import { Card, CardContent, Avatar, Typography } from "@material-ui/core";

// Atoms
import { DropdownMenu } from "../../../components/Atoms";

import ReservedIcon from "../../../assets/icons/reservado.svg";

import styles from "./styles";

const ReservedCard = ({ item, deleteReserved, editReserved }) => {
  const classes = styles();
  return (
    <Card>
      <CardContent className={classes.content}>
        <Typography variant="subtitle2" color="textPrimary" className={classes.price}>
          {item.diners} Comensales
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
          eliminarProducts={() => deleteReserved(item)}
          edit={() => editReserved(item)}
        />
        <Typography variant="body1" color="textPrimary" align="left" className={classes.title}>
          <b>COD RESERVA:</b> {item.codeReserved}
        </Typography>
        <Avatar className={classes.avatar}>
          <img src={ReservedIcon} alt="img" width={60} height={60} />
        </Avatar>
        <Typography variant="body1" color="textPrimary" align="left" className={classes.title}>
          <b>Sector:</b> {item.sector}
        </Typography>
        <Typography variant="body1" color="textPrimary" align="left" className={classes.title}>
          <b>Mesa:</b> {item.numberTable}
        </Typography>
        <Typography variant="body1" color="textPrimary" align="left" className={classes.title}>
          <b>Fecha:</b> {item.dateReserved}
        </Typography>
        <Typography variant="body1" color="textPrimary" align="left" className={classes.title}>
          <b>Desde:</b> {item.timeInit} <b>hasta:</b> {item.timeEnd}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ReservedCard;
