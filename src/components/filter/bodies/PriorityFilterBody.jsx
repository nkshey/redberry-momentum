import { usePriorities } from "../../../api/useApis";
import CheckBox from "../../../ui/CheckBox";

function PriorityFilterBody() {
  const { data: priorities, isLoading } = usePriorities();

  if (isLoading) return <div>Loading...</div>;

  return (
    <ul className="grid gap-5.5">
      {priorities.map((priority) => (
        <li className="select-none" key={priority.id}>
          <CheckBox id={priority.id}>{priority.name}</CheckBox>
        </li>
      ))}
    </ul>
  );
}

export default PriorityFilterBody;
