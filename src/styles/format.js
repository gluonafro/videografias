import { createGlobalStyle } from "styled-components";
/**
 * Estilos de la página
 */

const FormatoVideoGrafias = createGlobalStyle`

  html *,
  body * {
      cursor: none;
  }

  a {
    color: #ececec;
  }

  a:hover {
    color: #fff;
  }

  .active a {
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

  .bold {
    font-weight: bold;
  }

  .flex {
    display: flex;
  }

  br {
    display: block;
    margin: 0.75rem 0;
    :not(*:root) {
      content: "";
      margin: 1.5rem 0;
    }
  }

  hr {
    border: none;
    margin: 4rem 0;
    :not(*:root) {
      content: "";
      margin: 2rem 0;
    }
  }

  button {
    background: #000;
    color: #ececec;
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
    scrollbar-width: none;
  }

  * {
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
    ::-webkit-scrollbar {
      display: none;
    }
  }


`;

export default FormatoVideoGrafias;
