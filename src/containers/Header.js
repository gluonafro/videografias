import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Languages from "../components/Languages";
import { useTranslate } from "../contexts/languageContext";
import Muted from "../assets/img/Sound-Muted.png";
import Unmuted from "../assets/img/Sound-Unmuted.png";

const Header = ({ match, ...props }) => {
  const { muted, setMuted } = props;
  const t = useTranslate();

  return (
    <SHeader className="small">
      <nav>
        <ul>
          <li className="logo">
            <Link to="/expo">
              reactivando<strong>Videografías</strong>
            </Link>
          </li>
          <li className={match.path === "/expo" ? "active" : ""}>
            <Link to="/expo">{t("galeria")}</Link>
          </li>
          <li className={match.path === "/comisarios" ? "active" : ""}>
            <Link to="/comisarios">{t("comisarios")}</Link>
          </li>
          <li>
            <Link to="/info" className={match.path === "/info" ? "active" : ""}>
              {t("informacion")}
            </Link>
          </li>
        </ul>
      </nav>
      <Buttons>
        {match && match.url === "/expo" && (
          <button className="sound" onClick={() => setMuted(!muted)}>
            <img src={muted ? Muted : Unmuted} />
          </button>
        )}
        <Languages />
      </Buttons>
    </SHeader>
  );
};

export default Header;

const SHeader = styled.header`
  height: 6rem;
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
        margin-left: 3rem;
      }
      a:hover {
        border-bottom: 1px solid #fff;
      }
      .logo a:hover {
        border-bottom: none;
      }
    }
  }
`;

const Buttons = styled.div`
  display: flex;
  float: right;
  align-items: center;
  height: 100%;
  .sound {
    margin-right: 1rem;
    margin-top: 2px;
    img {
      width: 16px;
    }
  }
`;
