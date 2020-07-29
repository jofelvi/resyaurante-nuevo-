import React from 'react';

// Material UI
import { makeStyles } from '@material-ui/core';

// Organisms
import { DeliveryList, CategoryFilter } from '../../../components/Organisms';

const styles = makeStyles({
  root: {
    display: 'flex'
  }
});

const AllDeliverys = () => {
  const classes = styles();
  const data = [
    {
      label: 'Disponible',
      quantity: 2
    },
    {
      label: 'En camino',
      quantity: 5
    },
    {
      label: 'Retornando',
      quantity: 1
    }
  ];

  return (
    <section className={classes.root}>
      <CategoryFilter data={data} />
      <DeliveryList />
    </section>
  );
};

export default AllDeliverys;
