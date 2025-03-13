import { useMemo } from "react";
import { useTasks } from "../api/useApis";
import useFilterStore from "../stores/useFilterStore";

export default function useFilteredTasks() {
  const { data: tasks, isLoading } = useTasks();
  const filters = useFilterStore((state) => state.filters);

  const filteredTasks = useMemo(() => {
    if (!tasks) return;

    return tasks.filter((task) => {
      // Filter by departments
      if (filters.departments.length > 0) {
        const departmentMatch = filters.departments.some(
          (d) => d.id === task.department.id,
        );

        if (!departmentMatch) return false;
      }

      // Filter by priorities
      if (filters.priorities.length > 0) {
        const priorityMatch = filters.priorities.some(
          (p) => p.id === task.priority.id,
        );
        if (!priorityMatch) return false;
      }

      // Filter by employee
      if (filters.employee) {
        if (task.employee.id !== filters.employee.id) return false;
      }

      return true;
    });
  }, [tasks, filters]);

  return { filteredTasks, isLoading };
}
