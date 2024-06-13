import {Route, Routes} from "react-router-dom";
import {useState} from "react";

import Auth from "./services/Authentication.js";

// components
import CatalogIndex from "./components/CatalogIndex.js";
import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";
import Main from "./components/Main/Main.jsx";
import ReadyProgs from "./components/ReadyProgs/ReadyProgs.jsx";
import DishMethod from "./components/DishMethod/DishMethod.jsx";
import WrapperLogin from "./components/Authentication/WrapperLogin/WrapperLogin.jsx";



export default function App() {
  const [uuid] = useState(Auth.checkUUID())
  const [wrapperLogin, setWrapperLogin] = useState(false);

  return (
    <>
      
      <Header setWrapperLogin={setWrapperLogin} />
      {wrapperLogin && <WrapperLogin setWrapperLogin={setWrapperLogin} uuid={uuid} />}
      <CatalogIndex />
      <Routes>
        <Route path="" element={<Main />} />
        <Route path="readyprogram" element={<ReadyProgs />} />
        <Route path="dishmethod" element={<DishMethod />} />
      </Routes>
      <Footer />
    </>
  );
}
