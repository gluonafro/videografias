import React, { useState, useRef } from "react";
import styled from "styled-components";
import Header from "../containers/Header";
import Main from "../components/HorizontalMain";
import { useTranslate } from "../contexts/languageContext";
import { useIsMobile } from "../hooks/useMediaQuery";
import ArrowSmall from "../assets/svg/ArrowSmall";
import ArrowCircle from "../assets/svg/ArrowCircle";
import ScrollToTop from "../components/ScrollToTop";
import Cursor from "../components/Cursor/index";
import centros from "../resources/centros.json";
import { responsive } from "../resources/constants.json";
import Mapa from "../containers/Map";
import { Transition, TransitionGroup } from "react-transition-group";
import { TweenMax } from "gsap";
import { vip } from "../resources/data.json";
import LongText from "../components/LongText";

const Info = ({ match }) => {
  const t = useTranslate();
  const isMobile = useIsMobile();

  const Wrap = useRef(null);
  const TextPage = useRef(null);
  const GoBackButton = useRef(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const [transition, setTransition] = useState(true);
  const [currVip, setCurrVip] = useState({});

  const enterInfo = () => {
    window.scrollTo(0, 0);
    let container = Wrap.current;
    let containerScrollPosition = Wrap.current.scrollLeft;
    if (!isMobile) {
      container.scrollTo({
        top: 0,
        left: containerScrollPosition + 2000,
        behaviour: "smooth", //if you want smooth scrolling
      });
      Wrap.current.scrollTo(0, 0);
    }
    TweenMax.fromTo(
      Wrap.current,
      0.5,
      { x: "-20vw", opacity: 0 },
      { x: 0, opacity: 1 }
    );
    setIsScrolling(true);
  };

  const exitInfo = () => {
    TweenMax.fromTo(
      Wrap.current,
      0.25,
      { x: 0, opacity: 1 },
      { x: "-40vw", opacity: 0 }
    );
  };
  const enterText = () => {
    window.scrollTo(0, 0);
    TweenMax.fromTo(
      TextPage.current,
      0.4,
      { x: 400, y: 0, opacity: 0 },
      { x: 0, y: 0, opacity: 1 }
    );
    TweenMax.fromTo(
      GoBackButton.current,
      0.4,
      { x: 400, y: 0, opacity: 0 },
      { x: 0, y: 0, opacity: 1 }
    );
  };
  const exitText = () => {
    TweenMax.fromTo(
      TextPage.current,
      0.3,
      { x: 0, opacity: 1 },
      { x: isMobile ? "50vw" : "30vw", opacity: 0 }
    );
    TweenMax.fromTo(
      GoBackButton.current,
      0.3,
      { x: 0 },
      { x: isMobile ? "50vw" : "30vw" }
    );
  };

  return (
    <>
      <Header match={match} />
      <Main>
        <TransitionGroup component={null}>
          {transition && (
            <Transition onEnter={() => enterInfo()} timeout={500}>
              <Wrapper
                ref={Wrap}
                isMobile={isMobile}
                setIsScrolling={setIsScrolling}
              >
                <div
                  className="scrollSection1 extraLarge"
                  dangerouslySetInnerHTML={{ __html: t("textoInfo") }}
                ></div>
                {vip.map((el) => (
                  <div className="scrollSection2 large" key={el.id}>
                    <p className="bold">{el.name}</p>
                    <p className="grey">{el.institution}</p>
                    <br />
                    <p>{t(el.text + "Short")}</p>
                    <br />
                    <button
                      onClick={() => {
                        exitInfo();
                        setTimeout(() => {
                          setTransition(false);
                        }, 300);
                        setCurrVip(el);
                      }}
                    >
                      <span style={{ borderBottom: "1px solid #ececec" }}>
                        {t("continuarLeyendo")}
                      </span>
                    </button>
                  </div>
                ))}
                <div className="scrollSection2 large">
                  <p>{t("creditosIntro")}</p>
                  <br />
                  <button
                    onClick={() => {
                      exitInfo();
                      setTimeout(() => {
                        setTransition(false);
                      }, 300);
                      setCurrVip({ name: "Créditos", text: "creditos" });
                    }}
                  >
                    <span style={{ borderBottom: "1px solid #ececec" }}>
                      {t("showCreditos")}
                    </span>
                  </button>
                </div>
                {isMobile ? (
                  <div className="scrollSection3 large">
                    <div className="bold">{t("redDeCentros")}</div>
                    <br />
                    <ul>
                      {centros.map((el) => (
                        <li key={el.name}>
                          <a
                            href={el.link}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {el.instAbbr}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <div className="mapSection">
                    <Mapa />
                  </div>
                )}
                <div className="scrollSection4 large">
                  <p className="bold">{t("contacta")}</p>
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
            </Transition>
          )}
          {!transition && (
            <Transition onEnter={() => enterText()} timeout={500}>
              <>
                <LongText ref={TextPage} men={currVip} t={t} />
                <SBackButton
                  onClick={() => {
                    setTimeout(() => {
                      setTransition(true);
                    }, 300);
                    exitText();
                  }}
                  ref={GoBackButton}
                >
                  <ArrowCircle />
                </SBackButton>
              </>
            </Transition>
          )}
        </TransitionGroup>
      </Main>
      <Cursor state={transition} />
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
  padding-top: calc(15vh + 6rem);
  height: calc(100% - 15vh - 6rem);
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
    /* height: calc(100% - 15vh - 6rem); */
    height: 300px;
    margin: 0 180px 0 60px;
    @media screen and (min-width: ${responsive.extraLarge}px) {
      width: 850px;
      height: 500px;
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
  > div:first-child {
    margin-bottom: 10rem;
  }
  > div {
    margin-bottom: 5rem;
    width: calc(100vw - 2rem);
  }
  .scrollSection3,
  .scrollSection4 {
    margin-top: 7rem;
  }
`;

const SBackButton = styled.button`
  position: fixed;
  top: 20vh;
  right: 10vw;
  font-size: 4rem;
  height: 45px;
  background: transparent;
  @media screen and (max-width: ${responsive.mobile}px) {
    right: unset;
    left: calc(100vw - 5.75rem);
    top: 7.5rem;
  }
`;
