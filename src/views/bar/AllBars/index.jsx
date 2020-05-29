import React from 'react';

// Material UI
import { makeStyles } from '@material-ui/core';

// Organisms
import { BarList, CategoryFilter } from '../../../components/Organisms';

const styles = makeStyles({
  root: {
    display: 'flex'
  }
});

const AllBars = () => {
  const classes = styles();
  const data = [
    {
      label: 'Centro',
      quantity: 1
    }
  ];

  return (
    <section className={classes.root}>
      <CategoryFilter data={data} />
      <BarList />
    </section>
  );
};

export default AllBars;
