import React from 'react';
import GlobalStyles from "./styles/global";
import Format from "./styles/format";
import { ThemeProvider } from "styled-components";
import { HashRouter} from "react-router-dom"
import Router from "./router/Router"
import theme from "./styles/theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <HashRouter>
        <GlobalStyles />
        <Format />
        <Router />
      </HashRouter>
    </ThemeProvider>
  );
}

export default App;
