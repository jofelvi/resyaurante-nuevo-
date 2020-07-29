// Material UI
import { makeStyles } from '@material-ui/core';

export default makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  leftContent: {
    width: 300,
    [theme.breakpoints.up('xs')]: {
      marginRight: theme.spacing(2)
    }
  },
  filterHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    borderBottom: `1px solid ${theme.palette.background.default}`,
    padding: theme.spacing(4)
  },
  filterReset: {
    color: theme.palette.success.main,
    padding: 0,
    '&:hover': {
      // cursor: 'pointer',
      backgroundColor: 'transparent'
    }
  }
}));
