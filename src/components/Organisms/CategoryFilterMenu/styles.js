// Material UI
import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  root: {
    // width: "100%",
    width: 100,
    height: "100%",
    [theme.breakpoints.up("xs")]: {
      marginRight: theme.spacing(2),
    },
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    borderBottom: `1px solid ${theme.palette.background.default}`,
    padding: theme.spacing(4),
  },
  headerButtonReset: {
    color: theme.palette.success.main,
    padding: 0,
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  filtersContainer: {
    padding: theme.spacing(4),
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  formControlLabel: {
    width: "100%",
    padding: `0px ${theme.spacing(4)}px`,
  },
  filterOption: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
}));
