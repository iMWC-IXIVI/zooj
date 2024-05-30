import React from 'react';
// import { BrowserRouter as  Route, Routes, NavLink, BrowserRouter } from "react-router-dom"
import './App.css';
import Header from './components/header';
import CatalogIndex from './components/CatalogIndex';
// import RegistrationPage from "./pages/registrationPage";

function App() {
  return (
    <>
      <div className="app">
      <Header className="app-header"/>
      <CatalogIndex/>
      </div>
      {/* <BrowserRouter>
        <Routes>
          <Route path='./pages/registrationPage' element={RegistrationPage}/>
          
        </Routes>
        <NavLink to='./pages/registrationPage'>registrate</NavLink>
      </BrowserRouter> */}
    </>
    
  );
}

export default App;