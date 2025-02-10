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
let currentSelectedColumn = "";

function initBord() {
  renderTasks();
}

function renderTasks() {
  const columnContainer = document.getElementById("columnContainer");
  columnContainer.innerHTML = "";
  todos.forEach((todo) => {
    let column = document.createElement("div");
    column.classList.add("column");
    column.id = todo.columnTitles;
    column.innerHTML = /*html*/ `
      <div class="task-card" id="${todo.id}" draggable="true" ondragstart="startDragging(event)" ondragover="allowDrop(event)" ondrop="moveTo(event)">
        <h3>${todo.title}</h3>
        <p>${todo.description}</p>
      </div>
    `;
    columnContainer.appendChild(column);
  });
}

function createtTaskPlus() {
  let currentSelectedColumn = document.getElementById("columnTitles");
  let title = document.getElementById("titleInput");
  let description = document.getElementById("descriptionTextarea");
  let columnTitles = document.getElementById("columnTitles");
  title = titleInput.value;
  description = descriptionTextarea.value;
  columnTitles = columnTitles;

  if (currentSelectedColumn === "In Progress") {
    columnTitles = "In progress";
  } else if (currentSelectedColumn === "Await Feedback") {
    columnTitles = "Await feedback";
  } else {
    columnTitles = "To do";
  } 

  let newTask = {
    id: todos.length + 1,
    columnTitles: columnTitles,
    category: [],
    title: title,
    description: description,
    subtasks: [],
    users: [],
    prio: [],
  };
  todos.push(newTask);
  renderTasks();
}

function createtTaskBtn() {
  let title = document.getElementById("titleInput");
  let description = document.getElementById("descriptionTextarea");
  title = titleInput.value;
  description = descriptionTextarea.value;

  let newTask = {
    id: todos.length + 1,
    columnTitles: "To Do",
    category: [],
    title: title,
    description: description,
    subtasks: [],
    users: [],
    prio: [],
  };
  todos.push(newTask);
  closeAddTaskPopUp()
  renderTasks();
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

function addTaskPopup() {
  let addNewTaskDiv = document.getElementById("addNewTaskDiv");
  addNewTaskDiv.classList.remove("d-none");
  addNewTaskDiv.innerHTML = renderAddTaskPoup();
}

function addTaskPopupPlus(event) {
  let columnTitles
  let ToDoId = document.getElementById("ToDoId");
  let InProgressId = document.getElementById("InProgressId");
  let AwaitFeedbackId = document.getElementById("AwaitFeedbackId");
  let addNewTaskDiv = document.getElementById("addNewTaskDiv");
  addNewTaskDiv.classList.remove("d-none");
  addNewTaskDiv.innerHTML = renderAddTaskPoup(event);

  if (id === ToDoId) {
    columnTitles = "To do";
    addNewTaskDiv.innerHTML = renderAddTaskPoup();
  } else if (id === InProgressId) {
    columnTitles = "In progress";
    addNewTaskDiv.innerHTML = renderAddTaskPoup();
  } else if (id === AwaitFeedbackId) {
    columnTitles = "Await feedback";
    addNewTaskDiv.innerHTML = renderAddTaskPoup();
  } 

  /*ToDoId.addEventListener("click", () => {
    addNewTaskDiv.innerHTML = renderAddTaskPoup();
  });
  InProgressId.addEventListener("click", () => {
    addNewTaskDiv.innerHTML = renderAddTaskPoup();
  });
  AwaitFeedbackId.addEventListener("click", () => {
    addNewTaskDiv.innerHTML = renderAddTaskPoup();
  });*/

  //createtTaskPlus();
}

function closeAddTaskPopUp() {
  document.getElementById("addNewTaskDiv").classList.add("d-none");
}



