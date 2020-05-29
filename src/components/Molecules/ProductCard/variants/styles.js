// Material UI
import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  // List
  contentList: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    position: "relative",
    padding: theme.spacing(4),
    paddingRight: theme.spacing(15),
    paddingBottom: `${theme.spacing(4)}px !important`,
  },
  infoContentList: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  priceList: {
    backgroundColor: theme.palette.success.main,
    borderRadius: 20,
    padding: "5px 12px",
    color: "#fff",
    fontSize: 12,
  },
  optionsList: {
    position: "absolute",
    right: 0,
    top: 0,
    margin: theme.spacing(2),
  },
  avatarList: {
    width: 80,
    height: 80,
  },
  descriptionList: {
    fontSize: 14,
  },
  // Row
  contentRow: {
    display: "flex",
    alignItems: "center",
    position: "relative",
    paddingTop: theme.spacing(10),
    paddingBottom: `${theme.spacing(4)}px !important`,
  },
  priceRow: {
    position: "absolute",
    top: 0,
    left: -5,
    backgroundColor: theme.palette.success.main,
    borderRadius: "0 20px 20px 0",
    padding: "5px 12px",
    color: "#fff",
    fontSize: 12,
  },
  avatarRow: {
    width: 100,
    height: 100,
  },
  textContent: {
    marginLeft: theme.spacing(4),
  },
  // Column
  contentColumn: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    paddingTop: theme.spacing(10),
    paddingBottom: `${theme.spacing(2)}px !important`,
  },
  priceColumn: {
    position: "absolute",
    top: 0,
    left: -5,
    backgroundColor: theme.palette.success.main,
    borderRadius: "0 20px 20px 0",
    padding: "5px 12px",
    color: "#fff",
    fontSize: 12,
  },
  avatarColumn: {
    width: 100,
    height: 100,
    marginBottom: theme.spacing(4),
  },
  // Others
  title: {
    marginBottom: theme.spacing(2),
  },
  description: {
    fontSize: 14,
    marginBottom: theme.spacing(6),
  },
  button: {
    borderRadius: 20,
    padding: "5px 30px",
  },
  options: {
    position: "absolute",
    right: 0,
    top: 0,
    margin: theme.spacing(2),
  },
  marginxy: {
    margin: 0,
  },
}));
