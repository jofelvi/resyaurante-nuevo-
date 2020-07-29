// Material UI
import { makeStyles } from '@material-ui/core';

export default makeStyles(theme => ({
  root: {
    marginBottom: theme.spacing(4)
  },
  toolbar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    minHeight: 56
  },
  title: {
    fontWeight: 600
  }
}));
