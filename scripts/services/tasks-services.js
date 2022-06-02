import apiFetch from "./api-fetch.js";

export async function getTasks() {
  return apiFetch("tasks");
}

export async function createTasks(
  newtask = { title, due_date }
) {
  return apiFetch("tasks", { body: newtask });
}

export async function deleteTasks(id) {
  return apiFetch("tasks/" + id, { method: "DELETE" });
}

export async function editTasks(
  id,
  payload = { title, due_date }
) {
  const { token, ...contact } = await apiFetch("tasks/" + id, {
    method: "PATCH",
    body: payload,
  });
  return contact;
}

export async function showTask(id) {
  return apiFetch("tasks/" + id);
}