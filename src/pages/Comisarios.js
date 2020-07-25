import React, { useRef, useState } from "react";
import styled from "styled-components";
import Header from "../containers/Header";
import { TweenMax } from "gsap";
import { useTranslate } from "../contexts/languageContext";
import { curators } from "../resources/data.json";
import { Transition, TransitionGroup } from "react-transition-group";
import ArrowCircle from "../assets/svg/ArrowCircle";
import ArrowSmall from "../assets/svg/ArrowSmall";

const Comisarios = ({ match }) => {
  const t = useTranslate();
  const Wrap = useRef(null);
  const TextPage = useRef(null);
  const [isList, setIsList] = useState(true);
  const [curator, setCurator] = useState({});
  const [isScrolling, setIsScrolling] = useState(false);

  const enterList = () => {
    let container = Wrap.current;
    let containerScrollPosition = Wrap.current.scrollLeft;
    container.scrollTo({
      top: 0,
      left: containerScrollPosition + 2000,
      behaviour: "smooth", //if you want smooth scrolling
    });
    TweenMax.fromTo(container, 0.5, { x: "-60vw" }, { x: 0 });
    setIsScrolling(true);
  };

  const exitList = () => {
    TweenMax.fromTo(Wrap.current, 0.3, { x: 0 }, { x: "-100vw" });
  };
  const enterText = (node) => {
    TweenMax.fromTo(node, 0.5, { x: 2000 }, { x: 0 });
  };
  const exitText = () => {
    TweenMax.fromTo(TextPage.current, 0.3, { x: 0 }, { x: "80vw" });
  };

  return (
    <>
      <Header match={match} />
      <SMain className="extraLarge">
        <TransitionGroup component={null}>
          {isList && (
            <Transition onEnter={(node) => enterList(node)} timeout={500}>
              <Wrapper
                ref={Wrap}
                onWheel={(e) => {
                  e.preventDefault();
                  let container = Wrap.current;
                  let containerScrollPosition = Wrap.current.scrollLeft;
                  container.scrollTo({
                    top: 0,
                    left: containerScrollPosition + e.deltaY,
                    behaviour: "smooth", //if you want smooth scrolling
                  });
                  setIsScrolling(true);
                }}
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
                        <a
                          onClick={() => {
                            exitList();
                            setTimeout(() => {
                              setIsList(false);
                            }, 300);
                            setCurator(e);
                          }}
                        >
                          {e.name}
                        </a>
                        <span> {t(e.country)}</span>
                      </li>
                    ))}
                  </ul>
                </Curators>
                {!isScrolling && (
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
                  onClick={(node) => {
                    setTimeout(() => {
                      setIsList(true);
                    }, 300);
                    exitText();
                  }}
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
  overflow-x: hidden;
  z-index: 0;
  section::-webkit-scrollbar {
    display: none;
  }
  span {
    color: #8f8f8f;
  }
`;

const Wrapper = styled.section`
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
    a:hover {
      color: #fff;
      border-bottom: 1px solid #fff;
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
`;

const BackButton = styled.button`
  position: fixed;
  top: 20vh;
  right: 10vw;
  font-size: 4rem;
`;
