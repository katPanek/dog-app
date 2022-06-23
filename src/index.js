import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import { App } from './App';
import { Breed } from './routes/Breed';
import { BreedsTable } from './routes/BreedsTable';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter basename={'/dog-app'}>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/" element={<BreedsTable />} />
          <Route path=":breedName" element={<Breed />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
