let todos = [
  {
    id: 1,
    columnTitles: "To do",
    category: "User story",
    title: "Task 1",
    description: "Task 1 description",
    subtasks: [],
    users: [],
    prio: [],
  },
  {
    id: 2,
    columnTitles: "In progress",
    category: "Technical task",
    title: "Task 2",
    description: "Task 2 description",
    subtasks: [],
    users: [],
    prio: [],
  },
  {
    id: 3,
    columnTitles: "Await feedback",
    category: [],
    title: "Task 3",
    description: "Task 3 description",
    subtasks: [],
    users: [],
    prio: [],
  },
  {
    id: 4,
    columnTitles: "Done",
    category: [],
    title: "Task 4",
    description: "Task 4 description",
    subtasks: [],
    users: [],
    prio: [],
  },
];

let currentDraggedElement;
let currentSelectedTask;

function initBord() {
  renderTasks();
}

function renderTasks() {
  const columnContainer = document.getElementById("columnContainer");
  columnContainer.innerHTML = "";
  todos.forEach((todo) => {
    let column = document.createElement("div");
    column.classList.add("column");
    column.innerHTML = /*html*/ `
      <h2 class="column-titles-h2">${todo.columnTitles}<button class="add-column"><img src="/assets/icons/plusblack.png" alt=""></button></h2>
      <div class="task-card" id="${todo.id}" draggable="true" ondragstart="startDragging(event)" ondragover="allowDrop(event)" ondrop="moveTo(event)">
        <h3>${todo.title}</h3>
        <p>${todo.description}</p>
      </div>
    `;
    columnContainer.appendChild(column);
  });
}

function startDragging(event) {
  currentDraggedElement = event.target;
}

function allowDrop(event) {
  event.preventDefault();
}

function moveTo(event) {
  event.preventDefault();
  event.target.appendChild(currentDraggedElement);  
}






