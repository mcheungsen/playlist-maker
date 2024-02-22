// App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/login'; // Assurez-vous d'importer correctement votre composant
import Home from './pages/home';
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<Login />}></Route>
      <Route exact path="/home" element={<Home />}></Route>
    </Routes>
    </BrowserRouter>

  );
}

export default App;
