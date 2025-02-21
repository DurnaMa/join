// let todos = [
//   {
//     id: 1,
//     columnTitles: "Await feedback",
//     category: "User story",
//     title: "Task 1",
//     description: "Task 1 description",
//     subTask: ["test1", "test2"],
//     users: [],
//     prio: [],
//   },
//   {
//     id: 2,
//     columnTitles: "In progress",
//     category: "Technical task",
//     title: "Task 2",
//     description: "Task 2 description",
//     subTask: ["test3", "test4"],
//     users: [],
//     prio: [],
//   },
//   {
//     id: 3,
//     columnTitles: "Await feedback",
//     category: "Technical task",
//     title: "Task 3",
//     description: "Task 3 description",
//     subTask: [],
//     users: [],
//     prio: [],
//   },
//   {
//     id: 4,
//     columnTitles: "Done",
//     category: "Technical task",
//     title: "Task 4",
//     description: "Task 4 description",
//     subTask: [],
//     users: [],
//     prio: [],
//   },
//   {
//     id: 5,
//     columnTitles: "In progress",
//     category: "User story",
//     title: "Task 5",
//     description: "Task 5 description",
//     subTask: [],
//     users: [],
//     prio: [],
//   },
// ];
let todos = [
  {
    id: 1,
    columnTitles: "Await feedback",
    category: "User story",
    title: "Task 1",
    description: "Task 1 description",
    subTask: [{ name: "test1", completed: false }, { name: "test2", completed: false }],
    users: [],
    prio: [],
  },
  {
    id: 2,
    columnTitles: "In progress",
    category: "Technical task",
    title: "Task 2",
    description: "Task 2 description",
    subTask: [{ name: "test3", completed: false }, { name: "test4", completed: false }],
    users: [],
    prio: [],
  },
  {
    id: 3,
    columnTitles: "Await feedback",
    category: "User story",
    title: "Task 3",
    description: "Task 3 description",
    subTask: [{ name: "test5", completed: false }, { name: "test6", completed: false },{ name: "test6.3", completed: false },{ name: "test6.4", completed: false },{ name: "test6.5", completed: false }],
    users: [],
    prio: [],
  },
  {
    id: 4,
    columnTitles: "Done",
    category: "Technical task",
    title: "Task 4",
    description: "Task 4 description",
    subTask: [{ name: "test7", completed: false }, { name: "test8", completed: false }],
    users: [],
    prio: [],
  },{
    id: 5,
    columnTitles: "To Do",
    category: "User story",
    title: "Task 5",
    description: "Task 5 description",
    subTask: [{ name: "test9", completed: false }, { name: "test10", completed: false }],
    users: [],
    prio: [],
  }
];


let currentDraggedElement;
let currentSelectedTask;

async function initBoard() {
  await loadDataUsers();
  renderTasks();
}

// function renderTasks() {
//   document.getElementById("todo").innerHTML = "";
//   document.getElementById("inprogress").innerHTML = "";
//   document.getElementById("awaitfeedback").innerHTML = "";
//   document.getElementById("done").innerHTML = "";

//   todos.forEach((task) => {
//     let taskCard = generateTaskCard(task);
//     let columnId = task.columnTitles.toLowerCase().replace(" ", "");
//     document.getElementById(columnId).appendChild(taskCard);
//   });

//   checkEmptyColumns();
// }
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

// function checkEmptyColumns() {
//   document.querySelectorAll(".column").forEach((column) => {
//     if (!column.hasChildNodes()) {
//       column.innerHTML = generateEmptyColumn();
//     } else {
//       let noTasksElement = column.querySelector(".no-tasks");
//       if (noTasksElement) noTasksElement.remove();
//     }
//   });
// }
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

// function generateEmptyColumn() {
//   return /*html*/ `
//     <div class="empty-column">
//       <p>No tasks</p>
//     </div>
//   `;
// }
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

// function generateTaskCard(task) {
//   let taskCard = document.createElement("div");
//   taskCard.classList.add("task-card");
//   taskCard.id = `task-${task.id}`;
//   taskCard.draggable = true;
//   taskCard.ondragstart = (event) => startDragging(event, task.id);

