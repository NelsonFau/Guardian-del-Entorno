import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Header from './componentes/folderHeader/header';
import Footer from './componentes/folderFooter/footer.tsx';
import Search from './componentes/folderSearch/search.tsx';
import { useSelector } from 'react-redux';
import LoginUser from './componentes/FolderLoginUser/loginUser.jsx';
import CreateNaturalArea from './componentes/folderNaturalArea/crearAreaNatural.jsx';
import AreasNaturales from './componentes/folderNaturalArea/areasNaturales.jsx';

const Home = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate(); 

  return (
    <>
      <header>
        <Header />
        {user ? <p>Bienvenido, {user?.name}!</p> : <LoginUser />}
      </header>
      <main>
        <Search />
        <button onClick={() => navigate('/crear-area')} className="btn btn-primary">
          Crear Nueva Área Natural
        </button>
        <AreasNaturales />
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
        <Route path="/crear-area" element={<CreateNaturalArea/>} />
      </Routes>
    </Router>
  );
};

export default App;
