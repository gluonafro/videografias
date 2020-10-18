import React, { useState, useEffect } from "react";
import InputRange from "react-input-range";
import styled from "styled-components";
import "react-input-range/lib/css/index.css";
import { TweenMax, Linear } from "gsap";
import usePrevious from "../hooks/usePrevious";
import getNext from "../utils/getNext";
import useInterval from "../hooks/useInterval";

const Range = (props) => {
  const [value, setValue] = useState(0);
  const [changeComplete, setChangeComplete] = useState(true);
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
    barIndicator,
  } = props;

  /****** Función para que al moverse en la barra se avance o retroceda en el carrusel */
  let prevVal = usePrevious(value);
  let act = Math.floor(value / (3));
  useEffect(() => {
    let offset = Crsl.current.children[0].getBoundingClientRect().x;
    let nextActive =
      origin + act < -totalItems
        ? 2 * totalItems + (origin + act)
        : origin + act < 0
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [act]);
  /**************************/

  /****** Función para hacer scroll infinitamente cuando la barra se ponga al máximo */
  let isAHundred = Math.abs(value) === 100;
  const autoplay = () => {
    let forwardMove = value > 0;
    let offset = Crsl.current.children[0].getBoundingClientRect().x;
    let nextActive = getNext(active, totalItems, forwardMove);
    if (done) {
      setDone(false);
      TweenMax.to(Crsl.current.children, 0.2, {
        x: forwardMove ? offset - itemWidth : offset + itemWidth,
        ease: Linear.easeInOut,
      }).then(() => {
        setActive(nextActive);
        TweenMax.set(Crsl.current.children, {
          x: offset,
          ease: Linear.easeInOut,
        });
        setDone(true);
      });
    }
  };
  useInterval(
    () => {
      autoplay();
    },
    isAHundred ? 300 : null
  );
  // Para que empiece directamente cuando llegues al maximo sin esperar los 300ms que tarde el intervalo en empezar
  useEffect(() => {
    if (isAHundred) autoplay();
  }, [isAHundred]);
  /************************/

  return (
    <Wrapper changeComplete={changeComplete}>
      <a>
      <InputRange
        maxValue={100}
        minValue={-100}
        value={value}
        onChangeStart={() => setChangeComplete(false)}
        onChange={(e) => {
          if (!changeComplete) setValue(e);
        }}
        onChangeComplete={() => {
          setOrigin(active);
          setValue(0);
          setChangeComplete(true);
        }}
        formatLabel={() => barIndicator}
      />
      </a>
    </Wrapper>
  );
};

export default Range;

const Wrapper = styled.div`
  width: 100%;
  text-align: center;
  a {
    width: 30%;
    display: block;
    margin: 0 auto;
  }
  .input-range {
    width: 100%;
  }
  .input-range__track--active {
    background: none;
  }
  .input-range__label--max,
  .input-range__label--min {
    display: none;
  }
  .input-range__track {
    background: #ececec;
    height: 1px;
    cursor: none;
  }
  .input-range__slider {
    height: 2rem;
    width: 2rem;
    border-color: #ececec;
    background: #000;
    margin: 0;
    left: -1.1rem;
    top: -1.2rem;
    cursor: none;
  }
  .input-range__label {
    font-size: 1.6rem;
    font-family: "Inter";
    text-transform: uppercase;
  }
  .input-range__label--value {
    top: -4rem;
  }
  .input-range__label-container {
    display: ${({ changeComplete }) => (changeComplete ? "none" : "block")};
    background: #8f8f8f;
    color: #000;
    padding: 0 5px;
    border-radius: 2px;
  }
  .input-range__slider:active {
    transform: scale(1.1);
  }
`;
