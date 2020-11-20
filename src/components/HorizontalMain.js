import React, { forwardRef } from "react";
import styled from "styled-components";
import { responsive } from "../resources/constants.json";

const Main = forwardRef((props, ref) => (
  <SMain ref={ref}>{props.children}</SMain>
));

export default Main;

const SMain = styled.main`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 100vw;
  z-index: 0;
  overflow-x: auto;
  section {
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }
  @media screen and (max-width: ${responsive.mobile}px) {
    overflow-x: unset;
  }
`;
