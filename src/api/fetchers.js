import axios from "axios";

const token = import.meta.env.VITE_REDBERRY_TOKEN;

// Token Needed
export async function fetchTasks() {
  const { data } = await axios.get(
    "https://momentum.redberryinternship.ge/api/tasks",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return data;
}

export async function getTaskById(id) {
  const { data } = await axios.get(
    `https://momentum.redberryinternship.ge/api/tasks/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return data;
}

export async function fetchEmployees() {
  const { data } = await axios.get(
    "https://momentum.redberryinternship.ge/api/employees",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return data;
}

// No Token Needed
export async function fetchStatuses() {
  const { data } = await axios.get(
    "https://momentum.redberryinternship.ge/api/statuses",
  );
  return data;
}

export async function fetchDepartments() {
  const { data } = await axios.get(
    "https://momentum.redberryinternship.ge/api/departments",
  );
  return data;
}

export async function fetchPriorities() {
  const { data } = await axios.get(
    "https://momentum.redberryinternship.ge/api/priorities",
  );
  return data;
}
