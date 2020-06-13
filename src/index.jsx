import React from "react";
import { render } from "react-dom";

import { CssBaseline } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import theme from "./config/MUITheme";

// App
import App from "./App";

const APP_CONTAINER = document.getElementById("root");

render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <App />
  </ThemeProvider>,
  APP_CONTAINER
);
