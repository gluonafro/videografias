import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { data } from "../resources/data.json";
import { TweenMax } from "gsap";
import InputRange from "./InputRange";

const Carrusel = ({ wheel }) => {
  const [active, setActive] = useState(0);
  const [origin, setOrigin] = useState(0);
  const [done, setDone] = useState(true);
  const array = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  let itemWidth = 500;
  let totalItems = data.length;

  const Crsl = useRef(null);

  const getNext = (act, max) => {
    return act + 1 >= max ? 0 : act + 1;
  };
  const getPrev = (act, max) => {
    return act - 1 < 0 ? max - 1 : act - 1;
  };
  const next = () => {
    setDone(false);
    let offset = Crsl.current.children[0].getBoundingClientRect().x;
    TweenMax.to(Crsl.current.children, 0.5, {
      x: offset - itemWidth,
    }).then(() => {
      setActive(getNext(active, totalItems));
      setOrigin(getNext(active, totalItems));
      TweenMax.set(Crsl.current.children, {
        x: offset,
      });
      setDone(true);
    });
  };

  const prev = () => {
    setDone(false);
    let offset = Crsl.current.children[0].getBoundingClientRect().x;
    TweenMax.to(Crsl.current.children, 0.5, {
      x: offset + itemWidth,
    }).then(() => {
      setActive(getPrev(active, totalItems));
      setOrigin(getPrev(active, totalItems));
      TweenMax.to(Crsl.current.children, 0, {
        x: offset,
      });
      setDone(true);
    });
  };

  useEffect(() => {
    if (done) {
      if (wheel.move > 0) next();
      if (wheel.move < 0) prev();
    }
  }, [wheel.on]);

  return (
    <React.Fragment>
      <Wrapper ref={Crsl}>
        {realArray(array, active).map((i, index) => {
          return (
            <Item>
              <div>{data[i].artistLName}</div>
            </Item>
          );
        })}
      </Wrapper>
      {active} / {totalItems - 1}
      <InputRange
        Crsl={Crsl}
        active={active}
        setActive={setActive}
        itemWidth={itemWidth}
        totalItems={totalItems}
        origin={origin}
        setOrigin={setOrigin}
        done={done}
        setDone={setDone}
      />
    </React.Fragment>
  );
};

export default Carrusel;

const Wrapper = styled.section`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 40rem;
  overflow: hidden;
`;

const Item = styled.div`
  width: 50rem;
  height: 100%;
  flex-shrink: 0;
  overflow: hidden;
  transform: translateX(-60rem);
  div {
    border: 1px solid #000;
    width: 80%;
    height: 22rem;
  }
`;

const realArray = (array, active) => {
  let center = array[active];
  let right1 = array[active + 1] ? array[active + 1] : array[0];
  let right2 = array[active + 2]
    ? array[active + 2]
    : array[active + 1]
    ? array[0]
    : array[1];
  let left1 =
    array[active - 1] !== undefined
      ? array[active - 1]
      : array[array.length - 1];
  let left2 =
    array[active - 2] !== undefined
      ? array[active - 2]
      : array[active - 1] !== undefined
      ? array[array.length - 1]
      : array[array.length - 2];

  return [left2, left1, center, right1, right2];
};
