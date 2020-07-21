import React, { useRef, useState } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import { TweenMax } from "gsap";
import { useTranslate } from "../contexts/languageContext";
import { curators } from "../resources/data.json";
import { Transition, TransitionGroup } from "react-transition-group";
import { Tween } from "gsap/gsap-core";

const Comisarios = ({ match }) => {
  const t = useTranslate();
  const Wrap = useRef(null);
  const [isList, setIsList] = useState(true);
  const [curator, setCurator] = useState({});
  const [isScrolling, setIsScrolling] = useState(false);

  const enterList = (node) => {
    TweenMax.fromTo(node, 0.5, { x: -2000 }, { x: 0 });
  };
  const enterText = (node) => {
    TweenMax.fromTo(node, 0.5, { x: 2000 }, { x: 0 });
  };

  return (
    <>
      <Header match={match} />
      <SMain>
        <TransitionGroup component={null}>
          {isList && (
            <Transition onEnter={(node) => enterList(node)}>
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
                      <li>
                        <a
                          onClick={() => {
                            setIsList(false);
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
                  <div className="useTip">{t("scrollParaMas")} &rarr;</div>
                )}
              </Wrapper>
            </Transition>
          )}
          {!isList && (
            <Transition onEnter={(node) => enterText(node)}>
              <React.Fragment>
                <TextWrapper>
                  <div className="curatorTitle">
                    {curator.name} <span>{t(curator.country)}</span>
                  </div>
                  <div
                    className="curatorText"
                    dangerouslySetInnerHTML={{
                      __html: t(curator.text + curator.id),
                    }}
                  ></div>
                </TextWrapper>
                <BackButton onClick={() => setIsList(true)}>&larr;</BackButton>
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
  font-size: 3rem;
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
    font-size: 1.2rem;
  }
`;

const Curators = styled.div`
  li {
    padding: 0.5rem 0;
  }
`;

const TextWrapper = styled.section`
  margin: 20vh 10vw 0;
  width: 60vw;
  display: flex;
  flex-direction: column;
  .curatorTitle {
    font-size: 4rem;
    margin-bottom: 5rem;
  }
  .curatorText {
    font-size: 3rem;
    margin-bottom: 20rem;
  }
`;

const BackButton = styled.button`
  position: fixed;
  top: 20vh;
  right: 10vw;
  font-size: 4rem;
`;
