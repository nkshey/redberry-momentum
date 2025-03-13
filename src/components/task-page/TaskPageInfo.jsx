import PriorityBadge from "../../ui/PriorityBadge";
import PageTitle from "../PageTitle";

function TaskPageInfo({ task }) {
  return (
    <div className="mb-15.5">
      <PriorityBadge priority={task.priority} />
      <PageTitle className="mt-3 mb-9">{task.name}</PageTitle>
      <p>{task.description}</p>
    </div>
  );
}

export default TaskPageInfo;
