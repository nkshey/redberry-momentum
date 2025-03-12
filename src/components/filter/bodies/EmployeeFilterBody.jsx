import { useEmployees } from "../../../api/useApis";
import CheckBox from "../../../ui/CheckBox";

function EmployeeFilterBody() {
  const { data: employees, isLoading } = useEmployees();

  if (isLoading) return <div>Loading...</div>;

  return (
    <ul className="grid grid-cols-[auto_auto] gap-5.5">
      {employees.map((employee) => (
        <li className="leading-[1em] select-none" key={employee.id}>
          <CheckBox id={employee.id}>
            <div className="flex items-center gap-[0.625rem]">
              <img
                className="size-7 rounded-full object-cover"
                src={employee.avatar}
                alt={`${employee.name} ${employee.surname}`}
              />
              <span>
                {employee.name} {employee.surname}
              </span>
            </div>
          </CheckBox>
        </li>
      ))}
    </ul>
  );
}

export default EmployeeFilterBody;
