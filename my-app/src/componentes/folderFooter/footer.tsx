import React from "react";
import '../folderFooter/styleFooter.css'
import Mapa from "../folderMap/map";

function Footer(props) {
  const { footer } = props;
  
  return (
    <div className="container">
      <div className="row text-center">
        <div className="col-4">Redes Sociales</div>
        <div className="col-4">Contacto</div>
        <div className="col-4">Ubicación</div>
        <div className="row mt-3">
          <div className="col-12 mapa d-flex flex-column align-items-center">
            <Mapa />
          </div>
        </div>
      </div>
      
      
    </div>
  );
}

export default Footer;