//   taskCard.innerHTML = /*html*/ `
//   <div class="task-card-div" onclick="editTaskPopup()">
//     <div class="task-card-category-div">
//       <div class="task-card-category">
//         <h2 class="task-card-category-h2">${task.category}</h2>
//       </div>
//     </div>
//     <h3>${task.title}</h3>
//     <p>${task.description}</p>
    
//     <div class="progress-container">
//         <div class="progress-bar-container">
//             <div class="progress-bar" id="progressBar"></div>
//         </div>
//         <div class="subtasks-div">
//           <span class="subtasks-amount" id="subtasksAmount">0/2 Subtasks</span>
//         </div>
//     </div>
//         <div class="task-footer">    
//           <div class="task-users">
//             <div class="tasks-user1 tasks-user">${contacts.users}</div>
//             <div class="tasks-user2 tasks-user">MD</div>
//             <div class="tasks-user3 tasks-user">DL</div>
//           </div>
//         <div>
//         <img src="/assets/icons/priom.png" alt="">
//       </div>
//     </div>
//   `;

//   let categoryElement = taskCard.querySelector(".task-card-category");
//   if (categoryElement) {
//     if (task.category === "User story") {
//       categoryElement.style.backgroundColor = "#0038FF";
//     } else if (task.category === "Technical task") {
//       categoryElement.style.backgroundColor = "#1FD7C1";
//     }
//   }

//   return taskCard;
// }
function generateTaskCard(task) {
  let completedSubtasks = task.subTask ? task.subTask.filter(st => st.completed).length : 0;
  let totalSubtasks = task.subTask ? task.subTask.length : 0;
  
  let taskCard = document.createElement("div");
  taskCard.classList.add("task-card");
  taskCard.id = `task-${task.id}`;
  taskCard.draggable = true;
  taskCard.ondragstart = (event) => startDragging(event, task.id);

  taskCard.innerHTML = /*html*/ `
  <div class="task-card-div" onclick="editTaskPopup(${task.id})">
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
          <div class="tasks-user1 tasks-user">${contacts.users}</div>
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

/*function editTaskPopup() {
  if (!currentDraggedElement) {
    console.error("Fehler: currentDraggedElement ist nicht definiert.");
    return;
  }

  let id = todos.findIndex((task) => task.id === currentDraggedElement);
  if (id === -1) {
    console.error("Fehler: Keine Aufgabe mit der angegebenen ID gefunden.");
    return;
  }

  let currentSelectedTask = todos[id];
  let editTaskPopupDiv = document.getElementById("editTaskPopupDiv");
  
  if (!editTaskPopupDiv) {
    console.error("Fehler: Element mit ID 'editTaskPopupDiv' nicht gefunden.");
    return;
  }

  editTaskPopupDiv.classList.remove("d-none");
  editTaskPopupDiv.innerHTML = renderTasksCardPopup(currentSelectedTask);
}*/
function editTaskPopup(taskId) {
  let id = todos.findIndex((task) => task.id == taskId);
  let currentSelectedTask = todos[id];
  
  let editTaskPopupDiv = document.getElementById("editTaskPopupDiv");
  editTaskPopupDiv.classList.remove("d-none");
  editTaskPopupDiv.innerHTML = renderTasksCardPopup(currentSelectedTask);
}

// function editTaskPopup() {
//   let id = todos.findIndex((task) => task.id == currentDraggedElement);
//   let currentSelectedTask = todos[id];
  
//   let editTaskPopupDiv = document.getElementById("editTaskPopupDiv");
//   editTaskPopupDiv.classList.remove("d-none");
//   editTaskPopupDiv.innerHTML = renderTasksCardPopup(currentSelectedTask);
// }

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

/*function updateSteps() {
  const checkboxes = document.querySelectorAll('.step input[type="checkbox"]');
  let checkedCount = 0;
  for (let i = 0; i < checkboxes.length; i++) {
    const checkbox = checkboxes[i];
    const label = checkbox.nextElementSibling;
    if (checkbox.checked) {
      label.style.color = "#4599FF";
      checkedCount++;
    } else {
      label.style.color = "black";
    }
  };

  const progressBar = document.getElementById("progressBar");
  const progressPercentage = (checkedCount / checkboxes.length) * 100;
  progressBar.style.width = progressPercentage + "%";
}*/
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

// subTaskPopUp.addEventListener("keydown", function (event) {
//   if (event.key === "Enter") {
//     event.preventDefault();
//     addSubTaskPopUp();
//   }
// });


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

