import React from 'react';
import { Route, Routes } from 'react-router-dom';


import '../src/styles/main.scss';
import Home from './pages/Home';
import Login from './pages/Login';
import { RequireAuth } from './services/RequireAuth';
import AuthWrapper from './services/auth_wrapper';
import { Last3Provider } from './context/Last3Context';
import ErrorBoundary from './components/ErrorBoundary';




function App() {

  return (
    <Last3Provider>
      <Routes>
        <Route path="/" element={<RequireAuth><AuthWrapper /></RequireAuth>} />
        <Route path="/home" element={<RequireAuth><ErrorBoundary type="Home"><Home /> </ErrorBoundary></RequireAuth>} />
        <Route path='/login' element={<ErrorBoundary type="Login"><Login /></ErrorBoundary>} />
      </Routes>
    </Last3Provider>
  );
}

export default App;
