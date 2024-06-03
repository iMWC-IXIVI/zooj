import React from 'react';
import './App.css';
import Header from './components/header';
import CatalogIndex from './components/CatalogIndex';
import RegistrationPage from "./pages/registrationPage";

function App() {
  return (
    <>
      <Header className="app-header"/>
      <CatalogIndex/>
      <RegistrationPage/>
    </>
  );
}

export default App;