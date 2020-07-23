import React from "react";
import styled from "styled-components";

const InfoVideo = ({ video, isBio, t }) => {
  return (
    <VideoInfoCont>
      {isBio ? (
        <VideoInfo>
          <div className="title">
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
          <div className="title">{video.videoName}</div>
          <div>
            <p>
              {video.artistFName} {video.artistLName}
            </p>
            <p>{video.year}</p>
            <p>{video.institution}</p>
          </div>
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
  /* width: 100%; */
  display: flex;
  flex-direction: column;
`;

const VideoInfo = styled.div`
  color: #8f8f8f;
  padding: 7vh 2vw;
  > div {
    margin-bottom: 3vh;
  }
  .title {
    color: #ececec;
  }
`;
