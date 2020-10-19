import React from "react";
import styled from "styled-components";
import { useIsMobile } from "../hooks/useMediaQuery";
import { responsive } from "../resources/constants.json";

const InfoVideo = ({ video, isBio, t }) => {
  const isMobile = useIsMobile();
  return (
    <VideoInfoCont>
      {isBio ? (
        <VideoInfo>
          <div className="title bold">
            {video.artistFName + " " + video.artistLName}
          </div>
          <div
            dangerouslySetInnerHTML={{
              __html: t(video.artistBio),
            }}
          />
        </VideoInfo>
      ) : (
        <VideoInfo>
          {!isMobile && (
            <>
              <div className="title bold marginTitle">{video.videoName}</div>
              <div className="subtitle normal">
                <p>
                  {video.artistFName} {video.artistLName}
                </p>
                <p>{video.year}</p>
                <p>{video.institution}</p>
              </div>
            </>
          )}
          <div
            dangerouslySetInnerHTML={{
              __html: t(video.videoText),
            }}
          />
        </VideoInfo>
      )}
    </VideoInfoCont>
  );
};

export default InfoVideo;

const VideoInfoCont = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const VideoInfo = styled.div`
  color: #8f8f8f;
  padding: 7vh 2vw;
  .title, .subtitle {
    color: #ececec;
    line-height: 1.7rem;
  }
  > div {
    margin-bottom: 2rem;
    @media screen and (min-width: ${responsive.extraLarge}px) {
      margin-bottom: 4rem;
    }
  }
  .marginTitle {
    margin-bottom: 1rem;
    @media screen and (min-width: ${responsive.extraLarge}px) {
      margin-bottom: 2rem;
    }
  }
  @media screen and (max-width: ${responsive.mobile}px) {
    padding: 1vh 2vw;
  }
  .subtitle {
    @media screen and (min-width: ${responsive.extraLarge}px) {
      font-size: 1.7rem;
    }
  }
`;
