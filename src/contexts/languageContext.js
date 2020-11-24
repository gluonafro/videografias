import React, { useContext, useState } from "react";
import constants from "../resources/constants.json";
import literals from "../resources/literals";
import { useLocation } from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage";
/**
 * Contexto utilizado para manejar literales en toda la aplicación
 */

const LanguageContext = React.createContext();
const SetLanguageContext = React.createContext();
const TranslateContext = React.createContext();

function translate(key, language) {
  return literals[language][key];
  // || `${language}:${key}`;
}

function getLanguage() {
  if (localStorage.lang) {
    return JSON.parse(localStorage.lang);
  }
  return constants.defaultLanguage;
}
export function LanguageProvider({ children }) {
  const location = useLocation();
  const [language, setLanguage] = useState(getLanguage(location));
  const [lang, setLang] = useLocalStorage("lang", constants.defaultLanguage);
  const t = React.useCallback((key) => translate(key, language), [language]);
  const setLanguageAndChangeUrl = React.useCallback(
    (language) => {
      setLang(language);
      setLanguage(language);
      //HashRouter: comentar esta linea
      // navigate(`?lang=${language}`, { replace: "true" });
    },
    [setLanguage]
  );
  return (
    <LanguageContext.Provider value={language}>
      <SetLanguageContext.Provider value={setLanguageAndChangeUrl}>
        <TranslateContext.Provider value={t}>
          {children}
        </TranslateContext.Provider>
      </SetLanguageContext.Provider>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}

export function useSetLanguage() {
  return useContext(SetLanguageContext);
}

export function useTranslate() {
  return useContext(TranslateContext);
}
