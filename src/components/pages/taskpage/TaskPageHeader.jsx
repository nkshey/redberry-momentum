import PriorityBadge from "../../../ui/PriorityBadge";
import PageTitle from "../../PageTitle";

function TaskPageHeader({ priority, name, description }) {
  return (
    <div className="mb-15.5">
      <PriorityBadge className="text-base" priority={priority} />
      <PageTitle className="mt-3 mb-9 leading-[1em]">{name}</PageTitle>
      <p
        className={`line-clamp-2 ${description ? "text-gray" : "text-very-light-gray"}`}
      >
        {description || "აღწერა არ არის..."}
      </p>
    </div>
  );
}

export default TaskPageHeader;
