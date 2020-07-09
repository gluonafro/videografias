import React, { useState, useEffect } from "react";
import InputRange from "react-input-range";
import styled from "styled-components";
import "react-input-range/lib/css/index.css";
import { TweenMax, Linear } from "gsap";
import usePrevious from "../hooks/usePrevious";
import { data } from "../resources/data.json";

const Range = (props) => {
  const [value, setValue] = useState(0);
  const {
    Crsl,
    active,
    setActive,
    origin,
    setOrigin,
    done,
    setDone,
    itemWidth,
    totalItems,
  } = props;

  let prevVal = usePrevious(value);
  let act = Math.floor(value / 10);
  useEffect(() => {
    let offset = Crsl.current.children[0].getBoundingClientRect().x;
    let nextActive =
      origin + act < 0
        ? totalItems + (origin + act)
        : origin + act >= totalItems
        ? origin + act - totalItems
        : origin + act;
    let forwardMove = prevVal < value;
    if (value !== 0 && done) {
      setDone(false);
      TweenMax.to(Crsl.current.children, 0.15, {
        x: forwardMove ? offset - itemWidth : offset + itemWidth,
        ease: Linear.easeIn,
      }).then(() => {
        setActive(nextActive);
        TweenMax.set(Crsl.current.children, {
          x: offset,
          ease: Linear.easeIn,
        });
        setDone(true);
      });
    }
  }, [act]);

  return (
    <Wrapper>
      <InputRange
        maxValue={100}
        minValue={-100}
        value={value}
        onChange={(e) => setValue(e)}
        onChangeComplete={() => {
          setOrigin(active);
          setValue(0);
        }}
        formatLabel={() => data[active].artistLName.charAt(0)}
      />
    </Wrapper>
  );
};

export default Range;

const Wrapper = styled.div`
  width: 50%;
  .input-range__track--active {
    background: none;
  }
  .input-range__label--max,
  .input-range__label--min {
    display: none;
  }
`;
