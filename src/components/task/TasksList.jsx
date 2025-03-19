import { useStatuses } from "../../api/useApis";
import useFilteredTasks from "../../hooks/useFilteredTasks";

import TaskCard from "./TaskCard";
import TaskStatus from "./TaskStatus";

function TasksList() {
  const { data: statuses, isLoading: statusesLoading } = useStatuses();
  const { filteredTasks, isLoading: tasksLoading } = useFilteredTasks();

  if (statusesLoading || tasksLoading) return <div>იტვირთება...</div>;

  return (
    <section className="grid grid-cols-4 gap-13 pb-7.5">
      {statuses?.map((status) => {
        const tasksForStatus = filteredTasks.filter(
          (task) => task.status.name === status.name,
        );

        return (
          <div key={status.id}>
            <TaskStatus name={status.name} />

            <ul className="flex flex-col gap-7.5">
              {tasksForStatus.length > 0 &&
                tasksForStatus.map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))}
            </ul>
          </div>
        );
      })}

      {filteredTasks.length === 0 && (
        <p className="col-span-full place-self-center">
          დავალებები არ მოიძებნა
        </p>
      )}
    </section>
  );
}

export default TasksList;
