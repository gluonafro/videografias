import { createGlobalStyle } from "styled-components";
/**
 * Estilos de la página
 */

const FormatoVideoGrafias = createGlobalStyle`

  a {
    color: #ececec;
  }

  a:hover {
    color: #fff;
  }

  .active {
    border-bottom: 1px solid #ececec;
  }

  .extraLarge {
    font-size: 3.4rem
  }
  
  .large {
    font-size: 1.7rem;
    line-height: 2.2rem;
  }

  .normal {
    font-size: 1.4rem;
  }

  .small {
    font-size: 1.2rem;
  }

  br {
    display: block;
    margin: 0.75rem 0;
    :not(*:root) {
      content: "";
      margin: 1.5rem 0;
    }
  }

  button {
    background: #000;
    color: #ececec;
  }

.hidden {
    position: absolute !important;
    height: 1px;
    width: 1px;
    overflow: hidden;
    clip: rect(1px 1px 1px 1px); /* IE6, IE7 */
    clip: rect(1px, 1px, 1px, 1px);
  }

  /*chrome scrollbars*/
  body *::-webkit-scrollbar {
  width: 3px;
  }
  body *::-webkit-scrollbar-track {
    border-radius: 3px;
    background-color: none;
  }
  body *::-webkit-scrollbar-thumb {
    border-radius: 3px;
    background-color: #bbb;
  }
  /*firefox scrollbars*/
  body * {
    scrollbar-width: thin;
  }


`;

export default FormatoVideoGrafias;
