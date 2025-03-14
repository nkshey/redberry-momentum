import { useDepartments } from "../../../api/useApis";
import { useFilterInit } from "../../../hooks/useFilterInit";
import useFilterStore, { FILTER_TYPES } from "../../../stores/useFilterStore";
import CheckBox from "../../../ui/inputs/CheckBox";

function DepartmentFilterBody() {
  const { data: departments, isLoading } = useDepartments();
  const toggleDepartment = useFilterStore((state) => state.toggleDepartment);

  useFilterInit(FILTER_TYPES.DEPARTMENTS);

  if (isLoading) return <div>Loading...</div>;

  return (
    <ul className="grid max-h-38.5 gap-5.5 overflow-y-auto overscroll-none">
      {departments.map((department) => (
        <li className="select-none" key={department.id}>
          <CheckBox
            filter={department}
            filterType={FILTER_TYPES.DEPARTMENTS}
            onChange={() => toggleDepartment(department)}
          />
        </li>
      ))}
    </ul>
  );
}

export default DepartmentFilterBody;
