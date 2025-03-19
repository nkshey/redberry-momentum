import { useRef } from "react";
import { useClickOutside } from "../../hooks/useClickOutside";

import FilterOptionButton from "./FilterOptionButton";
import FilterPanel from "./FilterPanel";

function FilterOption({ filter, isOpen, setOpenedFilter }) {
  const panelRef = useRef(null);
  const buttonRef = useRef(null);

  useClickOutside(panelRef, (event) => {
    if (buttonRef.current && !buttonRef.current.contains(event.target)) {
      setOpenedFilter(null);
    }
  });

  return (
    <div className="flex items-center justify-center">
      <FilterOptionButton
        ref={buttonRef}
        name={filter.name}
        isOpen={isOpen}
        onClick={() => setOpenedFilter(isOpen ? null : filter.id)}
      />

      {isOpen && (
        <FilterPanel ref={panelRef} onApply={filter.onApply}>
          {filter.body}
        </FilterPanel>
      )}
    </div>
  );
}

export default FilterOption;
