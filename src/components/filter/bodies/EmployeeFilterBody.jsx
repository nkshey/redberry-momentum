import { useEmployees } from "../../../api/useApis";
import { useFilterInit } from "../../../hooks/useFilterInit";
import useFilterStore, { FILTER_TYPES } from "../../../stores/useFilterStore";
import CheckBox from "../../../ui/inputs/CheckBox";

function EmployeeFilterBody() {
  const { data: employees, isLoading } = useEmployees();
  const setTempEmployee = useFilterStore((state) => state.setTempEmployee);

  useFilterInit(FILTER_TYPES.EMPLOYEE);

  if (isLoading) return <div>Loading...</div>;

  return (
    <ul className="grid grid-cols-[auto_auto] gap-5.5">
      {employees.map((employee) => (
        <li className="leading-[1em] select-none" key={employee.id}>
          <CheckBox
            filter={employee}
            filterType={FILTER_TYPES.EMPLOYEE}
            onChange={() => setTempEmployee(employee)}
          />
        </li>
      ))}
    </ul>
  );
}

export default EmployeeFilterBody;
