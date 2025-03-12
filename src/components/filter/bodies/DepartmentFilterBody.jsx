import { useDepartments } from "../../../api/apis";
import CheckBox from "../../../ui/CheckBox";

function DepartmentFilterBody() {
  const { data: departments, isLoading } = useDepartments();

  if (isLoading) return <div>Loading...</div>;

  return (
    <ul className="grid grid-cols-[auto_auto] gap-5.5">
      {departments.map((department) => (
        <li className="select-none" key={department.id}>
          <CheckBox id={department.id}>{department.name}</CheckBox>
        </li>
      ))}
    </ul>
  );
}

export default DepartmentFilterBody;
