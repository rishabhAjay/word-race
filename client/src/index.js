import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import {
  createTheme,
  ThemeProvider,
  responsiveFontSizes,
} from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
let theme = createTheme();
theme = responsiveFontSizes(theme);
ReactDOM.render(
  <ThemeProvider theme={theme}>
    <div
      style={{
        backgroundImage: "url(/images/rose-petals.svg)",
        width: "100vw",
        height: "100vh",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <CssBaseline />
      <App />
    </div>
  </ThemeProvider>,
  document.getElementById("root")
);
