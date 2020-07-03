import React, {useState, useRef} from "react";
import styled from "styled-components";
import Carrusel from "../components/Carousel";
import Header from "../components/Header";
import Poster from '../components/Poster'
import {Link} from 'react-router-dom'
// import handleScroll from '../utils/handleScroll'
import {data} from '../resources/data.json';
import randomArray from '../utils/randomArray'


const Expo = () => {
  let randomDist = randomArray(data.length)
  console.log(data)
  const [orderedData, setOrderedData] = useState(randomDist)
  const [zoom, setZoom] = useState(true)
  const [active, setActive] = useState(0)
  const [wheel, setWheel] = useState({move: 0, on: false})
  const video = useRef(null)
  return (
    <>
    <Header />
    <main onWheel={(e) => setWheel({move: e.deltaY, on: !wheel.on})}>
      <div>Videografías</div>
      <Carrusel zoom={zoom} setZoom={setZoom} setActive={setActive} wheel={wheel} length={data.length}>
        {orderedData.map((i, index) => {
          return (
          <div>
            <Video height={zoom ? '450px' : '112.5px'}>
              <Link to={`/expo/${i}`} >
                {index === active ? 
                   <video ref={video} autoPlay={true} width="800" height="450" onMouseOver={(e) => e.target.play()} onMouseOut={(e) => e.target.pause()} preload="auto" loop={true} loop playsInline crossOrigin="anonymous" poster={data[i].poster} src={data[i].link}></video>
                   : <SPoster url={data[i].poster} />}
                   {/* {i%2 === 0 ? <Black /> : <White />} */}
              </Link>
            </Video>
            {index === active &&
              <>
                <p>{data[i].videoName}</p>
                <p>{data[i].artistFName + ' ' + data[i].artistLName}</p>
                <p>1977, Argentina</p>
              </>}
          </div>
          )
          })}
      </Carrusel>
      {active+1}/{data.length}
    </main>
    </>
  );
};

export default Expo;

const Video = styled.div`
  flex-shrink: 0;
  /* width: ${({width}) => width}; */
  width: 83.2%;
  /* height: 25vw; */
  height: ${({height}) => height};
  border: 1px solid #000;
  margin: 100px 0 5px 0;
`;


const SPoster = styled(Poster)`
  width: 100px;
  height: 100px;
`;

const Black = styled.div`
  background: #000;
  width: 100%;
  height: 100%;
`;
const White = styled.div`
  background: #fff;
  width: 100%;
  height: 100%;
`;

let array = [];
for (let i = 0; i < 15; i++) {
  array.push(i);
}
