import { useStatuses, useTasks } from "../../api/useApis";
import useFilterStore from "../../stores/useFilterStore";
import TaskCard from "./TaskCard";
import TaskStatus from "./TaskStatus";

function TasksList() {
  const { data: statuses, isLoading: statusesLoading } = useStatuses();
  const { data: tasks, isLoading: tasksLoading } = useTasks();
  const temp = useFilterStore((state) => state.temp);

  console.log(temp);

  if (statusesLoading || tasksLoading) return <div>Loading...</div>;

  return (
    <div className="grid grid-cols-4 gap-13">
      {statuses?.map((status) => (
        <div key={status.id}>
          <TaskStatus name={status.name} />

          <ul className="flex flex-col gap-7.5">
            {tasks
              .filter((task) => task.status.name === status.name)
              .map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default TasksList;
