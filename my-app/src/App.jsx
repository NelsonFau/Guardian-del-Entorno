import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Header from './componentes/folderHeader/header';
import Footer from './componentes/folderFooter/footer.tsx';
import { useSelector } from 'react-redux';
import LoginUser from './componentes/FolderLoginUser/loginUser.jsx';
import CreateNaturalArea from './componentes/folderNaturalArea/crearAreaNatural.jsx';
import AreasNaturales from './componentes/folderNaturalArea/areasNaturales.jsx';
import Species from './componentes/folderSpecies/listarSpecies.jsx';
import DetailsUser from './componentes/FolderLoginUser/loginDetail.jsx';
import LoginCreate from './componentes/folderCreateLogin/loginCreate.jsx';
  
  
const Home = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate(); 
  const [mostrarEspecies, setMostrarEspecies] = useState(true); 

  return (
    <>
      <header>
        <Header />
        {user ? <p>Bienvenido, {user?.name}!</p> : <LoginUser />}
      </header>
      <main>
        
        <button onClick={() => navigate('/crear-area')} className="btn btn-primary m-2">
          Crear Nueva Área Natural
        </button>
        
        <DetailsUser/>

        <button 
          onClick={() => setMostrarEspecies(!mostrarEspecies)} 
          className="btn btn-secondary m-2"
        >
          {mostrarEspecies ? "Ver Áreas Naturales" : "Ver Especies"}
        </button>

        {mostrarEspecies ? <Species /> : <AreasNaturales />}
      </main>
      <footer className="contenedorPadre">
        <Footer />
      </footer>
    </>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/crear-area" element={<CreateNaturalArea />} />
        <Route path="/crear-usuario" element={<LoginCreate />} />
      </Routes>
    </Router>
  );
};

export default App;
