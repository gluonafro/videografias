import React, { useRef, useEffect, useState } from "react";
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
import Animation from "../assets/animations/Anim-Intro.json";
import Lottie from "react-lottie";

const Home = () => {
  const t = useTranslate();
  const Text = useRef(null);
  const Wrapper = useRef(null);
  const Enter = useRef(null);
  const isMobile = useIsMobile();
  const [showEnter, setShowEnter] = useState(false);

  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: Animation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const wheelScale = (deltaY) => {
    let delta = 0;
    if (deltaY !== 0) {
      delta = deltaY > 0 ? 0.1 : -0.1;
    }
    gsap.to(Wrapper.current.children[1], {
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
    <>
      <Container
        onWheel={(e) => wheelScale(e.deltaY)}
        ref={Wrapper}
        style={{ opacity: 0 }}
      >
        <Logo>
          <img src={LogoRV} alt="Reactivando Videografías" width="157.8" />
        </Logo>
        <Intro>
          <div ref={Text}>
            <p className={isMobile ? "large" : "extraLarge"}>
              {t("textoInicio")}
            </p>
          </div>
          <div className="logos">
            <img src={LogoMaeuec} alt="MAEUEC" />
            <img src={LogoVentana} alt="Programa Ventana" />
          </div>
          {showEnter ? (
            <SLink to="/expo" ref={Enter}>
              <Lottie options={defaultOptions} height={"100%"} width={"100%"} />
            </SLink>
          ) : (
            <SLink to=""></SLink>
          )}
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
  height: 60px;
  width: 168px;
  margin-top: 10vh;
  display: block;
  @media screen and (max-width: ${responsive.mobile}px) {
    margin-top: 0;
    display: block;
    height: 40px;
    width: 112px;
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
