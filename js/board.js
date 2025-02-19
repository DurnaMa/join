let todos = [
  {
    id: 1,
    columnTitles: "Await feedback",
    category: "User story",
    title: "Task 1",
    description: "Task 1 description",
    subTask: [],
    users: [],
    prio: [],
  },
  {
    id: 2,
    columnTitles: "In progress",
    category: "Technical task",
    title: "Task 2",
    description: "Task 2 description",
    subTask: [],
    users: [],
    prio: [],
  },
  {
    id: 3,
    columnTitles: "Await feedback",
    category: "",
    title: "Task 3",
    description: "Task 3 description",
    subTask: [],
    users: [],
    prio: [],
  },
  {
    id: 4,
    columnTitles: "Done",
    category: "",
    title: "Task 4",
    description: "Task 4 description",
    subTask: [],
    users: [],
    prio: [],
  },
  {
    id: 5,
    columnTitles: "In progress",
    category: "User story",
    title: "Task 5",
    description: "Task 5 description",
    subTask: [],
    users: [],
    prio: [],
  },
];

let currentDraggedElement;

function initBoard() {
  renderTasks();
}

function renderTasks() {
  document.getElementById("todo").innerHTML = "";
  document.getElementById("inprogress").innerHTML = "";
  document.getElementById("awaitfeedback").innerHTML = "";
  document.getElementById("done").innerHTML = "";

  todos.forEach((task) => {
    let taskCard = generateTaskCard(task);
    let columnId = task.columnTitles.toLowerCase().replace(" ", "");
    document.getElementById(columnId).appendChild(taskCard);
  });

  checkEmptyColumns();
}

function checkEmptyColumns() {
  document.querySelectorAll(".column").forEach((column) => {
    if (!column.hasChildNodes()) {
      column.innerHTML = generateEmptyColumn();
    } else {
      let noTasksElement = column.querySelector(".no-tasks");
      if (noTasksElement) noTasksElement.remove();
    }
  });
}

function generateEmptyColumn() {
  return /*html*/ `
    <div class="empty-column">
      <p>No tasks</p>
    </div>
  `;
}

function generateTaskCard(task) {
  let taskCard = document.createElement("div");
  taskCard.classList.add("task-card");
  taskCard.id = `task-${task.id}`;
  taskCard.draggable = true;
  taskCard.ondragstart = (event) => startDragging(event, task.id);

  taskCard.innerHTML = /*html*/ `
  <div class="task-card-div" onclick="editTaskPopup()">
    <div class="task-card-category-div">
      <div class="task-card-category">
        <h2 class="task-card-category-h2">${task.category}</h2>
      </div>
    </div>
    <h3>${task.title}</h3>
    <p>${task.description}</p>
    
    <div class="progress-container">
        <div class="progress-bar-container">
            <div class="progress-bar" id="progressBar"></div>
        </div>
        <div class="subtasks-div">
          <span class="subtasks-amount" id="subtasksAmount">0/2 Subtasks</span>
        </div>
    </div>
        <div class="task-footer">    
          <div class="task-users">
            <div class="tasks-user1 tasks-user">HA</div>
            <div class="tasks-user2 tasks-user">MD</div>
            <div class="tasks-user3 tasks-user">DL</div>
          </div>
        <div>
        <img src="/assets/icons/priom.png" alt="">
      </div>
    </div>
  `;

  let categoryElement = taskCard.querySelector(".task-card-category");
  if (categoryElement) {
    if (task.category === "User story") {
      categoryElement.style.backgroundColor = "#0038FF";
    } else if (task.category === "Technical task") {
      categoryElement.style.backgroundColor = "#1FD7C1";
    }
  }

  return taskCard;
}

function startDragging(event, id) {
  currentDraggedElement = id;
  event.dataTransfer.setData("text", id);
}

function allowDrop(event) {
  event.preventDefault();
}

function editTaskPopup() {
  let editTaskPopupDiv = document.getElementById("editTaskPopupDiv");
  editTaskPopupDiv.classList.remove("d-none");
  editTaskPopupDiv.innerHTML = renderTasksCardPopup();
}

/*function highlight(task) {
  document.getElementById(task).classList.add("drag-area-highlight");
}

function removeHighlight(task) {
  document.getElementById(task).classList.remove("drag-area-highlight");
}*/

