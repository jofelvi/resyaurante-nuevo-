// Material UI
import { makeStyles } from '@material-ui/core';

export default makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  leftContent: {
    minWidth: 300,
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
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 60,
    position: 'relative'
  },
  price: {
    position: 'absolute',
    top: 0,
    right: 0,
    margin: 20,
    backgroundColor: theme.palette.success.main,
    borderRadius: 20,
    padding: '5px 12px',
    color: '#fff',
    fontSize: 12
  },
  avatar: {
    width: 100,
    height: 100,
    marginBottom: theme.spacing(4)
  },
  title: {
    marginBottom: theme.spacing(2)
  },
  description: {
    fontSize: 14,
    marginBottom: theme.spacing(6)
  },
  button: {
    borderRadius: 20,
    padding: '5px 30px'
  }
}));
