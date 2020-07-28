import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useTranslate } from "../contexts/languageContext";
import Languages from "../components/Languages";
import gsap, { Power2 } from "gsap";
import { useIsMobile } from "../hooks/useMediaQuery";

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
      tl.to(Text.current, 1, {
        opacity: 1,
        easeIn: gsap.Power3,
        onComplete: () => {
          gsap.set(LoadingBar.current.children[0], { opacity: 1 });
        },
      })
        .fromTo(
          LoadingBar.current.children[0],
          1.5,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: Power2.easeIn,
            transformOrigin: "left",
          }
        )
        .to(LoadingBar.current.children[0], 1.5, {
          scaleX: 0,
          transformOrigin: "right",
          ease: Power2.easeOut,
          onComplete: () => {
            gsap.set(LoadingBar.current, { css: { display: "none" } });
            gsap.set(Enter.current, { css: { display: "block" } });
          },
        })
        .to(Enter.current, 1, { opacity: 1 });
  });

  const wheelScale = (deltaY) => {
    let delta = 0;
    if (deltaY !== 0) {
      delta = deltaY > 0 ? 0.1 : -0.1;
    }
    gsap.to(Wrapper.current.children[0], 1, {
      scaleX: 1 + delta,
      scaleY: 1 + delta,
    });
  };

  return (
    <Container onWheel={(e) => wheelScale(e.deltaY)} ref={Wrapper}>
      <div>
        {!isMobile && (
          <>
            <div ref={Text} style={{ opacity: 0 }}>
              <p className="extraLarge">
                reactivando<span className="bold">Videografías</span>{" "}
                {t("textoInicio")}
              </p>
              <p>{t("subtextoInicio")}</p>
            </div>
            <LoadingLine ref={LoadingBar}>
              <div />
            </LoadingLine>
          </>
        )}
        <SLink
          to={"/expo"}
          ref={Enter}
          className={isMobile ? "" : "extraLarge"}
          isMobile={isMobile}
        >
          {t("entrar")}
        </SLink>
      </div>
      <SLanguages />
    </Container>
  );
};

export default Home;

const Container = styled.main`
  height: 100vh;
  width: 68%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  text-align: center;
  flex-direction: column;
  p:first-child {
    padding: 4vh 0;
  }
  p:last-child {
    padding: 2vh 0;
    color: #a9a9a9;
  }
`;

const SLink = styled(Link)`
  margin: 0 auto;
  border: 2px solid #ececec;
  width: 12vw;
  height: 4.5vw;
  line-height: 4.5vw;
  margin-top: 13vh;
  opacity: 0;
  display: none;
  :hover {
    border-color: #fff;
    text-decoration: none;
  }
  ${({ isMobile }) =>
    isMobile &&
    "font-size: 2rem; width: 12rem; height: 6rem; line-height: 6rem; margin-top: 0; display: block; opacity: 1;"}
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

const SLanguages = styled(Languages)`
  position: absolute;
  top: 2rem;
  right: 2rem;
`;
