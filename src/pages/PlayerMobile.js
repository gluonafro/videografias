import React, { useState } from "react";
import styled from "styled-components";
import { data } from "../resources/data.json";
import Header from "../containers/Header";
import InfoVideo from "../components/InfoVideo";
import { useTranslate } from "../contexts/languageContext";
import Tabs from "../components/PlayerTabs";

const PlayerMobile = ({ match }) => {
  const currentVideo = data[match.params.id];
  const [videoInfo, setVideoInfo] = useState({
    isOpen: true,
    isBio: false,
  });
  const t = useTranslate();

  return (
    <>
      <Header match={match} />
      <Main>
        <video
          src={currentVideo.link}
          height={`${window.innerWidth * 0.5625}px`}
          width="100%"
          autoPlay
          controls
          controlsList="nodownload"
          disablePictureInPicture
        />
        <Info>
          <p>
            <span className="bold">{currentVideo.videoName}</span>{" "}
            {currentVideo.artistFName} {currentVideo.artistLName}
          </p>
          <p>
            {currentVideo.year} · {t(currentVideo.country)}
          </p>
        </Info>
        <Tabs videoInfo={videoInfo} setVideoInfo={setVideoInfo} t={t} />
        <InfoVideo video={currentVideo} isBio={videoInfo.isBio} t={t} />
      </Main>
    </>
  );
};

export default PlayerMobile;

const Main = styled.main`
  height: 100%;
  padding-top: 5rem;
`;

const Info = styled.div`
  padding: 0.8rem;
  font-size: 1.6rem;
  p {
    padding: 0.1rem 0;
  }
`;
