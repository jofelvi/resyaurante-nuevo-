import React from 'react';

// Material UI
import {
  Grid,
  AppBar,
  Toolbar,
  Typography
  // IconButton
} from '@material-ui/core';

// Atoms
import { FabButton } from '../../Atoms';

// Molecules
import { DeliveryCard } from '../../Molecules';

import styles from './styles';

const DeliveryList = () => {
  const classes = styles();

  let gridSize = {
    xs: 12,
    sm: 6,
    md: 6,
    lg: 6,
    xl: 4
  };

  const data = ['a', 'a', 'a', 'a', 'a'];

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <AppBar position="static" color="inherit">
          <Toolbar className={classes.toolbar}>
            <Typography variant="subtitle2" color="primary">
              DELIVERYS
            </Typography>
          </Toolbar>
        </AppBar>
      </Grid>
      {data.map((data, index) => (
        <Grid item {...gridSize} key={index}>
          <DeliveryCard />
        </Grid>
      ))}
      <FabButton color="primary" label="addTable" />
    </Grid>
  );
};

export default DeliveryList;
