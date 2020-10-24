import React from "react";
import GlobalStyles from "./styles/global";
import Format from "./styles/format";
import { ThemeProvider } from "styled-components";
import { HashRouter } from "react-router-dom";
import Router from "./router/Router";
import theme from "./styles/theme";
import { LanguageProvider } from "./contexts/languageContext";
import useLocalStorage from "./hooks/useLocalStorage";

function App() {
  const [password, setPassword] = useLocalStorage("password", "");
  const pass = "paips";
  return (
    <>
      {password === pass ? (
        <ThemeProvider theme={theme}>
          <HashRouter>
            <LanguageProvider>
              <GlobalStyles />
              <Format />
              <Router />
            </LanguageProvider>
          </HashRouter>
        </ThemeProvider>
      ) : (
        <div
          style={{
            position: "absolute",
            left: "calc(50% - 100px)",
            top: "100px",
            width: "200px",
          }}
        >
          <div>Introduce la contraseña</div>
          <textarea
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ height: "15px", marginTop: "10px" }}
            autoFocus
          ></textarea>
        </div>
      )}
    </>
  );
}

export default App;
