import React, { useState } from "react";



import CatalogIndex from "./components/CatalogIndex";
import MainPage from "./pages/MainPage";
import ReadyPrograms from "./pages/ReadyProgs";
import DishMethod from "./pages/DishMethod";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { GetAnonymous, ResetAnonymous } from "./services/anonymous.js";
import { SendAnketa, RequestCodeEmail, GetToken } from "./services/auth.js";
import Header from "./components/Header/Header.jsx";

function App() {
  let [anonId, setAnonId] = useState(GetAnonymous());
  function doResetAnon() {
    ResetAnonymous();
    setAnonId(GetAnonymous());
  }

  function doSendAnketa() {
    SendAnketa().then((data) => console.log(data));
  }
  function doSendEmail() {
    let email = document.getElementById("email").value;
    RequestCodeEmail(email).then((data) => console.log(data));
  }

  let [token, setToken] = useState("");
  async function login() {
    let code = document.getElementById("code").value;
    let newToken = await GetToken(code);
    console.log("new token is", newToken);

    if (newToken) {
      setToken(newToken);
    }
  }

  return (
    <>
      <BrowserRouter>
        <Header />
        <CatalogIndex/>
        <Routes>
          <Route path="/MainPage" component={MainPage} />
          <Route path="/ReadyProgs" component={ReadyPrograms} />
          <Route path="/DishMethod" component={DishMethod} />
        </Routes>
        <div className="container">
          Anonymous ID: {anonId}
          <button onClick={doResetAnon}>Сбросить anonymous_id</button>
          <button onClick={doSendAnketa}>Отправить анкету</button>
          <br />
          <input type="text" id="email"></input>
          <button onClick={doSendEmail}>Запросить код</button>
          <br />
          <input type="text" id="code"></input>
          <button onClick={login}>Войти</button>
          <br />
          token is: {token}
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
