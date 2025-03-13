import { formatDate } from "../../utils/helpers";
import CommentsIcon from "../../ui/icons/CommentsIcon";
import PriorityBadge from "../../ui/PriorityBadge";
import { Link } from "react-router-dom";
import { statusColors } from "../../utils/constants";

function TaskCard({ task }) {
  return (
    <Link
      className="task-card flex cursor-pointer flex-col gap-7 rounded-[0.9375rem] p-5"
      style={{
        "--status-color": statusColors[task.status.name],
      }}
      to={`/task/${task.id}`}
    >
      <Header priority={task.priority} date={task.due_date} />
      <Info name={task.name} description={task.description} />
      <Author employee={task.employee} comments={task.total_comments} />
    </Link>
  );
}

function Header({ priority, date }) {
  return (
    <div className="flex items-center justify-between gap-2.5">
      <div className="flex items-center gap-2.5">
        <PriorityBadge priority={priority} />

        <span className="bg-light-pink grid h-6 w-22 place-content-center rounded-full text-xs text-white">
          დიზაინი
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
      <p className="text-gray line-clamp-2 text-sm">{description}</p>
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
