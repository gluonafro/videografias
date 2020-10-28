import React, { useState, useRef } from "react";
import styled from "styled-components";
import { data } from "../resources/data.json";
import Header from "../containers/Header";
import InfoVideo from "../components/InfoVideo";
import { useTranslate } from "../contexts/languageContext";
import Tabs from "../components/PlayerTabs";
import ScrollToTop from "../components/ScrollToTop";
import Lottie from "react-lottie";
import loadingSpinner from "../assets/animations/Spinner-Loading.json";

const PlayerMobile = ({ match }) => {
  const currentVideo = data[match.params.id];
  const [videoInfo, setVideoInfo] = useState({
    isOpen: true,
    isBio: false,
  });
  const [loading, setLoading] = useState(true);
  const t = useTranslate();
  const Video = useRef(null);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loadingSpinner,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <>
      <ScrollToTop />
      <Header match={match} />
      <Main>
        {loading && (
          <div className="loading" height={`${window.innerWidth * 0.5625}px`}>
            <Lottie options={defaultOptions} height={50} width={50} />
          </div>
        )}
        <video
          src={currentVideo.link}
          ref={Video}
          height={`${window.innerWidth * 0.5625}px`}
          width="100%"
          // autoPlay
          controls
          controlsList="nodownload"
          disablePictureInPicture
          preload="auto"
          onLoadedData={() => {
            setLoading(false);
            Video.current.play();
          }}
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
  padding-top: 5rem;
  .loading {
    position: absolute;
    top: 5rem;
    width: 100%;
    height: 56.25vw;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;
    background: #000;
  }
`;

const Info = styled.div`
  padding: 0.8rem;
  font-size: 1.6rem;
  p {
    padding: 0.1rem 0;
  }
`;
