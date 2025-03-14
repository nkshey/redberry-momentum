import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import FilterNavigationHandler from "./components/FilterNavigationHandler";

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
