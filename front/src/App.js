import React from 'react';
import './App.css';
import MessageButton from './components/MessageButton';
import './components/CatalogIndex'
import CatlogIndex from './components/CatalogIndex';

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <MessageButton />
        <CatlogIndex/>
      </header>
    </div>
  );
}

export default App;