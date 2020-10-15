import React, { useState, useRef } from "react";
import styled from "styled-components";
import Header from "../containers/Header";
import { useTranslate } from "../contexts/languageContext";
import { useIsMobile } from "../hooks/useMediaQuery";
import ArrowSmall from "../assets/svg/ArrowSmall";

const Info = ({ match }) => {
  const t = useTranslate();
  const isMobile = useIsMobile();

  const Wrap = useRef(null);
  const [isScrolling, setIsScrolling] = useState(false);

  return (
    <>
      <Header match={match} />
      <main style={{ height: "calc(100vh - 6rem)" }}>
        <Wrapper
          ref={Wrap}
          isMobile={isMobile}
          setIsScrolling={setIsScrolling}
        >
          <div className={`scrollSection ${isMobile ? "large" : "extraLarge"}`} style={{ width: '60vw' }}>
            {t("textoInfo")}
          </div>
          <div className='scrollSection'>
            <ContactInfo>
              <div>
                <p>Orgniazaod opr</p><br />
                <p>Real acaemina de rspaña en roma</p><br />
                <p>La academia apromueve la formacion artística u humanística de creadores, restajredoes e incestigadores, con la finalidad de loffear una mator presncia cultral españols en italia y un mejor entendimiento de las cultueAS DWE ambos pañises</p>
              </div>
              <div><p>Con la colaboracion de</p>
              <img></img></div>
            </ContactInfo>
            <ContactInfo>
              <div>
                <p>Contacta con nosotros</p><br />
                <p>Real acaemina de rspaña en roma</p><p>Piazza San Pietro in Montorio, 3</p><p>00153 Roma, Italia</p><br />
                <p>Tel. + 39.06.581.28.06</p><p>Fax. +39.06.581.80.49</p><br />
                <p><a href="mailto:info@accademiaspagna.org">info@accademiaspagna.org</a></p>
              </div>
            </ContactInfo>
          </div>
          {!isScrolling && !isMobile && (
            <div className="useTip small">
              {t("scrollParaMas")} <ArrowSmall width="10px" />
            </div>
          )}
        </Wrapper>
      </main>
    </>
  );
};

export default Info;



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
    /* width: 60vw; */
    margin: auto 10vw;
    display: flex;
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
  div:first-child {
    margin-bottom: 3rem;
    width: calc(100vw - 2rem);
  }
`;

const ContactInfo = styled.div`
  width: 70vh;
  height: 70vh;
  margin-right: 20vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  div p:first-child {
    color: #8F8F8F;
  }
`;