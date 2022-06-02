import { renderHeader } from "../components/header.js";
import STORE from "../store.js";
import { renderCard } from "./cardTask.js";

function renderHome() {
  return `
    ${renderHeader()}

    <div>
      <span>Sort</span>
      <select name="" id="">
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
      ${STORE.tasks
        .map(task => renderCard(task))
        .join("")}
    </ul>


    <form action="" class="form">
      <input type="text" name="title" id="title" placeholder="do the dishes...">
      <input type="date" name="dueDate" id="dueDate">
      <button type="submit">Add Task</button>
    </form>

  `
}

export const HomePage = {
  toString() {
    return renderHome();
  },
  addListeners() {
    // listenCreate(),
    //   calcMainAddBtn(),
    //   listenToUnFavorite(),
    //   listenLogout(),
    //   listenToFavorite(),
    //   openContact();
  },
};
