import React, { useState } from 'react'
import styled from 'styled-components'

const ZoomButton = ({carouselState, Carousel, zoom, setZoom}) => {
    Carousel = Carousel.current

    let zoomRatio = 4
    let gap = carouselState.containerWidth / 2.685
    return (
        <Bton>
        <button onClick={() => {
          if(zoom) {
            Carousel.setState({
              slidesToShow: zoomRatio,
              itemWidth: carouselState.itemWidth/zoomRatio,
              transform: carouselState.transform + gap*(carouselState.currentSlide - 1)
            })
          } else {
            Carousel.setState({
              slidesToShow: 1,
              itemWidth: carouselState.itemWidth*zoomRatio,
              transform: carouselState.transform - gap*(carouselState.currentSlide - 1)
            })
          }
          setZoom(!zoom)
        }}>Zoom</button>
      </Bton>
    )

}

export default ZoomButton;

const Bton = styled.div`
button{
  padding: 10px 30px;
  background: #fff;
  box-shadow: 0 0 5px rgba(0,0,0,0.5);
  margin: 10px;
  position: absolute;
  bottom: 0;
  left: 30%;
}
`;