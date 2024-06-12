import CatalogIndex from "./components/CatalogIndex.js";
import MainPage from "./pages/MainPage.js";
import ReadyPrograms from "./pages/ReadyProgs.js";
import DishMethod from "./pages/DishMethod.js";

import {Route, Routes} from "react-router-dom";

import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";

function App() {
  return (
    <>
      <Header />
      <CatalogIndex />
      <Routes>
        <Route path="/MainPage" component={MainPage} />
        <Route path="/ReadyProgs" component={ReadyPrograms} />
        <Route path="/DishMethod" component={DishMethod} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
