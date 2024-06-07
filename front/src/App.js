import React, { useState } from 'react';
import './App.css';
import './components/CatalogIndex'
import { GetAnonymous, ResetAnonymous } from './services/anonymous.js';
import CatlogIndex from './components/CatalogIndex';
import { SendAnketa, RequestCodeEmail, GetToken } from './services/auth.js';

function App() {
  let [anonId, setAnonId] = useState(GetAnonymous())
  function doResetAnon() {
    ResetAnonymous();
    setAnonId(GetAnonymous());
  }


  function doSendAnketa() {
    SendAnketa().then((data) => console.log(data))
  }
  function doSendEmail() {
    let email = document.getElementById('email').value;
    RequestCodeEmail(email).then((data) => console.log(data));
  }

  let [token, setToken] = useState('');
  async function login() {
    let code = document.getElementById('code').value;
    let newToken = await GetToken(code);
    console.log("new token is", newToken)

    if (newToken) { 
      setToken(newToken)
    }
  }

  return (
    <div className="app">
      <header className="app-header">
        Anonymous ID: { anonId } 
        <button onClick={doResetAnon}>Сбросить anonymous_id</button>
        <button onClick={doSendAnketa}>Отправить анкету</button>
        <br/>
        <input type="text" id="email"></input>
        <button onClick={doSendEmail}>Запросить код</button>
        <br/>
        <input type="text" id="code"></input>
        <button onClick={login}>Войти</button><br/>
        token is: { token }


        <CatlogIndex/>
      </header>
    </div>
  );
}

export default App;