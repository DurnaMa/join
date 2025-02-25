let todos = [
  {
    id: 1,
    columnTitles: "Await feedback",
    category: "User story",
    title: "Task 1",
    description: "Task 1 description",
    dueDate: "2024/10/10",
    subTask: [{ name: "test1", completed: false }, { name: "test2", completed: false }],
    users: [{ initial: "HA", completed: false }, { initial: "AL", completed: false }, { initial: "MD", completed: false }],
    prio: [],
  },
  {
    id: 2,
    columnTitles: "In progress",
    category: "Technical task",
    title: "Task 2",
    description: "Task 2 description",
    dueDate: "2024/10/15",
    subTask: [{ name: "test3", completed: false }, { name: "test4", completed: false }],
    users: [{ initial: "FK", completed: false }, { initial: "DL", completed: false }, { initial: "MD", completed: false }],
    prio: [],
  },
  {
    id: 3,
    columnTitles: "Await feedback",
    category: "User story",
    title: "Task 3",
    description: "Task 3 description",
    dueDate: "2024/10/20",
    subTask: [{ name: "test5", completed: false }, { name: "test6", completed: false },{ name: "test6.3", completed: false },{ name: "test6.4", completed: false },{ name: "test6.5", completed: false }],
    users: [{ initial: "HA", completed: false }, { initial: "DL", completed: false }, { initial: "RT", completed: false }],
    prio: [],
  },
  {
    id: 4,
    columnTitles: "Done",
    category: "Technical task",
    title: "Task 4",
    description: "Task 4 description",
    dueDate: "2024/10/25",
    subTask: [{ name: "test7", completed: false }, { name: "test8", completed: false }],
    users: [{ initial: "HA", completed: false }, { initial: "DL", completed: false }, { initial: "MD", completed: false }],
    prio: [],
  },{
    id: 5,
    columnTitles: "To Do",
    category: "User story",
    title: "Task 5",
    description: "Task 5 description",
    dueDate: "2024/10/30",
    subTask: [{ name: "test9", completed: false }, { name: "test10", completed: false }],
    users: [{ initial: "WE", completed: false }, { initial: "KS", completed: false }, { initial: "VB", completed: false }],
    prio: [{ name: "urgent", completed: false }, { name: "medium", completed: false }, { name: "low", completed: false }],
  }
];


let currentDraggedElement;
let currentSelectedTask;
let currentUsers = [];
let currentPrio = [];

async function initBoard() {
  await loadDataUsers();
  renderTasks();
}

function renderTasks() {
  document.getElementById("todo").innerHTML = "";
  document.getElementById("inprogress").innerHTML = "";
  document.getElementById("awaitfeedback").innerHTML = "";
  document.getElementById("done").innerHTML = "";

  todos.forEach((task) => {
    let taskCard = generateTaskCard(task);
    let columnId = task.columnTitles ? task.columnTitles.toLowerCase().replace(" ", "") : "todo";
    document.getElementById(columnId).appendChild(taskCard);
  });

  checkEmptyColumns();
}

function checkEmptyColumns() {
  document.querySelectorAll(".column").forEach((column) => {
    if (!column.hasChildNodes() || column.children.length === 0) {
      column.innerHTML = generateEmptyColumn(column.id);
    } else {
      let noTasksElement = column.querySelector(".no-tasks");
      if (noTasksElement) noTasksElement.remove();
    }
  });
}

function generateEmptyColumn(columnId) {
  let text = "";
  switch (columnId) {
    case "todo":
      text = "No tasks To Do";
      break;
    case "inprogress":
      text = "No tasks In Progress";
      break;
    case "awaitfeedback":
      text = "No tasks Await Feedback";
      break;
    case "done":
      text = "No tasks Done";
      break;
  }

  return /*html*/ `
    <div class="empty-column">
      <p>${text}</p>
    </div>
  `;
}

