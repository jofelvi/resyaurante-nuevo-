import React from 'react';

// Material UI
import { makeStyles } from '@material-ui/core';

// Organisms
import { KitchenList, CategoryFilter } from '../../../components/Organisms';

const styles = makeStyles({
  root: {
    display: 'flex'
  }
});

const AllKitchens = () => {
  const classes = styles();
  const data = [
    {
      label: 'Patio',
      quantity: 2
    }
  ];

  return (
    <section className={classes.root}>
      <CategoryFilter data={data} />
      <KitchenList />
    </section>
  );
};

export default AllKitchens;
