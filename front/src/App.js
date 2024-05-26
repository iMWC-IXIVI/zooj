import React from 'react';
import './App.css';
import './components/CatalogIndex';
import './components/Header';
import CatalogIndex from './components/CatalogIndex';
import Header from './components/Header';

function App() {
  return (
    <div className="app">
      <div className="app-header">
        <Header/>
      </div>
      <CatalogIndex/>
    </div>
  );
}

export default App;