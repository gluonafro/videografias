import React from 'react'

const Poster = ({url}) => {
    // const basename = `${constantes.rutas.logo}${codpar.padStart(4, "0")}`;
    return <img src={`${url}.jpg`} alt=""  />;
  };
export default Poster;