import React, { forwardRef } from "react";
import styled from "styled-components";
import { responsive } from "../resources/constants.json";

const LongText = forwardRef((props, ref) => {
  const { men, t } = props;
  return (
    <TextWrapper ref={ref}>
      <div className="curatorTitle extraLarge">
        {men.name}{" "}
        <p className="grey">{men.institution ?? t(men.text + "Job")}</p>
      </div>
      <div
        className="curatorText large"
        dangerouslySetInnerHTML={{
          __html: t(men.text),
        }}
      ></div>
    </TextWrapper>
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
    margin-left: 18rem;
  }
  @media screen and (min-width: ${responsive.extraLarge}px) {
    margin-left: 335px;
    width: 750px;
  }
`;
