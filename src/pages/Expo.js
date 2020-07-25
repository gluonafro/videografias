import React, { useState } from "react";
import Carrusel from "../containers/Carrusel";
import Header from "../containers/Header";
import OrderDropdown from "../components/OrderDropdown";
import styled from "styled-components";

const Expo = ({ match, active, setActive, orderedData, setOrderedData }) => {
  const [wheel, setWheel] = useState({ move: 0, on: false });
  const [muted, setMuted] = useState(true);
  const [barIndicator, setBarIndicator] = useState("");
  const [zoom, setZoom] = useState(false);

  return (
    <>
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
          <Zoom className="small" onClick={() => setZoom(!zoom)}>
            {zoom ? "Vista general" : "Vista detalle"}
          </Zoom>
        </ButtonsRow>
        <Carrusel
          wheel={wheel}
          orderedData={orderedData}
          muted={muted}
          active={active}
          setActive={setActive}
          barIndicator={barIndicator}
          zoom={zoom}
        />
      </Main>
    </>
  );
};

export default Expo;

let array = [];
for (let i = 0; i < 70; i++) {
  array.push(i);
}

const Main = styled.main`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 6rem);
  justify-content: space-around;
`;

const ButtonsRow = styled.div`
  width: 100%;
  height: 2.2rem;
  align-items: center;
  display: flex;
  justify-content: flex-end;
`;

const Zoom = styled.button`
  width: 10rem;
  height: 2.2rem;
  border: 1px solid #fff;
  margin: 0 18.5rem 0 1.5rem;
`;