function generateTaskCard(task) {
  let completedSubtasks = task.subTask ? task.subTask.filter(st => st.completed).length : 0;
  let totalSubtasks = task.subTask ? task.subTask.length : 0;
  
  let taskCard = document.createElement("div");
  taskCard.classList.add("task-card");
  taskCard.id = `task-${task.id}`;
  taskCard.draggable = true;
  taskCard.ondragstart = (event) => startDragging(event, task.id);

  taskCard.innerHTML = /*html*/ `
  <div class="task-card-div" onclick="openTaskPopup(${task.id})">
    <div class="task-card-category-div">
      <div class="task-card-category">
        <h2 class="task-card-category-h2">${task.category}</h2>
      </div>
    </div>
    <h3>${task.title}</h3>
    <p>${task.description}</p>
    
    <div class="progress-container">
        <div class="progress-bar-container">
            <div class="progress-bar" id="progressBar-${task.id}" style="width: ${(completedSubtasks / totalSubtasks) * 100}%;"></div>
        </div>
        <div class="subtasks-div">
          <span class="subtasks-amount" id="subtasksAmount-${task.id}">${completedSubtasks}/${totalSubtasks} Subtasks</span>
        </div>
    </div>
    <div class="task-footer">    
      <div class="task-users">
          <div class="tasks-user1 tasks-user">${task.users[0].initial}</div>
          <div class="tasks-user2 tasks-user">${task.users[1].initial}</div>
          <div class="tasks-user3 tasks-user">${task.users[2].initial}</div>
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

function searchTask() {
  let searchTaskInput = document.getElementById("searchTask").value.toLowerCase();
  let allTasks = document.querySelectorAll(".task-card");

  allTasks.forEach(task => {
      let title = task.querySelector("h3").innerText.toLowerCase();
      let description = task.querySelector("p").innerText.toLowerCase();

      if (title.includes(searchTaskInput) || description.includes(searchTaskInput)) {
          task.style.display = "block";  
      } else {
          task.style.display = "none";   
      }
  });

  searchTaskInput.innerHTML = "";
  checkEmptyColumns();
}

document.getElementById("searchTask").addEventListener("keyup", searchTask);

function startDragging(event, id) {
  currentDraggedElement = id;
  event.dataTransfer.setData("text", id);
}

function allowDrop(event) {
  event.preventDefault();
}

function drop(event, column) {
  event.preventDefault();
  let taskId = event.dataTransfer.getData("text");
  let task = todos.find((t) => t.id == taskId);
  if (task) {
    task.columnTitles = column;
    renderTasks();
  }
}

function openTaskPopup(taskId) {
  let id = todos.findIndex((task) => task.id == taskId);
  let currentSelectedTask = todos[id];
  
  let openTaskPopupDiv = document.getElementById("openTaskPopupDiv");
  openTaskPopupDiv.classList.remove("d-none");
  openTaskPopupDiv.innerHTML = renderTasksCardPopup(currentSelectedTask);
}

function editTaskPopup(taskId) {
  let id = todos.findIndex((task) => task.id == taskId);
  let currentSelectedTask = todos[id];
  
  let editTaskPopupDiv = document.getElementById("editTaskPopupDiv");
  let openTaskPopupDiv = document.getElementById("openTaskPopupDiv");
  openTaskPopupDiv.classList.add("d-none");
  editTaskPopupDiv.classList.remove("d-none");
  editTaskPopupDiv.innerHTML = renderEditTasksCardPopup(currentSelectedTask);
}

async function editTask(taskId) {
  let id = todos.findIndex((task) => task.id == taskId);
  let currentSelectedTask = todos[id];
  let task = currentSelectedTask;
  let taskCard = document.getElementById(`task-${taskId}`);

  let title = document.getElementById("titleInput").value;
  let description = document.getElementById("descriptionTextarea").value;
  let category = document.getElementById("category").value;
  let dueDate = document.getElementById("date").value;
  let priority = document.getElementById("prio").value;
  let prioUrgentEdit = document.getElementById("prioUrgentEdit").value;
  let prioMediumEdit = document.getElementById("prioMediumEdit").value;
  let prioLowEdit = document.getElementById("prioLowEdit").value;
  let subTask = document.getElementById("subTask").value;

  let taskCardContent = {
    title: title,
    description: description,
    category: category,
    dueDate: dueDate,
    priority: priority,
    prioUrgentEdit: prioUrgentEdit,
    prioMediumEdit: prioMediumEdit,
    prioLowEdit: prioLowEdit,
    subTask: subTask
  };

try {
  await postDataToFirebase(`tasks/${taskId}`, taskCardContent);
} catch (error) {
  console.error(error);
}


  /*for (let key in taskCardContent) {
    if (taskCardContent[key] === "") {
      taskCardContent[key] = currentSelectedTask[key];
  }*/
  
  /*currentSelectedTask.title = title;
  currentSelectedTask.description = description;
  currentSelectedTask.category = category;
  currentSelectedTask.dueDate = dueDate;
  currentSelectedTask.priority = priority;
  currentSelectedTask.prioUrgentEdit = prioUrgentEdit;
  currentSelectedTask.prioMediumEdit = prioMediumEdit;
  currentSelectedTask.prioLowEdit = prioLowEdit;
  currentSelectedTask.subTask = subTask;*/

  taskCard.innerHTML = renderAddTaskPoupBtn(task);

  //let editTaskPopupDiv = document.getElementById("editTaskPopupDiv");
  //editTaskPopupDiv.classList.remove("d-none");

  renderTasks();
}

function deleteTask(taskId) {
  let id = todos.findIndex((task) => task.id == taskId);
  let taskCard = document.getElementById(`task-${taskId}`);
  taskCard.remove();
  todos.splice(id, 1);
  renderTasks();
}

function updateSteps(taskId) {
  let task = todos.find(t => t.id === taskId);
  if (!task || !task.subTask) return;

  const checkboxes = document.querySelectorAll(`#taskPopUp[data-task-id='${taskId}'] .step input[type='checkbox']`);
  let checkedCount = 0;
 
  checkboxes.forEach((checkbox, index) => {
    task.subTask[index].completed = checkbox.checked;
    if (checkbox.checked) {
      checkedCount++;
    }
  });

  const progressBar = document.getElementById(`progressBar-${taskId}`);
  if (progressBar) {
    const progressPercentage = (checkedCount / checkboxes.length) * 100;
    progressBar.style.width = `${progressPercentage}%`;
  }

  const subtasksAmount = document.getElementById(`subtasksAmount-${taskId}`);
  if (subtasksAmount) {
    subtasksAmount.textContent = `${checkedCount}/${checkboxes.length} Subtasks`;
  }
}

