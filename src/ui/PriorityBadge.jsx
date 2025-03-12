import { priorityColors } from "../utils/constants";

function PriorityBadge({ priority }) {
  return (
    <div
      className="flex h-6.5 w-21.5 items-center justify-center gap-1 rounded-sm border text-xs"
      style={{
        borderColor: priorityColors[priority.name],
        color: priorityColors[priority.name],
      }}
    >
      <img src={priority.icon} alt={priority.name} />
      {priority.name}
    </div>
  );
}

export default PriorityBadge;
