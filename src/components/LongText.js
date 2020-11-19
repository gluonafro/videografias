import React, { forwardRef } from "react";
import styled from "styled-components";
import ArrowCircle from "../assets/svg/ArrowCircle";
import { responsive } from "../resources/constants.json";

const LongText = forwardRef((props, ref) => {
  const { men, exit, setForExit, t } = props;
  return (
    <div ref={ref}>
      <TextWrapper>
        <div className="curatorTitle extraLarge">
          {men.name} <p className="grey">{men.institution}</p>
        </div>
        <div
          className="curatorText large"
          dangerouslySetInnerHTML={{
            __html: t(men.text),
          }}
        ></div>
      </TextWrapper>
      <BackButton
        onClick={() => {
          setTimeout(() => {
            setForExit(true);
          }, 300);
          exit();
        }}
        //   ref={GoBackButton}
      >
        <ArrowCircle />
      </BackButton>
    </div>
  );
});

export default LongText;

const TextWrapper = styled.section`
  margin: 20vh 0 0 60px;
  width: 450px;
  display: flex;
  flex-direction: column;
  .curatorTitle {
    margin-bottom: 5rem;
  }
  .curatorText {
    margin-bottom: 20rem;
  }
  @media screen and (max-width: ${responsive.mobile}px) {
    width: calc(100% - 2rem);
    margin: 15rem 1rem 2rem 1rem;
    .curatorTitle {
      font-size: 1.8rem;
    }
  }
  @media screen and (min-width: ${responsive.tablet}px) {
    width: 600px;
    margin-left: 200px;
  }
  @media screen and (min-width: ${responsive.extraLarge}px) {
    margin-left: 365px;
    width: 750px;
  }
`;

const BackButton = styled.button`
  position: fixed;
  top: 0;
  right: 10vw;
  font-size: 4rem;
  height: 45px;
  @media screen and (max-width: ${responsive.mobile}px) {
    top: -7.5rem;
    right: unset;
    left: calc(100vw - 5.75rem);
  }
`;
