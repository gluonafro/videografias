import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import Header from "../containers/Header";
import Main from "../components/HorizontalMain";
import { TweenMax } from "gsap";
import { useTranslate } from "../contexts/languageContext";
import { curators } from "../resources/data.json";
import { Transition, TransitionGroup } from "react-transition-group";
import ArrowCircle from "../assets/svg/ArrowCircle";
import ArrowSmall from "../assets/svg/ArrowSmall";
import { useIsMobile } from "../hooks/useMediaQuery";
import { responsive } from "../resources/constants.json";
import Cursor from "../components/Cursor/index";
import { useScrollPosition } from "../hooks/useScrollPosition";
import usePrevious from "../hooks/usePrevious";
import LongText from "../components/LongText";

const Comisarios = ({ match }) => {
  const t = useTranslate();
  const Wrap = useRef(null);
  const TextPage = useRef(null);
  const GoBackButton = useRef(null);
  const MainRef = useRef(null);
  const [isList, setIsList] = useState(true);
  const [curator, setCurator] = useState({});
  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollPos, setScrollPos] = useState(0);
  const isMobile = useIsMobile();

  let prevMatch = usePrevious(match) ?? {};
  useEffect(() => {
    if (match.url !== prevMatch.url && isMobile) window.scrollTo(0, 0);
  });

  useScrollPosition(
    ({ prevPos, currPos }) => {
      if (isList) setScrollPos(currPos.y);
    },
    [isList]
  );

  const enterList = (node) => {
    window.scrollTo(0, -scrollPos);
    let container = node;
    let containerScrollPosition = node.scrollLeft;
    if (!isMobile) {
      container.scrollTo({
        top: 0,
        left: containerScrollPosition + 2000,
        behaviour: "smooth", //if you want smooth scrolling
      });
      MainRef.current.scrollTo(0, 0);
    }
    TweenMax.fromTo(
      container,
      0.5,
      { x: "-20vw", opacity: 0 },
      { x: 0, opacity: 1 }
    );
    setIsScrolling(true);
  };

  const exitList = () => {
    TweenMax.fromTo(
      Wrap.current,
      0.25,
      { x: 0, opacity: 1 },
      { x: "-40vw", opacity: 0 }
    );
  };
  const enterText = (node) => {
    window.scrollTo(0, 0);
    TweenMax.fromTo(
      node,
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
      { x: 0, y: 0, opacity: 1 },
      { x: isMobile ? "50vw" : "30vw", y: 0, opacity: 0 }
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
      <Main ref={MainRef}>
        <TransitionGroup component={null}>
          {isList && (
            <Transition onEnter={(node) => enterList(node)} timeout={500}>
              <Wrapper
                ref={Wrap}
                isMobile={isMobile}
                setIsScrolling={setIsScrolling}
              >
                <div
                  dangerouslySetInnerHTML={{
                    __html: t("textoComisarios"),
                  }}
                  className="scrollSection1 extraLarge"
                />
                <Curators className="scrollSection2 large" isMobile={isMobile}>
                  <ul>
                    {curators.map((e) => (
                      <li key={e.id}>
                        <button
                          onClick={() => {
                            exitList();
                            setTimeout(() => {
                              setIsList(false);
                            }, 300);
                            setCurator(e);
                          }}
                        >
                          {e.name}
                        </button>
                        <span className="grey"> {e.instAbbr}</span>
                      </li>
                    ))}
                  </ul>
                </Curators>
                {!isScrolling && !isMobile && (
                  <div className="useTip small">
                    {t("scrollParaMas")} <ArrowSmall width="10px" />
                  </div>
                )}
              </Wrapper>
            </Transition>
          )}
          {!isList && (
            <Transition onEnter={(node) => enterText(node)} timeout={500}>
              <React.Fragment>
                <LongText ref={TextPage} men={curator} t={t} />
                <SBackButton
                  onClick={() => {
                    setTimeout(() => {
                      setIsList(true);
                    }, 300);
                    exitText();
                  }}
                  ref={GoBackButton}
                >
                  <ArrowCircle />
                </SBackButton>
              </React.Fragment>
            </Transition>
          )}
        </TransitionGroup>
      </Main>
      <Cursor state={isList} />
    </>
  );
};

export default Comisarios;

const Wrapper = React.forwardRef((props, ref) =>
  props.isMobile ? (
    <SWrapperMobile ref={ref}>{props.children}</SWrapperMobile>
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
    width: 650px;
    margin: 0 60px;
    flex: 0 0 auto;
    @media screen and (min-width: ${responsive.tablet}px) {
      margin: 0 60px 0 180px;
    }
    @media screen and (min-width: ${responsive.large}px) {
      width: 900px;
    }
    @media screen and (min-width: ${responsive.extraLarge}px) {
      margin-left: 335px;
    }
  }
  .scrollSection2 {
    flex: 0 0 auto;
    margin: 0 60px;
  }
  .useTip {
    position: absolute;
    bottom: 2vh;
    right: 2vw;
  }
`;

const Curators = styled.div`
  width: unset !important;
  ul {
    ${({ isMobile }) => !isMobile && "max-height: 60vh;"};
    display: flex;
    flex-flow: wrap column;
    max-height: 60vh;
    @media screen and (max-width: ${responsive.mobile}px) {
      max-height: unset;
    }
    @media screen and (min-width: ${responsive.extraLarge}px) {
      max-height: 50vh;
    }
  }
  li {
    padding: 1vh 0;
    padding-right: 10rem;
    @media screen and (max-width: ${responsive.mobile}px) {
      padding-right: 0;
      button {
        text-align: left;
      }
    }
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

const SWrapperMobile = styled.section`
  display: flex;
  flex-direction: column;
  padding: 15rem 1rem 2rem 1rem;
  font-size: 1.8rem;
  div:first-child {
    margin-bottom: 3rem;
    width: calc(100vw - 2rem);
  }
`;
