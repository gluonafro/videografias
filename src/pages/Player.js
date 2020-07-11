import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import { data } from "../resources/data.json";
import { Link } from "react-router-dom";

const Player = ({ match }) => {
  const Video = useRef(null);

  useEffect(() => {
    if (Video.current) Video.current.play();
  }, [Video.current]);
  return (
    <Container>
      <VideoInfo>
        <button>Info video</button>
        <button>Info artista</button>
      </VideoInfo>
      <VideoPlayer>
        <video
          src={data[Number(match.params.id)].link}
          ref={Video}
          height="100%"
          width="100%"
          //   autoPlay={true}
          controls
        ></video>
      </VideoPlayer>
      <BackArrow>
        <Link to="/expo">go back</Link>
      </BackArrow>
    </Container>
  );
};

export default Player;

const Container = styled.div`
  width: 100%;
  height: 100%;
  background: #000;
  display: flex;
`;

const VideoInfo = styled.div`
  height: 100%;
  width: 100px;
  background: #ddd;
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
  > button {
    height: 50vh;
    width: 100%;
    :first-child {
      border-bottom: 1px solid #000;
    }
  }
`;

const VideoPlayer = styled.div`
  height: 100vh;
  width: calc(100% - 100px);
`;

const BackArrow = styled.button`
  position: absolute;
  background: none;
  top: 40px;
  right: 40px;
  a {
    color: #fff;
  }
`;
