import React from 'react';
import './App.css';
import MessageButton from './components/MessageButton';

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <MessageButton />
      </header>
    </div>
  );
}

export default App;