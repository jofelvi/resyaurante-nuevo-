// Material UI
import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  drawer: {
    [theme.breakpoints.up("md")]: {
      width: 250,
      flexShrink: 0,
    },
  },
  drawerPaper: {
    width: theme.drawer.width,
    border: "none",
  },
  drawerPaperDesktop: {
    [theme.breakpoints.up("sm")]: {
      marginTop: 64 + theme.spacing(4),
    },
    width: theme.drawer.width,
    border: "none",
  },
  nav: {
    padding: 10,
  },
  iconShow: {
    color: theme.palette.text.secondary,
    display: "block",
  },
  iconHidden: {
    display: "none",
  },
  itemText: {
    color: theme.palette.text.secondary,
    fontWeight: 700,
  },
  itemSelectedText: {
    fontWeight: 700,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));
