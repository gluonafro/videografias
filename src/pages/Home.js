import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useTranslate } from "../contexts/languageContext";
import gsap, { Power2 } from "gsap";
import { useIsMobile } from "../hooks/useMediaQuery";
import Cursor from "../components/Cursor/index";
import LogoRV from "../assets/svg/logoRV.svg";
import LogoMaeuec from "../assets/svg/LogoMaeuec.svg";
import LogoVentana from "../assets/svg/LogoVentana.svg";
import { responsive } from "../resources/constants.json";

const Home = () => {
  const t = useTranslate();
  const Text = useRef(null);
  const Enter = useRef(null);
  const LoadingBar = useRef(null);
  const Wrapper = useRef(null);
  const isMobile = useIsMobile();

  const tl = gsap.timeline({ delay: 0 });

  useEffect(() => {
    if (!isMobile)
      tl.to(Text.current, {
        opacity: 1,
        easeIn: gsap.Power3,
        duration: 1,
        onComplete: () => {
          gsap.set(LoadingBar.current.children[0], { opacity: 1 });
        },
      })
        .fromTo(
          LoadingBar.current.children[0],
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: Power2.easeIn,
            duration: 1.5,
            transformOrigin: "left",
          }
        )
        .to(LoadingBar.current.children[0], {
          scaleX: 0,
          transformOrigin: "right",
          ease: Power2.easeOut,
          duration: 1.5,
          onComplete: () => {
            gsap.set(LoadingBar.current, { css: { display: "none" } });
            gsap.set(Enter.current, { css: { display: "block" } });
          },
        })
        .to(Enter.current, { opacity: 1, duration: 1 });
  });

  const wheelScale = (deltaY) => {
    let delta = 0;
    if (deltaY !== 0) {
      delta = deltaY > 0 ? 0.1 : -0.1;
    }
    gsap.to(Wrapper.current.children, {
      scaleX: 1 + delta,
      scaleY: 1 + delta,
      duration: 1,
    });
  };

  return (
    <>
      <Container onWheel={(e) => wheelScale(e.deltaY)} ref={Wrapper}>
        <Logo>
          <img src={LogoRV} alt="Reactivando Videografías" width="157.8" />
        </Logo>
        <Intro>
          <div ref={Text} style={{ opacity: isMobile ? 1 : 0 }}>
            <p className={isMobile ? "large" : "extraLarge"}>
              {t("textoInicio")}
            </p>
          </div>
          <div className="logos">
            <img src={LogoMaeuec} alt="MAEUEC" />
            <img src={LogoVentana} alt="Programa Ventana" />
          </div>
          {!isMobile && (
            <LoadingLine ref={LoadingBar}>
              <div />
            </LoadingLine>
          )}
          <SLink
            to={"/expo"}
            ref={Enter}
            className={isMobile ? "" : "extraLarge"}
            isMobile={isMobile}
          >
            {t("comenzar")}
          </SLink>
        </Intro>
      </Container>
      <Cursor />
    </>
  );
};

export default Home;

const Container = styled.main`
  height: 100%;
  width: 700px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  text-align: center;
  flex-direction: column;
  @media screen and (min-width: ${responsive.large}px) {
    width: 880px;
  }
  @media screen and (min-width: ${responsive.extraLarge}px) {
    width: 1200px;
  }
  @media screen and (max-width: ${responsive.mobile}px) {
    width: 100%;
  }
`;

const Intro = styled.div`
  margin-top: 15vh;
  .logos {
    img {
      padding: 2rem 1rem;
      :first-child {
        width: 379px;
      }
      :last-child {
        width: 80px;
        margin-bottom: 0.5rem;
      }
      @media screen and (min-width: ${responsive.extraLarge}px) {
        padding: 4rem 1rem;
        :first-child {
          width: 500px;
        }
        :last-child {
          width: 100px;
          margin-bottom: 0.75rem;
        }
      }
    }
    @media screen and (max-width: ${responsive.mobile}px) {
      position: absolute;
      bottom: 2rem;
      display: flex;
      justify-content: space-around;
      width: calc(100% - 1rem);
      img {
        margin: 0;
        height: fit-content;
        :first-child {
          width: 68vw;
        }
        :last-child {
          width: 16vw;
          height: unset;
          margin-bottom: unset;
        }
      }
    }
  }
  @media screen and (max-width: ${responsive.mobile}px) {
    margin: 0 0.5rem;
    > div {
      margin: 2rem 0;
    }
  }
`;

const SLink = styled(Link)`
  margin: 0 auto;
  border: 2px solid #ececec;
  width: fit-content;
  padding: 0rem 4rem;
  height: 4.5vw;
  line-height: 4.5vw;
  margin-top: 13vh;
  opacity: 0;
  display: none;
  :hover {
    border-color: #fff;
    text-decoration: none;
  }
  @media screen and (max-width: ${responsive.mobile}px) {
    font-size: 1.7rem;
    width: 12rem;
    margin-top: 0;
    display: block;
    opacity: 1;
    padding: 0.5rem 3rem;
  }
`;

const Logo = styled.div`
  position: absolute;
  top: 2.5rem;
  left: calc(50% - 78.9px);
  @media screen and (max-width: ${responsive.mobile}px) {
    left: calc(50% - 56.5px);
    top: 1.5rem;
    img {
      width: 113px;
    }
  }
`;

const LoadingLine = styled.div`
  height: calc(4.5vw + 4px);
  margin-top: 13vh;
  div {
    height: 5px;
    width: 24vw;
    opacity: 0;
    margin: 2.5rem auto;
    background: #ececec;
  }
`;
