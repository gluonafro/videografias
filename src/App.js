import React from 'react';
import GlobalStyles from "./styles/global";
import Format from "./styles/format";
import { ThemeProvider } from "styled-components";
import theme from "./styles/theme";
import Home from "./pages/Home"

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Format />
      <Home />
    </ThemeProvider>
  );
}

export default App;
