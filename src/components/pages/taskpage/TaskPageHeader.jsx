import PriorityBadge from "../../../ui/PriorityBadge";
import { departmentColors } from "../../../utils/constants";
import PageTitle from "../../PageTitle";

function TaskPageHeader({ priority, name, description, department }) {
  const departmentColorClass = departmentColors[department] || "bg-light-pink";

  return (
    <div className="mb-15.5">
      <div className="flex items-center gap-4.5">
        <PriorityBadge className="h-8 px-1.5 text-base" priority={priority} />
        <span
          className={`${departmentColorClass} grid place-content-center rounded-full px-2.5 py-[0.4375rem] leading-[1em] text-white`}
        >
          {department}
        </span>
      </div>

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
