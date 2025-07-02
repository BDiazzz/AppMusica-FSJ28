import { useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login';
import styled from 'styled-components';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Principal from './components/Principal';
import Registrarse from './components/Registrarse';


const AppContenedor = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-x: hidden; 
  background: linear-gradient(
    to bottom,
    var( --hover-color) 0%,
    var(--background-color) 50%,
    var(--background-color) 100%);
`;

function App() {
  return (
    <BrowserRouter>
      <AppContenedor>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Principal" element={<Principal />} />
          <Route path="/Registrarse" element={<Registrarse />} />
        </Routes>
      </AppContenedor>
    </BrowserRouter>
  );
}

export default App
