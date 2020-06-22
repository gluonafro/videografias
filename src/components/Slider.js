import React, { useState } from "react";
import styled from "styled-components";

const CustomSlider = ({ carouselState, Carousel }) => {
  const [additionalTransform, setAdditionalTransform] = useState(0);
  let value = 0;
  let carouselItemWidth = 0;
  Carousel = Carousel.current;
  console.log(carouselState);
  if (Carousel) {
    carouselItemWidth = Carousel.state.itemWidth;
    const maxTranslateX = Math.round(
      // so that we don't over-slide
      carouselItemWidth *
        (Carousel.state.totalItems - Carousel.state.slidesToShow) +
        150
    );
    value = maxTranslateX / 100; // calculate the unit of transform for the slider
  }
  const { transform } = carouselState;
  return (
    <SCustomSlider className="custom-slider">
      <input
        type="range"
        value={Math.round(Math.abs(transform) / value)}
        defaultValue={0}
        max={
          (carouselItemWidth *
            (carouselState.totalItems - carouselState.slidesToShow) +
            (additionalTransform === 150 ? 0 : 1500)) /
          value
        }
        onChange={(e) => {
          if (Carousel.isAnimationAllowed) {
            Carousel.isAnimationAllowed = false;
          }
          const nextTransform = e.target.value * value;
          const nextSlide = Math.round(nextTransform / carouselItemWidth);
          if (e.target.value == 0 && additionalTransform === 150) {
            Carousel.isAnimationAllowed = true;
            setAdditionalTransform(0);
          }
          Carousel.setState({
            transform: -nextTransform, // padding 20px and 5 items.
            currentSlide: nextSlide,
          });
        }}
        className="custom-slider__input"
        name="slider"
      />
      <div>{Math.ceil(carouselState.currentSlide) - 2}</div>
    </SCustomSlider>
  );
};

const SCustomSlider = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  text-align: center;

  .custom-slider__input {
    width: 20%;
    border-radius: 50%;
  }

  input[type="range"] {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }

  input[type="range"]::-webkit-slider-runnable-track {
    width: 300px;
    height: 2px;
    background: #ddd;
    border: none;
    border-radius: 3px;
  }

  input[type="range"]::-moz-range-track {
    width: 300px;
    height: 2px;
    background: #ddd;
    border: none;
    border-radius: 3px;
  }

  input[type="range"]::-ms-range {
    width: 300px;
    height: 2px;
    background: #ddd;
    border: none;
    border-radius: 3px;
  }

  input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    -moz-appearance: none;
    border: none;
    height: 10px;
    width: 10%;
    border-radius: 0%;
    background: #eee;
    box-shadow: 2px -1px 10px 0px rgba(0, 0, 0, 0.5);
    margin-top: -10px;
  }

  input[type="range"]::-moz-range-thumb {
    -moz-appearance: none;
    border: none;
    height: 35px;
    width: 10%;
    border-radius: 0%;
    background: #000;
    margin-top: -35px;
  }

  input[type="range"]::-ms-thumb {
    -moz-appearance: none;
    border: none;
    height: 35px;
    width: 10%;
    border-radius: 0%;
    background: #000;
    margin-top: -35px;
  }

  input[type="range"]:focus {
    outline: none;
  }

  input[type="range"]:focus::-webkit-slider-runnable-track {
    background: #ccc;
  }

  input[type="range"]:focus::-moz-range-track {
    background: #ccc;
  }

  input[type="range"]:focus::-ms-track {
    background: #ccc;
  }
`;

export default CustomSlider;
