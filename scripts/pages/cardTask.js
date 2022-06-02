export const renderCard= (task) => {
  return `
  <li>
    <div class="option-checkbox">
      <input 
        data-id=${task.id}
        type="checkbox" 
        id="important-${task.important}" 
        name="important"
        class="checkbox-important"
        value="important"
        ${task.completed ? "checked" : ""}
      >
      <label for="important">
        ${task.title}
      </label><br>
    </div>

    <i class="fa fa-info-circle ${task.important ? "important" : ""}" aria-hidden="true"></i>
  </li>
  ${task.due_date ?
    `<p>${(new Date(task.due_date)).toDateString()}</p>` :
    ""}
  `
}
// Sunday, Octber 03