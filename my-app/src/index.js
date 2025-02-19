import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { Provider } from 'react-redux';
import store from './store'; // Asegúrate de importar correctamente el store
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}> {/* Aquí debes envolver tu aplicación con el Provider */}
    <App />
  </Provider>
);

// Si deseas medir el rendimiento de la app, pasa una función para hacerlo
reportWebVitals();
