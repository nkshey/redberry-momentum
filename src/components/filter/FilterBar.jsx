import { useState } from "react";
import { useFilterHandlers } from "../../hooks/useFilterHandlers";

import FilterOption from "../filter/FilterOption";
import DepartmentFilterBody from "./bodies/DepartmentFilterBody";
import PriorityFilterBody from "./bodies/PriorityFilterBody";
import EmployeeFilterBody from "./bodies/EmployeeFilterBody";

function FilterBar() {
  const [openedFilter, setOpenedFilter] = useState(null);
  const { handleApplyDepartments, handleApplyPriorities, handleApplyEmployee } =
    useFilterHandlers(setOpenedFilter);

  const filterOptions = [
    {
      id: 1,
      name: "დეპარტამენტი",
      body: <DepartmentFilterBody />,
      onApply: handleApplyDepartments,
    },
    {
      id: 2,
      name: "პრიორიტეტი",
      body: <PriorityFilterBody />,
      onApply: handleApplyPriorities,
    },
    {
      id: 3,
      name: "თანამშრომელი",
      body: <EmployeeFilterBody />,
      onApply: handleApplyEmployee,
    },
  ];

  return (
    <div className="border-very-light-gray relative grid w-fit grid-cols-[repeat(3,200px)] items-center gap-[2.8125rem] rounded-[0.625rem] border">
      {filterOptions.map((filter) => (
        <FilterOption
          key={filter.id}
          filter={filter}
          isOpen={openedFilter === filter.id}
          setOpenedFilter={setOpenedFilter}
        />
      ))}
    </div>
  );
}

export default FilterBar;
