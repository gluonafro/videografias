import React, { useState, useRef } from "react";
import styled from "styled-components";
import Header from "../containers/Header";
import { useTranslate } from "../contexts/languageContext";
import { useIsMobile } from "../hooks/useMediaQuery";
import ArrowSmall from "../assets/svg/ArrowSmall";
import ScrollToTop from "../components/ScrollToTop";
import Cursor from "../components/Cursor/index";
import { curators } from "../resources/data.json";
import { responsive } from "../resources/constants.json";
import Mapa from "../containers/Map";

const Info = ({ match }) => {
  const t = useTranslate();
  const isMobile = useIsMobile();

  const Wrap = useRef(null);
  const [isScrolling, setIsScrolling] = useState(false);

  return (
    <>
      <Header match={match} />
      <main style={{ height: "calc(100% - 6rem)" }}>
        <Wrapper ref={Wrap} isMobile={isMobile} setIsScrolling={setIsScrolling}>
          <div
            className={`scrollSection1 ${isMobile ? "large" : "extraLarge"}`}
            dangerouslySetInnerHTML={{ __html: t("textoInfo") }}
          ></div>
          <div
            className={`scrollSection2 large`}
            dangerouslySetInnerHTML={{ __html: t("textoInfo2") }}
          ></div>
          <div
            className={`scrollSection2 large`}
            dangerouslySetInnerHTML={{ __html: t("textoInfo3") }}
          ></div>
          {isMobile ? (
            <div className="scrollSection3 large">
              <div className="bold">{t("redDeCentros")}</div>
              <br />
              <ul>
                {curators.map(
                  (el) =>
                    el.id !== "11" && (
                      <li key={el.id}>
                        <a href={el.link} target="_blank">
                          {el.instAbbr}
                        </a>
                      </li>
                    )
                )}
              </ul>
            </div>
          ) : (
            <div className="mapSection">
              <Mapa />
            </div>
          )}
          <div className="scrollSection4 large">
            <p className="bold">Contacta con nosotros</p>
            <br />
            <p>Real Academia de España en Roma</p>
            <p>Piazza San Pietro in Montorio, 3</p>
            <p>00153 Roma, Italia</p>
            <br />
            <p>Tel. + 39.06.581.28.06</p>
            <p>Fax. +39.06.581.80.49</p>
            <br />
            <p>
              <a href="mailto:info@accademiaspagna.org">
                info@accademiaspagna.org
              </a>
            </p>
          </div>
          {!isScrolling && !isMobile && (
            <div className="useTip small">
              {t("scrollParaMas")} <ArrowSmall width="10px" />
            </div>
          )}
        </Wrapper>
      </main>
      <Cursor />
    </>
  );
};

export default Info;

const Wrapper = React.forwardRef((props, ref) =>
  props.isMobile ? (
    <SWrapperMobile ref={ref}>
      <ScrollToTop />
      {props.children}
    </SWrapperMobile>
  ) : (
    <SWrapper
      ref={ref}
      onWheel={(e) => {
        let container = ref.current;
        let containerScrollPosition = ref.current.scrollLeft;
        let delta = 0;
        if (e.deltaY !== 0) {
          delta = e.deltaY > 0 ? 100 : -100;
        }
        container.scrollTo({
          top: 0,
          left: containerScrollPosition + delta,
          behaviour: "smooth", //if you want smooth scrolling
        });
        props.setIsScrolling(true);
      }}
    >
      {props.children}
    </SWrapper>
  )
);

const SWrapper = styled.section`
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  padding-top: 15vh;
  .scrollSection1 {
    margin: 0 60px;
    p {
      width: 650px;
    }
    @media screen and (min-width: ${responsive.tablet}px) {
      margin: 0 60px 0 180px;
    }
    @media screen and (min-width: ${responsive.large}px) {
      p {
        width: 900px;
      }
    }
    @media screen and (min-width: ${responsive.extraLarge}px) {
      margin-left: 340px;
    }
  }
  .scrollSection2 {
    margin-right: 60px;
    p {
      width: 550px;
    }
    @media screen and (min-width: ${responsive.extraLarge}px) {
      p {
        width: 650px;
      }
    }
  }
  .scrollSection3 {
    margin: 0 180px;
    ul {
      max-height: 50vh;
      width: 700px;
      column-count: 2;
      @media screen and (min-width: ${responsive.extraLarge}px) {
        width: 850px;
      }
    }
  }
  .mapSection {
    width: 700px;
    margin: 0 180px;
    @media screen and (min-width: ${responsive.extraLarge}px) {
      width: 850px;
    }
  }
  .scrollSection4 {
    margin: 0 60px;
    padding-right: 30vw;
    > p {
      width: 50vh;
    }
  }
  .useTip {
    position: absolute;
    bottom: 2vh;
    right: 2vw;
  }
`;

const SWrapperMobile = styled.section`
  display: flex;
  flex-direction: column;
  padding: 15rem 1rem 2rem 1rem;
  font-size: 1.8rem;
  > div {
    margin-bottom: 3rem;
    width: calc(100vw - 2rem);
  }
  .scrollSection3,
  .scrollSection4 {
    margin-top: 7rem;
  }
`;