function drop(event, column) {
  event.preventDefault();
  let taskId = event.dataTransfer.getData("text");
  let task = todos.find((t) => t.id == taskId);
  if (task) {
    task.columnTitles = column;
    renderTasks();
  }
}

function updateSteps() {
  const checkboxes = document.querySelectorAll('.step input[type="checkbox"]');
  let checkedCount = 0;
  checkboxes.forEach((checkbox, index) => {
    const label = checkbox.nextElementSibling;
    if (checkbox.checked) {
      label.style.color = "#4599FF";
      checkedCount++;
    } else {
      label.style.color = "black";
    }
  });

  const progressBar = document.getElementById("progressBar");
  const progressPercentage = (checkedCount / checkboxes.length) * 100;
  progressBar.style.width = progressPercentage + "%";
}

function addTaskPopupPlusToDoBtn() {
  let addNewTaskDiv = document.getElementById("addNewTaskDiv");
  addNewTaskDiv.classList.remove("d-none");
  addNewTaskDiv.innerHTML = renderAddTaskPopupToDoPlus();
}

function addTaskPopupPlusInProgressBtn() {
  let addNewTaskDiv = document.getElementById("addNewTaskDiv");
  addNewTaskDiv.classList.remove("d-none");
  addNewTaskDiv.innerHTML = renderAddTaskPopupInProgressPlus();
}

function addTaskPopupPlusAwaitFeedbackBtn() {
  let addNewTaskDiv = document.getElementById("addNewTaskDiv");
  addNewTaskDiv.classList.remove("d-none");
  addNewTaskDiv.innerHTML = renderAddTaskPopupAwaitFeedbackPlus();
}

function createTaskPlusToDoBtn() {
  let title = document.getElementById("titleInput").value;
  let description = document.getElementById("descriptionTextarea").value;

  let newTask = {
    id: todos.length + 1,
    columnTitles: "To do",
    category: "",
    title: title,
    description: description,
    subTask: [],
    users: [],
    prio: [],
  };

  todos.push(newTask);
  renderTasks();
  closeAddTaskPopUp();
}

function createTaskPlusInProgressBtn() {
  let title = document.getElementById("titleInput").value;
  let description = document.getElementById("descriptionTextarea").value;

  let newTask = {
    id: todos.length + 1,
    columnTitles: "In progress",
    category: "",
    title: title,
    description: description,
    subTask: [],
    users: [],
    prio: [],
  };

  todos.push(newTask);
  renderTasks();
  closeAddTaskPopUp();
}

function createTaskPlusAwaitFeedbackBtn() {
  let title = document.getElementById("titleInput").value;
  let description = document.getElementById("descriptionTextarea").value;

  let newTask = {
    id: todos.length + 1,
    columnTitles: "Await feedback",
    category: "",
    title: title,
    description: description,
    subTask: [],
    users: [],
    prio: [],
  };

  todos.push(newTask);
  renderTasks();
  closeAddTaskPopUp();
}

function closeAddTaskPopUp() {
  document.getElementById("addNewTaskBtnDiv").classList.add("d-none");
}

function closeTaskCardPopUp() {
  document.getElementById("editTaskPopupDiv").classList.add("d-none");
}

function addTaskPopupBtn() {
  let addNewTaskBtnDiv = document.getElementById("addNewTaskBtnDiv");
  addNewTaskBtnDiv.classList.remove("d-none");
  addNewTaskBtnDiv.innerHTML = renderAddTaskPoupBtn();
}

function createtTaskBtn() {
  let title = document.getElementById("titleInput").value;
  let description = document.getElementById("descriptionTextarea").value;
  let category = document.getElementById("category").value;
  let subTask = document.getElementById("subTask").value;
  //let addUser = document.getElementById('')

  let newTask = {
    id: todos.length + 1,
    columnTitles: "To Do",
    category: category,
    title: title,
    description: description,
    subTask: subTask,
    users: [],
    prio: "",
  };

  todos.push(newTask);
  renderTasks();
  //closeAddTaskPopUp();
}

function addSubTaskPopUp() {
  if (subTaskPopUp.value != "") {
    subTasks.push({
      description: subTaskPopUp.value,
    });
    renderSubTaskList();
    subTaskPopUp.value = "";
  }
}
