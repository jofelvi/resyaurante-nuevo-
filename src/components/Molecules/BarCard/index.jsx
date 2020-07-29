import React from 'react';

// Material UI
import { Card, CardContent, Avatar, Typography } from '@material-ui/core';

// Atoms
import { DropdownMenu } from '../../../components/Atoms';

import BarIcon from '../../../assets/icons/bar.svg';

import styles from './styles';

const BarCard = () => {
  const classes = styles();
  return (
    <Card>
      <CardContent className={classes.content}>
        <Typography
          variant="subtitle2"
          color="textPrimary"
          className={classes.price}>
          1 Cantinero
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
          <img src={BarIcon} alt="img" width={48} height={48} />
        </Avatar>
        <div className={classes.textContent}>
          <Typography
            variant="body1"
            color="textPrimary"
            align="left"
            className={classes.title}>
            Barra Principal
          </Typography>
          <Typography
            variant="subtitle1"
            color="textSecondary"
            align="left"
            paragraph
            className={classes.description}>
            Centro
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
};

export default BarCard;
