import React from 'react';

// Material UI
import { Card, CardContent, Avatar, Typography } from '@material-ui/core';

// Atoms
import { DropdownMenu } from '../../../components/Atoms';

import KitchenIcon from '../../../assets/icons/kitchen.svg';

import styles from './styles';

const KitchenCard = () => {
  const classes = styles();
  return (
    <Card>
      <CardContent className={classes.content}>
        <Typography
          variant="subtitle2"
          color="textPrimary"
          className={classes.price}>
          3 Cocineros
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
          <img src={KitchenIcon} alt="img" width={48} height={48} />
        </Avatar>
        <div className={classes.textContent}>
          <Typography
            variant="body1"
            color="textPrimary"
            align="left"
            className={classes.title}>
            Cocina
          </Typography>
          <Typography
            variant="subtitle1"
            color="textSecondary"
            align="left"
            paragraph
            className={classes.description}>
            Patio
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
};

export default KitchenCard;
