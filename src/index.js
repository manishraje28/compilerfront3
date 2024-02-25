import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { CustomProvider } from 'rsuite'
import 'rsuite/dist/rsuite.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

      <CustomProvider theme="dark"><App/></CustomProvider>;
   
  </React.StrictMode>
);

