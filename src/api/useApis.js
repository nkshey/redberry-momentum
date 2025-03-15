import { useQuery } from "@tanstack/react-query";
import {
  fetchStatuses,
  fetchTasks,
  getTaskById,
  fetchDepartments,
  fetchPriorities,
  fetchEmployees,
  getCommentsById,
} from "./fetchers";

export function useStatuses() {
  return useQuery({
    queryKey: ["statuses"],
    queryFn: fetchStatuses,
  });
}

export function useTasks() {
  return useQuery({
    queryKey: ["tasks"],
    queryFn: fetchTasks,
  });
}

export function useSpecificTask(id) {
  return useQuery({
    queryKey: ["task", id],
    queryFn: () => getTaskById(id),
  });
}

export function useComments(id) {
  return useQuery({
    queryKey: ["comments", id],
    queryFn: () => getCommentsById(id),
  });
}

export function useDepartments() {
  return useQuery({
    queryKey: ["departments"],
    queryFn: fetchDepartments,
  });
}

export function usePriorities() {
  return useQuery({
    queryKey: ["priorities"],
    queryFn: fetchPriorities,
  });
}

export function useEmployees() {
  return useQuery({
    queryKey: ["employees"],
    queryFn: fetchEmployees,
  });
}
