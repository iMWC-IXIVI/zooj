import {Route, Routes} from "react-router-dom";

// components
import CatalogIndex from "./components/CatalogIndex.js";
import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";
import Main from "./components/Main/Main.jsx";
import ReadyProgs from "./components/ReadyProgs/ReadyProgs.jsx";
import DishMethod from "./components/DishMethod/DishMethod.jsx";

export default function App() {
  return (
    <>
      <Header />
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


