// Material UI
import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  main: {
    flexGrow: 1,
    paddingRight: theme.spacing(4),
    paddingLeft: theme.spacing(4),
  },
}));
