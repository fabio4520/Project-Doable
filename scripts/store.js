import { getTasks } from "./services/tasks-services.js"

async function fetchTasks() {
  const tasks = await getTasks();
  this.tasks = [...tasks];
  this.completed = tasks
    .filter((task) => task.completed === true)
    .reverse();
  this.important = tasks
    .filter((task) => task.important === true)
    .reverse();
  this.pending = tasks
    .filter((task) => task.completed === false)
    .reverse();
}

function deleteTask(id) {
  this.tasks = this.tasks.filter((task) => task.id != id);
  this.completed = this.favorites.filter((task) => task.id != id);
  this.important = this.favorites.filter((task) => task.id != id);
  this.pending = this.favorites.filter((task) => task.id != id);
}

let STORE = {
  tasks: [],
  completed: [],
  pending: [],
  importants: [],
  fetchTasks,
  deleteTask
};

export default STORE;
