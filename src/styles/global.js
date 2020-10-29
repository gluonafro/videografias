import { createGlobalStyle } from "styled-components/macro";

const GlobalStyles = createGlobalStyle`

  html {
    font-size: 62.5%;
  }
  html {
    padding: 0;
    margin: 0;
    border: 0;
    font-family: "Inter", Helvetica, Arial, sans-serif;
    color: #ececec;
    min-height: 100%;
    height: 100%;
    background: #000;
    cursor: none;
  }
  body {
    padding: 0;
    margin: auto;
    border: 0;
    font-size: 1.4rem;
    height: auto;
    /* overflow-x: hidden; */
    -webkit-font-smoothing: antialiased;
    -webkit-text-size-adjust: 100%;
    -ms-text-size-adjust: 100%;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    min-width: 320px;
    height: 100%;
    > div {
      height: 100%;
      > div {
        height: 100%;
        > div {
          height: 100%;
        }
      }
    }
  }

  div,
  span,
  applet,
  object,
  iframe,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  blockquote,
  pre,
  a,
  abbr,
  acronym,
  address,
  big,
  button,
  cite,
  code,
  del,
  dfn,
  em,
  img,
  input,
  ins,
  kbd,
  q,
  s,
  samp,
  small,
  strike,
  strong,
  sub,
  sup,
  tt,
  var,
  b,
  u,
  i,
  center,
  dl,
  dt,
  dd,
  ol,
  ul,
  li,
  fieldset,
  form,
  label,
  legend,
  table,
  caption,
  tbody,
  tfoot,
  thead,
  tr,
  th,
  td,
  article,
  aside,
  canvas,
  details,
  embed,
  figure,
  figcaption,
  footer,
  header,
  hgroup,
  menu,
  nav,
  output,
  ruby,
  section,
  summary,
  time,
  mark,
  audio,
  video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
  }

  li {
    list-style: none;
  }

  a,
  abbr {
    text-decoration: none;
  }

  button {
    outline: none;
  }

  strong {
    font-weight: 700;
  }

  em {
    font-style: italic; 
  }

  .visually-hidden {
    position: absolute !important;
    height: 1px;
    width: 1px;
    overflow: hidden;
    clip: rect(1px 1px 1px 1px); /* IE6, IE7 */
    clip: rect(1px, 1px, 1px, 1px);
  }

  /* asegura tener un scroll normal en ios para todos los elementos */
  * {
    -webkit-overflow-scrolling: touch;
  }

  /* quitar  borde en firefox al hacer foco */
  button::-moz-focus-inner {
    border: 0;
  }

  /*solo mostrar outline para inputs y para movimientos con teclado*/
  .js-focus-visible *:focus:not(.focus-visible) {
    outline: none;
  }

  .js-focus-visible .focus-visible {
    outline: solid 4px rgba(21, 156, 228, 0.4);
  }
`;

export default GlobalStyles;
