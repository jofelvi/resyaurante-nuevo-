import React from 'react';
import { Link } from 'react-router-dom';

// Material UI
import { Grid, Typography, Button, makeStyles } from '@material-ui/core';

// Assets
import Error404Logo from '../../assets/images/error404.svg';

const styles = makeStyles(theme => ({
  root: {
    display: 'flex',
    margin: '48px 24px'
  },
  title: {
    fontWeight: 700,
    marginBottom: theme.spacing(5)
  },
  subtitle: {
    fontWeight: 400,
    marginBottom: theme.spacing(4)
  },
  imgWrapper: {
    paddingRight: 130
  },
  img: {
    float: 'right',
    width: '100%',
    maxWidth: 430,
    height: 360,
    backgroundImage: `url(${Error404Logo})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '50% 50%',
    backgroundSize: 'contain'
  },
  textWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  }
}));

const Error404 = () => {
  const classes = styles();
  return (
    <section className={classes.root}>
      <Grid container>
        <Grid item sm={7} className={classes.imgWrapper}>
          <div className={classes.img} />
        </Grid>
        <Grid item sm={5} className={classes.textWrapper}>
          <Typography variant="h2" className={classes.title}>
            404
          </Typography>
          <Typography
            variant="h6"
            color="textSecondary"
            className={classes.subtitle}>
            Lo sentimos, la página que has buscando no existe.
          </Typography>
          <div>
            <Button variant="contained" color="primary" component={Link} to="/">
              Ir al inicio
            </Button>
          </div>
        </Grid>
      </Grid>
    </section>
  );
};

export default Error404;
