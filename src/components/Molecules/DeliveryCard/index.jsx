import React from 'react';

// Material UI
import { Card, CardContent, Avatar, Typography } from '@material-ui/core';

// Atoms
import { DropdownMenu } from '../../../components/Atoms';

import DeliveryIcon from '../../../assets/icons/scooter.svg';

import styles from './styles';

const DeliveryCard = () => {
  const classes = styles();
  return (
    <Card>
      <CardContent className={classes.content}>
        <Typography
          variant="subtitle2"
          color="textPrimary"
          className={classes.price}>
          Disponible
        </Typography>
        <DropdownMenu
          label="Opciones"
          className={classes.options}
          options={[
            {
              label: 'Ver'
            },
            {
              label: 'Editar'
            },
            {
              label: 'Eliminar'
            }
          ]}
        />
        <Avatar className={classes.avatar}>
          <img src={DeliveryIcon} alt="img" width={48} height={48} />
        </Avatar>
        <div className={classes.textContent}>
          <Typography
            variant="body1"
            color="textPrimary"
            align="left"
            className={classes.title}>
            Tómas Augusto López Pérez
          </Typography>
          <Typography
            variant="subtitle1"
            color="textSecondary"
            align="left"
            paragraph
            className={classes.description}>
            Parqueado
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
};

export default DeliveryCard;
