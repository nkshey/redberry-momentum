import axios from "axios";

const token = import.meta.env.VITE_REDBERRY_TOKEN;

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

export async function getCommentsById(taskId) {
  const { data } = await axios.get(
    `https://momentum.redberryinternship.ge/api/tasks/${taskId}/comments`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return data;
}

// Post Requests
export async function addCommentToTask(taskId, text, parent_id = null) {
  const { data } = await axios.post(
    `https://momentum.redberryinternship.ge/api/tasks/${taskId}/comments`,
    {
      text,
      parent_id,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    },
  );
  return data;
}

export async function addTask(formData) {
  const { data } = await axios.post(
    `https://momentum.redberryinternship.ge/api/tasks`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    },
  );
  return data;
}

// Put Requests
export async function updateTaskStatus(taskId, status_id) {
  const { data } = await axios.put(
    `https://momentum.redberryinternship.ge/api/tasks/${taskId}`,
    {
      status_id,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    },
  );
  return data;
}
