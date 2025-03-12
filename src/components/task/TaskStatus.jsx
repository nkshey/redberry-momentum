import { statusColors } from "../../utils/constants";

function TaskStatus({ name }) {
  return (
    <h2
      className="mb-7.5 grid h-13.5 place-content-center rounded-[0.625rem] px-4 text-center text-[1.25rem] font-medium text-white"
      style={{ backgroundColor: statusColors[name] }}
    >
      {name}
    </h2>
  );
}

export default TaskStatus;
