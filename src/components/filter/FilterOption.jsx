import { useRef } from "react";
import { useClickOutside } from "../../hooks/useClickOutside";
import FilterOptionButton from "./FilterOptionButton";
import FilterPanel from "./FilterPanel";

function FilterOption({ filter, isOpen, setOpenedFilter }) {
  const panelRef = useRef(null);

  useClickOutside(panelRef, () => setOpenedFilter(null));

  return (
    <div className="flex items-center justify-center">
      <FilterOptionButton
        name={filter.name}
        isOpen={isOpen}
        onClick={() => setOpenedFilter(isOpen ? null : filter.id)}
      />

      {isOpen && <FilterPanel ref={panelRef}>{filter.body}</FilterPanel>}
    </div>
  );
}

export default FilterOption;
