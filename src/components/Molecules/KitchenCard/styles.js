// Material UI
import { makeStyles } from '@material-ui/core';

export default makeStyles(theme => ({
  // Row
  content: {
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    paddingTop: theme.spacing(10),
    paddingRight: 56
  },
  price: {
    position: 'absolute',
    top: 0,
    left: -5,
    backgroundColor: theme.palette.success.main,
    borderRadius: '0 20px 20px 0',
    padding: '5px 12px',
    color: '#fff',
    fontSize: 12
  },
  options: {
    position: 'absolute',
    right: 0,
    top: 0,
    margin: theme.spacing(2)
  },
  avatar: {
    width: 80,
    height: 80
  },
  textContent: {
    marginLeft: theme.spacing(4),
    marginTop: theme.spacing(2)
  },
  title: {
    marginBottom: theme.spacing(2)
  },
  description: {
    fontSize: 14
  },
  button: {
    borderRadius: 20
  }
}));
