import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Header from './componentes/folderHeader/header';
import Footer from './componentes/folderFooter/footer.tsx';
import Search from './componentes/folderSearch/search.tsx';
import { useSelector } from 'react-redux';
import LoginUser from './componentes/FolderLoginUser/loginUser.jsx';
import CreateNaturalArea from './componentes/folderNaturalArea/crearAreaNatural.jsx';
import AreasNaturales from './componentes/folderNaturalArea/areasNaturales.jsx';
import Species from './componentes/folderSpecies/listarSpecies.jsx';

const Home = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate(); 
  const [mostrarEspecies, setMostrarEspecies] = useState(true); // Estado para alternar vistas

  return (
    <>
      <header>
        <Header />
        {user ? <p>Bienvenido, {user?.name}!</p> : <LoginUser />}
      </header>
      <main>
        <Search />
        
        <button onClick={() => navigate('/crear-area')} className="btn btn-primary m-2">
          Crear Nueva Área Natural
        </button>


        <button 
          onClick={() => setMostrarEspecies(!mostrarEspecies)} 
          className="btn btn-secondary m-2"
        >
          {mostrarEspecies ? "Ver Áreas Naturales" : "Ver Especies"}
        </button>

        {/* Renderizado condicional de Especies o Áreas Naturales */}
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
      </Routes>
    </Router>
  );
};

export default App;
