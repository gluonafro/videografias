import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Languages from "./Languages";
import { useTranslate } from "../contexts/languageContext";

const Header = ({ match, ...props }) => {
  const { muted, setMuted } = props;
  const t = useTranslate();

  return (
    <SHeader>
      <nav>
        <ul>
          <li>reactivandoVideografías</li>
          <li>
            <Link to="/expo">{t("galeria")}</Link>
          </li>
          <li>
            <Link to="/comisarios">{t("comisarios")}</Link>
          </li>
          <li>
            <Link to="/info">{t("informacion")}</Link>
          </li>
        </ul>
      </nav>
      <Buttons>
        {match && match.url === "/expo" && (
          <div>
            <button onClick={() => setMuted(!muted)}>
              {muted ? "Unmute" : "Mute"}
            </button>
          </div>
        )}
        <Languages />
      </Buttons>
    </SHeader>
  );
};

export default Header;

const SHeader = styled.header`
  height: 10vh;
  /* box-shadow: 0 5px 10px 1px; */
  margin-bottom: 30px;
  z-index: 1;
  position: relative;
  nav {
    height: 100%;
    float: left;
    ul {
      height: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
      li {
        margin-left: 2rem;
      }
    }
  }
`;

const Buttons = styled.div`
  display: flex;
  float: right;
  align-items: center;
  height: 100%;
  div {
    margin-right: 3rem;
  }
`;
