import { useEmployees } from "../../../api/useApis";
import { useFilterInit } from "../../../hooks/useFilterInit";
import useFilterStore, { FILTER_TYPES } from "../../../stores/useFilterStore";
import Loader from "../../../ui/feedback/Loader";
import CheckBox from "../../../ui/inputs/CheckBox";

function EmployeeFilterBody() {
  const { data: employees, isLoading } = useEmployees();
  const setTempEmployee = useFilterStore((state) => state.setTempEmployee);

  useFilterInit(FILTER_TYPES.EMPLOYEE);

  if (isLoading) return <Loader />;

  return (
    <ul className="grid max-h-44.5 gap-5.5 overflow-y-auto overscroll-none">
      {employees.length === 0 && <p>თანამშრომელი არ მოიძებნა</p>}

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
