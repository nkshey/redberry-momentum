import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import useFilterStore from "../stores/useFilterStore";

function FilterNavigationHandler() {
  const location = useLocation();
  const clearAllFilters = useFilterStore((state) => state.clearAllFilters);

  useEffect(() => {
    if (location.pathname !== "/") {
      clearAllFilters();
      localStorage.removeItem("momentum-filters");
    }
  }, [location.pathname, clearAllFilters]);

  return null;
}

export default FilterNavigationHandler;
