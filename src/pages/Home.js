import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useTranslate, useLanguage } from "../contexts/languageContext";
import gsap, { Power2 } from "gsap";
import { useIsMobile } from "../hooks/useMediaQuery";
import Cursor from "../components/Cursor/index";
import LogoRV from "../assets/svg/logoRV.svg";
import LogoMaeuec from "../assets/svg/LogoMaeuec.svg";
import LogoVentana from "../assets/svg/LogoVentana.svg";
import { responsive } from "../resources/constants.json";
import Animation from "../assets/animations/Anim-Intro.json";
import AnimationIt from "../assets/animations/Anim-Intro-IT.json";
import Lottie from "react-lottie";

const Home = () => {
  const t = useTranslate();
  const Text = useRef(null);
  const Wrapper = useRef(null);
  const Enter = useRef(null);
  const isMobile = useIsMobile();
  const [showEnter, setShowEnter] = useState(false);
  const lang = useLanguage();

  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: lang === "es" ? Animation : AnimationIt,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const wheelScale = (deltaY) => {
    let delta = 0;
    if (deltaY !== 0) {
      delta = deltaY > 0 ? 0.1 : -0.1;
    }
    gsap.to(Wrapper.current.children[0], {
      scaleX: 1 + delta,
      scaleY: 1 + delta,
      duration: 1,
    });
  };

  const tl = gsap.timeline({ delay: 0 });

  useEffect(() => {
    tl.to(Wrapper.current, {
      opacity: 1,
      ease: Power2.easeIn,
      duration: 1,
      onComplete: () => {
        setShowEnter(true);
      },
    });
  });

  return (
    <div style={{ overflow: "hidden" }}>
      <Container
        onWheel={(e) => wheelScale(e.deltaY)}
        ref={Wrapper}
        style={{ opacity: 0 }}
      >
        <Intro>
          <Logo>
            <img src={LogoRV} alt="Reactivando Videografías" width="157.8" />
          </Logo>
          <div ref={Text}>
            <p className={isMobile ? "large" : "extraLarge"}>
              {t("textoInicio")}
            </p>
            {showEnter ? (
              <SLink to="/expo" ref={Enter}>
                <Lottie
                  options={defaultOptions}
                  height={"100%"}
                  width={"100%"}
                />
              </SLink>
            ) : (
              <SLink to=""></SLink>
            )}
          </div>
          <div>
            <p className="extraSmall">{t("textoInicio2")}</p>
            <div className="logos">
              <img src={LogoMaeuec} alt="MAEUEC" />
              <img src={LogoVentana} alt="Programa Ventana" />
            </div>
          </div>
        </Intro>
      </Container>
      <Cursor />
    </div>
  );
};

export default Home;

const Container = styled.main`
  height: 100%;
  width: 719px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  text-align: center;
  flex-direction: column;
  @media screen and (min-width: ${responsive.large}px) {
    width: 880px;
  }
  @media screen and (max-width: ${responsive.mobile}px) {
    width: 100%;
  }
`;

const Intro = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  height: 100%;
  .logos {
    img {
      padding: 1rem;
      :first-child {
        width: 379px;
      }
      :last-child {
        width: 80px;
        margin-bottom: 0.5rem;
      }
      @media screen and (min-width: ${responsive.extraLarge}px) {
        padding: 1rem;
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
      display: flex;
      justify-content: center;
      width: calc(100% - 1rem);
      margin: 0 auto;
      img {
        margin: 0;
        height: fit-content;
        padding: 0 1rem;
        :first-child {
          width: 68vw;
          max-width: 370px;
        }
        :last-child {
          width: 16vw;
          max-width: 80px;
          height: unset;
          margin-bottom: unset;
        }
      }
    }
  }
  @media screen and (max-width: ${responsive.mobile}px) {
    margin: 0 0.5rem;
  }
`;

const SLink = styled(Link)`
  margin: 0 auto;
  height: 83px;
  width: 226px;
  margin-top: 5vh;
  display: block;
  @media screen and (min-width: ${responsive.extraLarge}px) {
    height: 104px;
    width: 283px;
  }
  @media screen and (max-width: ${responsive.mobile}px) {
    margin-top: 2vh;
    display: block;
    height: 47px;
    width: 128px;
  }
`;

const Logo = styled.div`
  margin-top: 2.5rem;
  @media screen and (max-width: ${responsive.mobile}px) {
    margin-top: 1.5rem;
    img {
      width: 113px;
    }
  }
`;
