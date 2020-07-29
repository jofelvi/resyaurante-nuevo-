// Material UI
import { makeStyles } from '@material-ui/core';

export default makeStyles(theme => ({
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  selectedButton: {
    color: theme.palette.text.secondary
  }
}));
