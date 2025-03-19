import { useParams } from "react-router-dom";
import { useSpecificTask } from "../api/useApis";

import Loader from "../ui/feedback/Loader";
import TaskPageHeader from "../components/pages/taskpage/TaskPageHeader";
import TaskPageTaskDetails from "../components/pages/taskpage/TaskPageTaskDetails";
import CommentsSection from "../components/pages/taskpage/comments/CommentsSection";
import NotFoundPage from "./NotFoundPage";

function TaskPage() {
  const { id } = useParams();
  const { data: task, isLoading: taskLoading, isError } = useSpecificTask(id);

  if (taskLoading) return <Loader className="h-[calc(100dvh-13rem)]" />;

  if (isError || !task) {
    return <NotFoundPage />;
  }

  return (
    <div className="grid grid-cols-[1fr_1.035fr] gap-56">
      <section>
        <TaskPageHeader
          priority={task.priority}
          department={task.department.name}
          name={task.name}
          description={task.description}
        />

        <TaskPageTaskDetails
          taskId={task.id}
          status={task.status}
          employeeAvatar={task.employee.avatar}
          employeeDepartment={task.employee.department.name}
          employeeName={`${task.employee.name} ${task.employee.surname}`}
          dueDate={task.due_date}
        />
      </section>

      <CommentsSection taskId={id} />
    </div>
  );
}

export default TaskPage;
