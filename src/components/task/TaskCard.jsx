import { Link } from "react-router-dom";
import { formatDate } from "../../utils/helpers";
import { departmentColors, statusColors } from "../../utils/constants";

import CommentsIcon from "../../ui/icons/CommentsIcon";
import PriorityBadge from "../../ui/PriorityBadge";

function TaskCard({ task }) {
  return (
    <Link
      className="task-card flex cursor-pointer flex-col gap-7 rounded-[0.9375rem] p-5"
      style={{
        "--status-color": statusColors[task.status.name],
      }}
      to={`/task/${task.id}`}
    >
      <Header
        priority={task.priority}
        department={task.department.name}
        date={task.due_date}
      />
      <Info name={task.name} description={task.description} />
      <Author employee={task.employee} comments={task.total_comments} />
    </Link>
  );
}

function Header({ priority, department, date }) {
  const departmentColorClass = departmentColors[department] || "bg-light-pink";

  return (
    <div className="flex items-center justify-between gap-2.5">
      <div className="flex items-center gap-2.5">
        <PriorityBadge className="text-xs" priority={priority} />

        <span
          className={`${departmentColorClass} h-6 w-22 truncate rounded-full px-2 py-1.5 text-xs leading-[1em] text-white`}
        >
          {department}
        </span>
      </div>

      <p className="text-xs">{formatDate(date)}</p>
    </div>
  );
}

function Info({ name, description }) {
  return (
    <div className="px-[0.65625rem]">
      <p className="mb-3 truncate text-[0.9375rem] font-medium">{name}</p>
      <p
        className={`line-clamp-2 min-h-[calc(1.2em*2)] text-sm leading-[1.2em] ${description ? "text-gray" : "text-very-light-gray"}`}
      >
        {description || "აღწერა არ არის..."}
      </p>
    </div>
  );
}

function Author({ employee, comments }) {
  return (
    <div className="flex items-center justify-between">
      <img
        className="size-8 rounded-full object-cover object-top"
        src={employee.avatar}
        alt={`${employee.name} ${employee.surname}`}
      />

      <div className="flex items-center gap-1 text-sm">
        <CommentsIcon />
        <span>{comments}</span>
      </div>
    </div>
  );
}

export default TaskCard;
