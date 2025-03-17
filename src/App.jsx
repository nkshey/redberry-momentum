import { Outlet } from "react-router-dom";
import FilterNavigationHandler from "./components/FilterNavigationHandler";
import Header from "./components/header/Header";

function App() {
  return (
    <>
      <FilterNavigationHandler />

      <Header />

      <main>
        <Outlet />
      </main>
    </>
  );
}

export default App;
