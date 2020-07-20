import React from 'react';
import "./styles/fonts.css";
import GlobalStyles from "./styles/global";
import Format from "./styles/format";
import { ThemeProvider } from "styled-components";
import { HashRouter } from "react-router-dom"
import Router from "./router/Router"
import theme from "./styles/theme";
import { LanguageProvider, useLanguage } from "./contexts/languageContext";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <HashRouter>
        <LanguageProvider>
          <GlobalStyles />
          <Format />
          <Router />
        </LanguageProvider>
      </HashRouter>
    </ThemeProvider>
  );
}

export default App;
