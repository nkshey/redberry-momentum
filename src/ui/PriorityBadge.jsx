import { priorityColors } from "../utils/constants";

function PriorityBadge({ priority, className }) {
  return (
    <div
      className={`flex w-max items-center justify-center gap-1 rounded-sm border p-1 ${className}`}
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
