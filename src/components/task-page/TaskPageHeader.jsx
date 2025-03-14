import PriorityBadge from "../../ui/PriorityBadge";
import PageTitle from "../PageTitle";

function TaskPageHeader({ task }) {
  return (
    <div className="mb-15.5">
      <PriorityBadge className="text-base" priority={task.priority} />
      <PageTitle className="mt-3 mb-9">{task.name}</PageTitle>
      <p>{task.description}</p>
    </div>
  );
}

export default TaskPageHeader;
