import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Languages from "../components/Languages";
import { useTranslate } from "../contexts/languageContext";
import Muted from "../assets/img/Sound-Muted.png";
import Unmuted from "../assets/img/Sound-Unmuted.png";
import { useIsMobile } from "../hooks/useMediaQuery";
import Close from "../assets/img/Close.png";

const Header = ({ match, ...props }) => {
  const { muted, setMuted } = props;
  const t = useTranslate();
  const isMobile = useIsMobile();

  const [showNav, setShowNav] = useState(false);

  return !isMobile ? (
    <SHeader className="small">
      <nav>
        <ul>
          <li className="logo">
            <Link to="/expo">
              reactivando<span className="bold">Videografías</span>
            </Link>
          </li>
          <li className={match.path === "/expo" ? "active" : ""}>
            <Link to="/expo">{t("galeria")}</Link>
          </li>
          <li className={match.path === "/comisarios" ? "active" : ""}>
            <Link to="/comisarios">{t("comisarios")}</Link>
          </li>
          <li className={match.path === "/info" ? "active" : ""}>
            <Link to="/info">{t("informacion")}</Link>
          </li>
        </ul>
      </nav>
      <Buttons>
        {match && match.url === "/expo" && (
          <button className="sound" onClick={() => setMuted(!muted)}>
            <img src={muted ? Muted : Unmuted} />
          </button>
        )}
        <Languages className="marginLangs" />
      </Buttons>
    </SHeader>
  ) : (
    <SHeaderMobile>
      {showNav ? (
        <WrapperMobile>
          <NavMobile>
            <div className="list">
              <div>
                reactivando<span className="bold">Videografías</span>
              </div>
              <nav>
                <ul>
                  <li className={match.path === "/expo" ? "active" : ""}>
                    <Link to="/expo">{t("galeria")}</Link>
                  </li>
                  <li className={match.path === "/comisarios" ? "active" : ""}>
                    <Link to="/comisarios">{t("comisarios")}</Link>
                  </li>
                  <li className={match.path === "/info" ? "active" : ""}>
                    <Link to="/info">{t("informacion")}</Link>
                  </li>
                </ul>
              </nav>
              <Languages />
            </div>
            <div>
              <button onClick={() => setShowNav(false)}>
                <img src={Close} />
              </button>
            </div>
          </NavMobile>
        </WrapperMobile>
      ) : (
        <div className="logo" onClick={() => setShowNav(true)}>
          reactivando<span className="bold">Videografías</span>
        </div>
      )}
    </SHeaderMobile>
  );
};

export default Header;

const SHeader = styled.header`
  height: 6rem;
  z-index: 2;
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
  .marginLangs {
    margin-right: 2rem;
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

const SHeaderMobile = styled.header`
  height: 5rem;
  z-index: 1;
  position: fixed;
  top: 0;
  width: 100%;
  .logo {
    margin-left: 0.8rem;
    line-height: 5rem;
  }
`;

const WrapperMobile = styled.section`
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
`;

const NavMobile = styled.div`
  position: relative;
  width: 100%;
  min-height: 100%;
  top: 0;
  bottom: 0;
  background: #000;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  text-align: center;
  z-index: 1;
  .list {
    line-height: 4rem;
  }
`;
