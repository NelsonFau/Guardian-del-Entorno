import React from 'react';
import Header from './componentes/folderHeader/header';
import './componentes/folderFooter/footer.tsx'
import Footer from './componentes/folderFooter/footer.tsx';
import Search from './componentes/folderSearch/search.tsx';
import { useSelector } from 'react-redux';
import LoginUser from './componentes/FolderLoginUser/loginUser.jsx';
import CreateNaturalArea from './componentes/folderNaturalArea/crearAreaNatural.jsx';
import AreasNaturales from './componentes/folderNaturalArea/areasNaturales.jsx';

const App = () => { 
  const user = useSelector((state) => state.user); // Obtener el usuario del estado de Redux

  return (
    <>
      <header>
        <Header />
        {/* Si no hay usuario, mostrar el formulario de inicio de sesión */}
        {user ? <p>Bienvenido, {user.name}!</p> : <LoginUser />}
      </header>
      <main>
        <Search />
        <CreateNaturalArea />
        <AreasNaturales/>
      </main>
      <footer className='contenedorPadre'>
        <Footer />
      </footer>
    </>
  );
}

export default App;
