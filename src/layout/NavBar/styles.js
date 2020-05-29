// Material UI
import { makeStyles } from '@material-ui/core';

export default makeStyles(theme => ({
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none'
    }
  },
  menu: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  user: {
    display: 'flex',
    alignItems: 'center',
    '&:hover': {
      backgroundColor: 'transparent'
    }
  },
  username: {
    display: 'flex',
    alignItems: 'center',
    fontWeight: 700
  },
  avatar: {
    margin: 4,
    border: `2px solid ${theme.palette.primary.main}`
  },
  arrow: {
    fontSize: 20
  },
  icon: {
    marginRight: theme.spacing(4),
    color: theme.palette.primary.main
  }
}));
