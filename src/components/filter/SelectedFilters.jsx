import useFilterStore from "../../stores/useFilterStore";
import FilterTag from "./FilterTag";

function SelectedFilters() {
  const filters = useFilterStore((state) => state.filters);
  const removeDepartment = useFilterStore((state) => state.removeDepartment);
  const removePriority = useFilterStore((state) => state.removePriority);
  const removeEmployee = useFilterStore((state) => state.removeEmployee);

  return (
    <ul className="my-6 flex min-h-7 items-center gap-2">
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
  );
}

export default SelectedFilters;
