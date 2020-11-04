import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Languages from "../components/Languages";
import { useTranslate } from "../contexts/languageContext";
import Muted from "../assets/img/Sound-Muted.png";
import Unmuted from "../assets/img/Sound-Unmuted.png";
import { useIsMobile } from "../hooks/useMediaQuery";
import Close from "../assets/img/Close.png";
import { useScrollPosition } from "../hooks/useScrollPosition";
import { TweenMax } from "gsap";
import Logo from "../assets/svg/logoRV.svg";
import Burger from "../assets/svg/hamburger.svg";
import iOS from "../utils/iOS";

const Header = ({ match, ...props }) => {
  const { muted, setMuted } = props;
  const t = useTranslate();
  const isMobile = useIsMobile();
  const isIOS = iOS();

  const [showNav, setShowNav] = useState(false);
  const MobileHeader = useRef(null);

  const isExpo = match.url === "/expo" || match.url === "/expo/";
  const isComisarios =
    match.path === "/comisarios" || match.path === "/comisarios/";
  const isInfo = match.path === "/info" || match.path === "/info/";

  useEffect(() => {
    if (showNav) TweenMax.to(MobileHeader.current, 0, { y: 0 });
  }, [showNav]);

  const hideHeader = (hide) => {
    TweenMax.to(MobileHeader.current, hide ? 0.25 : 0.5, {
      y: hide ? -50 : 0,
    });
  };
  useScrollPosition(({ prevPos, currPos }) => {
    if (
      prevPos.y > currPos.y &&
      currPos.y !== 50 &&
      ((isIOS && Math.abs(currPos.y) > 100) || !isIOS)
    )
      hideHeader(true);
    if (prevPos.y < currPos.y && currPos.y !== 50) hideHeader(false);
  }, []);

  return !isMobile ? (
    <SHeader className="small">
      <nav>
        <ul>
          <li className="logo">
            <Link to="/expo">
              <img src={Logo} alt="Reactivando Videografías" width="120" />
            </Link>
          </li>
          <li className={isExpo ? "active" : ""}>
            <Link to="/expo">{t("galeria")}</Link>
          </li>
          <li className={isComisarios ? "active" : ""}>
            <Link to="/comisarios">{t("comisarios")}</Link>
          </li>
          <li className={isInfo ? "active" : ""}>
            <Link to="/info">{t("informacion")}</Link>
          </li>
        </ul>
      </nav>
      <Buttons>
        {match && isExpo && (
          <button className="sound" onClick={() => setMuted(!muted)}>
            <img src={muted ? Muted : Unmuted} alt="sound" />
          </button>
        )}
        <Languages className="marginLangs" />
      </Buttons>
    </SHeader>
  ) : (
    <SHeaderMobile ref={MobileHeader} isMenu={showNav}>
      {showNav ? (
        <WrapperMobile>
          <NavMobile>
            <div className="list">
              <div>
                <img src={Logo} alt="Reactivando Videografías" width="125" />
              </div>
              <nav>
                <ul>
                  <li className={isExpo ? "active" : ""}>
                    <Link to="/expo">{t("galeria")}</Link>
                  </li>
                  <li className={isComisarios ? "active" : ""}>
                    <Link to="/comisarios">{t("comisarios")}</Link>
                  </li>
                  <li className={isInfo ? "active" : ""}>
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
        <div className="logo">
          <Link to="/expo">
            <img
              src={Logo}
              alt="Reactivando Videografías"
              width="115"
              style={{ display: "block" }}
            />
          </Link>
          <button
            onClick={() => setShowNav(true)}
            style={{
              height: "5rem",
              width: "5rem",
              marginRight: "-1rem",
            }}
          >
            <img src={Burger} alt="Menu" width="20" />
          </button>
        </div>
      )}
    </SHeaderMobile>
  );
};

export default Header;

const SHeader = styled.header`
  height: 6rem;
  z-index: 1;
  position: relative;
  background: #000;
  nav {
    height: 100%;
    float: left;
    ul {
      height: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
      align-items: flex-end;
      li {
        margin-left: 3rem;
        padding-bottom: 1rem;
        img {
          display: block;
        }
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
  align-items: flex-end;
  height: 100%;
  > button,
  ul {
    padding-bottom: 1rem;
  }
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
  z-index: 2;
  position: fixed;
  top: 0;
  width: 100vw;
  background: #000;
  .logo {
    margin: 0 0.8rem;
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: space-between;
  }
  ${({ isMenu }) => isMenu && "height: unset; bottom: 0;"}
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
