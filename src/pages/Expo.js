import React, { useState } from "react";
import Carrusel from "../containers/Carrusel";
import Header from "../containers/Header";
import OrderDropdown from "../components/OrderDropdown";
import styled from "styled-components";

const Expo = ({ match, active, setActive, orderedData, setOrderedData }) => {
  const [wheel, setWheel] = useState({ move: 0, on: false });
  const [muted, setMuted] = useState(true);

  return (
    <>
      <Header match={match} muted={muted} setMuted={setMuted} />
      <Main onWheel={(e) => setWheel({ move: e.deltaY, on: !wheel.on })}>
        <ButtonsRow>
          <OrderDropdown totalItems={orderedData.length} setOrderedData={setOrderedData} />
        </ButtonsRow>
        <Carrusel
          wheel={wheel}
          orderedData={orderedData}
          muted={muted}
          active={active}
          setActive={setActive}
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
  height: 87vh;
`;

const ButtonsRow = styled.div`
  width: 100%;
`;