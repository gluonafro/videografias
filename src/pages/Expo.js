import React, { useState, useRef } from "react";
import Carrusel from "../components/Carrusel";
import Header from "../components/Header";

const Expo = ({ match, active, setActive, orderedData }) => {
  const [wheel, setWheel] = useState({ move: 0, on: false });
  const [muted, setMuted] = useState(true);

  return (
    <>
      <Header match={match} muted={muted} setMuted={setMuted} />
      <main onWheel={(e) => setWheel({ move: e.deltaY, on: !wheel.on })}>
        <div>Videografías</div>
        <Carrusel
          wheel={wheel}
          orderedData={orderedData}
          muted={muted}
          active={active}
          setActive={setActive}
        />
      </main>
    </>
  );
};

export default Expo;

const SPoster = styled(Poster)`
  width: 83.2%;
  height: ${({ height }) => height};
`;

let array = [];
for (let i = 0; i < 70; i++) {
  array.push(i);
}
