import React from 'react';
import './App.css';
import './components/CatalogIndex'
import CatlogIndex from './components/CatalogIndex';

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <CatlogIndex/>
      </header>
    </div>
  );
}

export default App;