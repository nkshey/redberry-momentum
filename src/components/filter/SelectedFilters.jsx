import useFilterStore from "../../stores/useFilterStore";
import FilterTag from "./FilterTag";

function SelectedFilters() {
  const filters = useFilterStore((state) => state.filters);
  const removeDepartment = useFilterStore((state) => state.removeDepartment);
  const removePriority = useFilterStore((state) => state.removePriority);
  const removeEmployee = useFilterStore((state) => state.removeEmployee);
  const clearAllFilters = useFilterStore((state) => state.clearAllFilters);

  const hasActiveFilters =
    filters.departments.length > 0 ||
    filters.priorities.length > 0 ||
    filters.employee !== null;

  console.log(filters);

  return (
    <div className="my-6 flex min-h-7 items-start gap-4.5">
      <ul className="flex flex-wrap items-center gap-2">
        {filters.departments.map((department) => (
          <FilterTag
            key={department.id}
            id={department.id}
            name={department.name}
            onClick={() => removeDepartment(department.id)}
          />
        ))}

        {filters.priorities.map((priority) => (
          <FilterTag
            key={priority.id}
            id={priority.id}
            name={priority.name}
            onClick={() => removePriority(priority.id)}
          />
        ))}

        {filters.employee && (
          <FilterTag
            key={filters.employee.id}
            id={filters.employee.id}
            name={`${filters.employee.name} ${filters.employee.surname}`}
            onClick={() => removeEmployee(filters.employee.id)}
          />
        )}
      </ul>

      {hasActiveFilters && (
        <button
          className="my-[0.4375rem] cursor-pointer text-sm leading-[1em] font-light"
          onClick={clearAllFilters}
        >
          გასუფთავება
        </button>
      )}
    </div>
  );
}

export default SelectedFilters;
