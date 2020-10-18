import React from "react";
import styled from "styled-components";
import {
  useLanguage,
  useSetLanguage,
  useTranslate,
} from "../contexts/languageContext";
import { listaIdiomas } from "../resources/constants.json";

const Idiomas = (props) => {
  const t = useTranslate();
  const setLanguage = useSetLanguage();
  const language = useLanguage();
  return (
    <ul className={props.className}>
      {listaIdiomas.map((x, index) => {
        const active = language === x.k;
        return (
          <li key={x.k} className={active ? "actived" : null}>
            <button
              aria-label={
                // t("a11ySeleccionarIdioma") +
                // " " +
                x.v
                // + (active ? ` ${t("seleccionado")}` : "")
              }
              onClick={() => {
                setLanguage(x.k);
              }}
            >
              <span aria-hidden="true">{x.k}</span>
            </button>
            {/* {index !== listaIdiomas.length - 1 && (
              <span aria-hidden="true" css="font-weight: 400;">
                /
              </span>
            )} */}
          </li>
        );
      })}
    </ul>
  );
};

const SIdiomas = styled(Idiomas)`
  li {
    display: inline;
  }

  && button {
    margin: 0 8px;
    width: auto;
    background-color: transparent;
    text-transform: uppercase;
  }
  && button:first-of-type {
    text-align: right;
  }

  li.actived button span {
    color: #fff;
    border-bottom: 1px solid #fff;
  }

  /* & li.actived button {
    color: #0a4f7f;
  } */

  &.idiomasInicio {
    /* height: 32px; */
    button:hover {
      font-weight: 700;
    }
  }
`;

export default SIdiomas;
