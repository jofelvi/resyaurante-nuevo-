import React from 'react';

// Material UI
import { Card, CardContent, Avatar, Typography } from '@material-ui/core';

// Atoms
import { DropdownMenu } from '../../../components/Atoms';

import TableIcon from '../../../assets/icons/table.svg';

import styles from './styles';

const TableCard = () => {
  const classes = styles();
  return (
    <Card>
      <CardContent className={classes.content}>
        <Typography
          variant="subtitle2"
          color="textPrimary"
          className={classes.price}>
          3 Comensales
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
          <img src={TableIcon} alt="img" width={48} height={48} />
        </Avatar>
        <Typography
          variant="body1"
          color="textPrimary"
          align="left"
          className={classes.title}>
          Mesa 12
        </Typography>
        <Typography
          variant="subtitle1"
          color="textSecondary"
          align="left"
          paragraph
          className={classes.description}>
          Terraza
        </Typography>
      </CardContent>
    </Card>
  );
};

export default TableCard;
