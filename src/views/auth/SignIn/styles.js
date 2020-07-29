// Material UI
import { makeStyles } from '@material-ui/core';

import loginBackground from '../../../assets/images/loginBackground.jpeg';

export default makeStyles(theme => ({
  root: {
    [theme.breakpoints.up('sm')]: {
      padding: 32
    },
    height: '100vh',
    width: '100%',
    overflowY: 'auto',
    backgroundImage: `url(${loginBackground})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat'
  },
  paper: {
    position: 'relative',
    [theme.breakpoints.down('xs')]: {
      borderRadius: 0,
      maxWidth: 425
    },
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    maxWidth: 380,
    padding: '32px 32px 24px'
  },
  logo: {
    width: 200
  },
  logoText: {
    marginTop: 16
  },
  title: {
    fontSize: 20,
    fontWeight: 400,
    marginBottom: 32
  },
  input: {
    marginBottom: 16
  },
  button: {
    width: 'calc(100% - 96px)',
    margin: '16px 48px 0'
  },
  options: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  checkboxContainer: {
    marginLeft: -14
  },
  checkbox: {
    width: 48,
    height: 48
  },
  checkboxLabel: {
    fontSize: 14
  },
  otherContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '24px 0'
  },
  otherTitle: {
    margin: '0 8px'
  },
  divider: {
    width: 30
  },
  otherButton: {
    maxWidth: 190,
    marginBottom: 8
  },
  register: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    padding: '32px 0 24px'
  }
}));
