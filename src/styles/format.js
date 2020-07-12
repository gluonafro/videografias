import { createGlobalStyle } from "styled-components";
/**
 * Estilos de la página
 */

const FormatoVideoGrafias = createGlobalStyle`

  a {
    color: #fff;
  }

  button {
    background: #000;
    color: #fff;
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
