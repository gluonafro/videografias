import React, { useRef, useEffect, useState} from "react";
import { Link } from 'react-router-dom'
import styled from "styled-components/macro";
import { data } from "../resources/data.json";
import getNext from '../utils/getNext'

const Player = ({ match, active, setActive, orderedData }) => {
  const [videoInfo, setVideoInfo] = useState({isOpen: false, isBio: false})
  const Video = useRef(null);

  useEffect(() => {
    if (Video.current) Video.current.play();
  }, [Video]);

  const currentVideo = data[orderedData[active]]
  const nextVideo = getNext(active, data.length, true)
  const prevVideo = getNext(active, data.length, false)

  return (
    <main>
          <Container>
      <InfoTabs>
        {videoInfo.isOpen && <VideoInfo>
          {videoInfo.isBio ?
          <>
          <div>{currentVideo.artistFName + currentVideo.artistLName}</div>
          <div>{currentVideo.artistBio}</div>
          </>
          :  <><div>{currentVideo.videoName}</div>
          <div>{currentVideo.videoText}</div>
          </>}
        </VideoInfo>}
        <Tabs isOpen={videoInfo.isOpen}>
          <button onClick={() => {setVideoInfo({isOpen: true, isBio: false})}}><div className={`textoBoton ${!videoInfo.isBio && videoInfo.isOpen && 'underline'}`}>Sinopsis de la obra</div></button>
          {videoInfo.isOpen && <div onClick={() => setVideoInfo({...videoInfo, isOpen: false})} className="flechaCerrar">&larr;</div>}
          <button onClick={() => {setVideoInfo({isOpen: true, isBio: true})}}><div className={`textoBoton ${videoInfo.isBio && videoInfo.isOpen && 'underline'}`}>Bio del artista</div></button>
        </Tabs>
      </InfoTabs>
      <VideoPlayer isOpen={videoInfo.isOpen}>
        <Link to={`/expo/${orderedData[prevVideo]}`} onClick={() => setActive(prevVideo)}>
          <ChangeVideo css={`left: 0;`} >&larr;</ChangeVideo>
        </Link>
        <video
          // src={data[Number(match.params.id)].link}
          ref={Video}
          height="100%"
          width="100%"
          //   autoPlay={true}
          controls
        ></video>
        <Link to={`/expo/${orderedData[nextVideo]}`} onClick={() => setActive(nextVideo)}>
          <ChangeVideo css={`right: 0;`}>
            &rarr;
          </ChangeVideo>
        </Link>
      </VideoPlayer>
      <BackArrow>
        <Link to="/expo">go back</Link>
      </BackArrow>
    </Container>
    </main>

  );
};

export default Player;

const Container = styled.div`
  width: 100%;
  height: auto;
  background: #000;
  display: flex;
  overflow: hidden;
`;

const InfoTabs = styled.div`
  height: auto;
  display: flex;
  left: 0;
  top: 0;
  height: 100vh;
`;

const VideoInfo = styled.div`
    height: 100%;
    width: 30rem;
    border-right: 1px solid #fff;
    display: flex;
    flex-direction: column;
`;

const Tabs = styled.div`
width: 5rem;
border-right: 1px solid #fff;
button {
    width: 100%;
    height: ${({ isOpen }) => (isOpen ? "45%" : "50%")};
    display: flex;
    .textoBoton {
      writing-mode: vertical-lr;
      line-height: 5rem;
      margin: auto;
      :hover {
        text-decoration: underline;
      }
    }
    .underline {
      text-decoration: underline;
    }
  }
  .flechaCerrar {
    height: 10%;
    line-height: 10vh;
    text-align: center;
    cursor: pointer;
}
`;

const VideoPlayer = styled.div`
  height: 100vh;
  width: ${({ isOpen }) =>
    isOpen ? "calc(100% - 300px)" : "calc(100% - 50px)"};
  position: relative;
  float: right;
`;

const ChangeVideo = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  line-height: 100vh;
  z-index: 1;
  cursor: pointer;
  width: 5rem;
  text-align: center;
  color: #fff;
  :hover {
    font-size: 150%;
  }
`;

const BackArrow = styled.button`
  position: absolute;
  background: none;
  top: 40px;
  right: 40px;
  z-index: 2;
`;
