import React, { useRef, useState } from "react";
import styled from "styled-components";
import Header from "../containers/Header";
import { TweenMax } from "gsap";
import { useTranslate } from "../contexts/languageContext";
import { curators } from "../resources/data.json";
import { Transition, TransitionGroup } from "react-transition-group";
import ArrowCircle from "../assets/svg/ArrowCircle";
import ArrowSmall from "../assets/svg/ArrowSmall";
import { useIsMobile } from "../hooks/useMediaQuery";
import { responsive } from "../resources/constants.json";

const Comisarios = ({ match }) => {
  const t = useTranslate();
  const Wrap = useRef(null);
  const TextPage = useRef(null);
  const GoBackButton = useRef(null);
  const Main = useRef(null);
  const [isList, setIsList] = useState(true);
  const [curator, setCurator] = useState({});
  const [isScrolling, setIsScrolling] = useState(false);
  const isMobile = useIsMobile();

  const enterList = (node) => {
    window.scrollTo(0, 0);
    let container = node;
    let containerScrollPosition = node.scrollLeft;
    if (!isMobile) {
      container.scrollTo({
        top: 0,
        left: containerScrollPosition + 2000,
        behaviour: "smooth", //if you want smooth scrolling
      });
      Main.current.scrollTo(0, 0);
    }
    TweenMax.fromTo(container, 0.5, { x: "-60vw" }, { x: 0 });
    setIsScrolling(true);
  };

  const exitList = () => {
    TweenMax.fromTo(Wrap.current, 0.3, { x: 0 }, { x: "-100vw" });
  };
  const enterText = (node) => {
    window.scrollTo(0, 0);
    TweenMax.fromTo(node, 0.5, { x: 2000, y: 0 }, { x: 0, y: 0 });
    TweenMax.fromTo(GoBackButton.current, 0.5, { x: 2000 }, { x: 0 });
  };
  const exitText = () => {
    TweenMax.fromTo(
      TextPage.current,
      0.3,
      { x: 0 },
      { x: isMobile ? "100vw" : "80vw" }
    );
    TweenMax.fromTo(
      GoBackButton.current,
      0.3,
      { x: 0 },
      { x: isMobile ? "100vw" : "80vw" }
    );
  };

  return (
    <>
      <Header match={match} />
      <SMain className="extraLarge" isList={isList} ref={Main}>
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
                  className="scrollSection"
                />
                <Curators className="scrollSection">
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
                        <span> {t(e.country)}</span>
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
                <TextWrapper ref={TextPage}>
                  <div className="curatorTitle">
                    {curator.name} <span>{t(curator.country)}</span>
                  </div>
                  <div
                    className="curatorText large"
                    dangerouslySetInnerHTML={{
                      __html: t(curator.text + curator.id),
                    }}
                  ></div>
                </TextWrapper>
                <BackButton
                  onClick={() => {
                    setTimeout(() => {
                      setIsList(true);
                    }, 300);
                    exitText();
                  }}
                  ref={GoBackButton}
                >
                  <ArrowCircle />
                </BackButton>
              </React.Fragment>
            </Transition>
          )}
        </TransitionGroup>
      </SMain>
    </>
  );
};

export default Comisarios;

const SMain = styled.main`
  position: absolute;
  left: 0;
  top: 0;
  height: 100vh;
  width: 100vw;
  z-index: 0;
  overflow-x: auto;
  section {
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }
  span {
    color: #8f8f8f;
  }
  @media screen and (max-width: ${responsive.mobile}px) {
    overflow-x: unset;
  }
`;

const Wrapper = React.forwardRef((props, ref) =>
  props.isMobile ? (
    <SWrapperMobile ref={ref}>{props.children}</SWrapperMobile>
  ) : (
    <SWrapper
      ref={ref}
      onWheel={(e) => {
        e.preventDefault();
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
  height: 100%;
  .scrollSection {
    flex: 0 0 auto;
    width: 60vw;
    margin: auto 10vw;
  }
  .useTip {
    position: absolute;
    bottom: 2vh;
    right: 2vw;
  }
`;

const Curators = styled.div`
  li {
    padding: 0.5rem 0;
    button {
    border-bottom: 1px solid transparent;
    :hover {
      color: #fff;
      border-color: #fff;
    }
  }
`;

const TextWrapper = styled.section`
  margin: 20vh 0 0 20vw;
  width: 45vw;
  display: flex;
  flex-direction: column;
  .curatorTitle {
    margin-bottom: 5rem;
  }
  .curatorText {
    margin-bottom: 20rem;
  }
  @media screen and (max-width: ${responsive.mobile}px) {
    width: calc(100% - 2rem);
    margin: 15rem 1rem 2rem 1rem;
    .curatorTitle {
      font-size: 1.8rem;
    }
  }
`;

const BackButton = styled.button`
  position: fixed;
  top: 20vh;
  right: 10vw;
  font-size: 4rem;
  height: 0;
  @media screen and (max-width: ${responsive.mobile}px) {
    top: 7.5rem;
    right: 1rem;
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
