import React from 'react';
import Header from './componentes/folderHeader/header.tsx';
import './componentes/folderFooter/footer.tsx'
import Footer from './componentes/folderFooter/footer.tsx';
import Card from './componentes/folderCard/card.tsx'
import Search from './componentes/folderSearch/search.tsx';


function App() {
  return (
    <div>
      <header>
        <Header head />
      </header>
      <main>
        <Search/>
        <Card />
      </main>
      <footer className='contenedorPadre'>
        <Footer />
      </footer>
    </div>
    
  );
} 


export default App; 