function addTaskPopupPlusToDoBtn() {
  let openTaskPopupToDoDiv = document.getElementById("openTaskPopupToDoDiv");
  openTaskPopupToDoDiv.classList.remove("d-none");
  openTaskPopupToDoDiv.innerHTML = renderAddTaskPopupToDoPlus();
}

function addTaskPopupPlusInProgressBtn() {
  let openTaskPopupInProgressDiv = document.getElementById("openTaskPopupInProgressDiv");
  openTaskPopupInProgressDiv.classList.remove("d-none");
  openTaskPopupInProgressDiv.innerHTML = renderAddTaskPopupInProgressPlus();
}

function addTaskPopupPlusAwaitFeedbackBtn() {
  let openTaskPopupAwaitFeedbackDiv = document.getElementById("openTaskPopupAwaitFeedbackDiv");
  openTaskPopupAwaitFeedbackDiv.classList.remove("d-none");
  openTaskPopupAwaitFeedbackDiv.innerHTML = renderAddTaskPopupAwaitFeedbackPlus();
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
  document.getElementById("addTaskPopupDiv").classList.add("d-none");
  document.getElementById("openTaskPopupDiv").classList.add("d-none");
}

function closeAddTaskPopUpToDo() {
  document.getElementById("openTaskPopupToDoDiv").classList.add("d-none");
}

function closeAddTaskPopUpInProgress() {
  document.getElementById("openTaskPopupInProgressDiv").classList.add("d-none");
}

function closeAddTaskPopUpAwaitFeedback() {
  document.getElementById("openTaskPopupAwaitFeedbackDiv").classList.add("d-none");
}

function closeTaskCardPopUp() {
  document.getElementById("openTaskPopupDiv").classList.add("d-none");
}

function closeEditTaskCardPopUp() {
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
// Test 

function contactListPopUp() {
  console.log("triger");
  let contactList = document.getElementById("assignedContactsListPopUp");
  contactList.innerHTML = "";
  contacts.forEach((contact) => {
    const initials = generateInitialsPopUp(contact.name);
    contactList.innerHTML += /*html*/ `
      <div class="assignedContactContent" onclick="toggleCheckbox(event)">
        <div class="assignedContacts">
          <span class="assignedShortcutName">${initials}</span>
          <span class="assignedName">${contact.name}</span>
        </div>
        <input type="checkbox" name="contact-${contact.id}" id="contact-${contact.id}">
      </div>
    `;
  });
  contactList.classList.toggle("hidden");
  contactList.classList.toggle("d-flex");
}

function generateInitialsPopUp(name) {
  const nameParts = name.split(" ");
  const firstInitial = nameParts[0]?.charAt(0) || "";
  const lastInitial = nameParts[1]?.charAt(0) || "";
  return `${firstInitial}${lastInitial}`.toUpperCase();
}

