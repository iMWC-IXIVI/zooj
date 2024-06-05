import React from 'react';
import './App.css';
import Header from './components/Header';
import CatalogIndex from './components/CatalogIndex';

function App() {
  return (
    <>
      <Header className="container header-container"/>
      <CatalogIndex/>
    </>
  );
}

export default App;