import React from 'react';

// Material UI
import { Paper, CircularProgress, makeStyles } from '@material-ui/core';

const styles = makeStyles({
  root: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1500
  }
});

const FormSubmitLoader = ({ loading }) => {
  const classes = styles();
  if (loading) {
    return (
      <Paper className={classes.root}>
        <CircularProgress size={64} />
      </Paper>
    );
  }
  return null;
};

export default FormSubmitLoader;
