import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, Link, useNavigate, Navigate } from 'react-router-dom';
import axios from 'axios';



import '../src/styles/main.scss';
import Home from './pages/Home';
import Login from './pages/Login';
import { RequireAuth } from './services/RequireAuth';
import AuthWrapper from './services/auth_wrapper';



function App() {

  return (

    <Routes>
      <Route path="/" element={<RequireAuth><AuthWrapper /></RequireAuth>} />
      <Route path="/home" element={<RequireAuth><Home /></RequireAuth>} />
      <Route path='/login' element={<Login />} />
    </Routes>
  );
}

export default App;
