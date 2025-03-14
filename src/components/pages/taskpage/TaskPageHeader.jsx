import PriorityBadge from "../../../ui/PriorityBadge";
import PageTitle from "../../PageTitle";

function TaskPageHeader({ priority, name, description }) {
  return (
    <div className="mb-15.5">
      <PriorityBadge className="text-base" priority={priority} />
      <PageTitle className="mt-3 mb-9">{name}</PageTitle>
      <p>{description}</p>
    </div>
  );
}

export default TaskPageHeader;
