import { renderHeader } from "../components/header.js";
import STORE from "../store.js";
import { renderCard } from "./cardTask.js";
import DOMHandler from "../dom-handler.js"
import { createTasks, editTasks } from "../services/tasks-services.js";

function renderHome() {
  // console.log(STORE.tasks)
  return `
    ${renderHeader()}

    <div>
      <span>Sort</span>
      <select name="sort" id="my-select">
      <option value="" disabled selected>Select your option</option>
        <option value="alphabetical">Alphabetical (a-z)</option>
        <option value="dueDate">Due date</option>
        <option value="importance">Importance</option>
      </select>
    </div>

    <div>
      <span>Show</span>
      <div class="option-checkbox">
        <input type="checkbox" id="pending" name="pending" value="pending">
        <label for="pending">Pending</label><br>
      </div>
      <div class="option-checkbox">
        <input type="checkbox" id="important" name="important" value="important">
        <label for="important">Important</label><br>
      </div>
    </div>
    
    <ul>
      ${
    STORE.tasks
        .map(task => renderCard(task))
        .join("")
      }
    </ul>


    <form action="" class="form">
      <input type="text" name="title" id="title" placeholder="do the dishes...">
      <input type="date" name="dueDate" id="dueDate">
      <button type="submit">Add Task</button>
    </form>

  `
}

function orderAlphabetical() {
  let alphaTasks = STORE.tasks.sort((a, b) => a.title.localeCompare(b.title))
  STORE.tasks = alphaTasks;
}
function orderDueDate() {
  let dueDateTasks = [...STORE.tasks
    .filter(t => t.due_date)
    .sort((a, b) => a.due_date.localeCompare(b.due_date))
                      ]
  dueDateTasks.push(...STORE.tasks.filter(t => t.due_date == null))
  STORE.tasks = dueDateTasks
}
function orderImportance() {
  let importantTasks = [...STORE.tasks
    .filter(t => t.important)
    .sort((a, b) => a.title.localeCompare(b.title))
  ]
  importantTasks
    .push(...(STORE.tasks.filter(t => t.important == false).sort((a, b) => a.title.localeCompare(b.title))))
  STORE.tasks = importantTasks
}
function listenSort() {
  const select = document.querySelector("#my-select");

  select.addEventListener('change', (event) => {
    switch (event.target.value) {
      case "alphabetical":
        orderAlphabetical();
        console.log("alphabetical");
        DOMHandler.reload()
        break;
      case "dueDate":
        orderDueDate();
        console.log("dueDate");
        DOMHandler.reload()
        break;
      case "importance":
        console.log("importance");
        orderImportance();
        DOMHandler.reload()
        break;
    
      default:
        break;
    }
  })
  
  
  
}
function listenToComplete() {
  let completed = document.querySelectorAll(".checkbox-important")
  
  completed.forEach(c => {
    c.addEventListener('change', async (event) => {
      console.log(c);
      try {
        const completedLink = event.target.closest("[data-id]");
        const id = completedLink.dataset.id;

        if (STORE.completed.find((e) => e.id == id)) {
          await editTasks(id, { completed: false }); // request api
          STORE.pendingTasks(id);
        } else {
          await editTasks(id, { completed: true }); // request api
          STORE.completedTask(id);
        }
      } catch (error) {
        console.log(error);
      }
    })
  })
}
function listenAddTask() {
  const form = document.querySelector(".form")
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    try {
      
      
      const credentials = {
        title: document.querySelector("#title").value,
        due_date: document.querySelector("#dueDate").value
      }
      
      console.log(credentials);

      setTimeout(function () {
        // loadingPage();
        setTimeout(async () => {
          const newCard = await createTasks(credentials)
          STORE.tasks.push(newCard)
          DOMHandler.reload();
        }, 500);
      }, 500);
    } catch (error) {
      console.log(error);
    }
  })
}
export const HomePage = {
  toString() {
    return renderHome();
  },
  addListeners() {
    listenSort(),
      listenToComplete(),
      listenAddTask()
  },
};
