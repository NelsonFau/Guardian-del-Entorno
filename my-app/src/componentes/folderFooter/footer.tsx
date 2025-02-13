import React from "react";
import '../folderFooter/styleFooter.css'


function Footer(props) {
  const { footer } = props;
  return (
  <div class="container ">
    <div class="row ">
      <div class="col-4">
        Redes Sociales
      </div>
      <div class="col-4">
        Contacto
      </div>
      <div class="col-4">
        Ubicación
      </div>
    </div>
  </div>
  );
}

export default Footer;
