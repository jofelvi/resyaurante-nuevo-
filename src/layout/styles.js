// Material UI
import { makeStyles } from '@material-ui/core';

export default makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  main: {
    [theme.breakpoints.up('sm')]: {
      marginTop: 64
      // height: 'calc(100vh - 64px)'
    },
    marginTop: 56,
    flexGrow: 1,
    padding: theme.spacing(4)
    // height: 'calc(100vh - 56px)'
  }
}));
