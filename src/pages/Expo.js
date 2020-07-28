import React, { useState, useEffect, useRef } from "react";
import Carrusel from "../containers/Carrusel";
import Header from "../containers/Header";
import OrderDropdown from "../components/OrderDropdown";
import CarruselMobile from "../containers/CarruselMobile";
import styled from "styled-components";
import { useIsMobile } from "../hooks/useMediaQuery";
import { responsive } from "../resources/constants.json";
import { TweenMax } from "gsap";

const Expo = ({ match, active, setActive, orderedData, setOrderedData }) => {
  const [wheel, setWheel] = useState({ move: 0, on: false });
  const [muted, setMuted] = useState(true);
  const [barIndicator, setBarIndicator] = useState("");
  const [zoom, setZoom] = useState(false);
  const [zoomMob, setZoomMob] = useState(true);
  const isMobile = useIsMobile();

  const RefExpo = useRef(null);

  useEffect(() => {
    TweenMax.fromTo(RefExpo.current, 1, { opacity: 0 }, { opacity: 1 });
  }, [match.path]);

  return (
    <div ref={RefExpo} style={{ opacity: 0 }}>
      <Header match={match} muted={muted} setMuted={setMuted} />
      <Main onWheel={(e) => setWheel({ move: e.deltaY, on: !wheel.on })}>
        <ButtonsRow>
          <OrderDropdown
            orderedData={orderedData}
            setOrderedData={setOrderedData}
            setBarIndicator={setBarIndicator}
            active={active}
            setActive={setActive}
          />
          <Zoom
            className={!isMobile && "small"}
            onClick={() => {
              isMobile ? setZoomMob(!zoomMob) : setZoom(!zoom);
            }}
          >
            {isMobile
              ? zoomMob
                ? "Vista detalle"
                : "Vista general"
              : zoom
              ? "Vista general"
              : "Vista detalle"}
          </Zoom>
        </ButtonsRow>
        {!isMobile ? (
          <Carrusel
            wheel={wheel}
            orderedData={orderedData}
            muted={muted}
            active={active}
            setActive={setActive}
            barIndicator={barIndicator}
            zoom={zoom}
          />
        ) : (
          <CarruselMobile
            orderedData={orderedData}
            zoom={zoomMob}
            active={active}
            setActive={setActive}
          />
        )}
      </Main>
    </div>
  );
};

export default Expo;

let array = [];
for (let i = 0; i < 70; i++) {
  array.push(i);
}

const Main = styled.main`
  @media screen and (min-width: ${responsive.mobile}px) {
    display: flex;
    flex-direction: column;
    height: calc(100vh - 6rem);
    justify-content: space-around;
  }
`;

const ButtonsRow = styled.div`
  width: 100%;
  height: 2.2rem;
  align-items: center;
  display: flex;
  justify-content: flex-end;
  z-index: 1;
  @media screen and (max-width: ${responsive.mobile}px) {
    position: fixed;
    bottom: 2rem;
    height: 3.5rem;
    justify-content: center;
  }
`;

const Zoom = styled.button`
  width: 10rem;
  height: 2.2rem;
  border: 1px solid #fff;
  margin: 0 18.5rem 0 1.5rem;
  @media screen and (max-width: ${responsive.mobile}px) {
    width: 13rem;
    margin: 0 0 0 6px;
    height: 3.5rem;
  }
`;
