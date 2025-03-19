import { usePriorities } from "../../../api/useApis";
import { useFilterInit } from "../../../hooks/useFilterInit";
import useFilterStore, { FILTER_TYPES } from "../../../stores/useFilterStore";
import CheckBox from "../../../ui/inputs/CheckBox";

function PriorityFilterBody() {
  const { data: priorities, isLoading } = usePriorities();
  const togglePriority = useFilterStore((state) => state.togglePriority);

  useFilterInit(FILTER_TYPES.PRIORITIES);

  if (isLoading) return <div>იტვირთება...</div>;

  return (
    <ul className="grid max-h-38.5 gap-5.5 overflow-y-auto overscroll-none">
      {priorities.map((priority) => (
        <li className="select-none" key={priority.id}>
          <CheckBox
            filter={priority}
            filterType={FILTER_TYPES.PRIORITIES}
            onChange={() => togglePriority(priority)}
          />
        </li>
      ))}
    </ul>
  );
}

export default PriorityFilterBody;
