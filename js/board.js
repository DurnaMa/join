/*let todos = [
  {
    id: 1,
    columnTitles: "Await feedback",
    category: "User story",
    title: "Task 1",
    description: "Task 1 description",
    dueDate: "2024/10/10",
    subTask: [
      { name: "test1", completed: false },
      { name: "test2", completed: false },
    ],
    users: [
      { initial: "HA", completed: false },
      { initial: "AL", completed: false },
      { initial: "MD", completed: false },
    ],
    prio: [],
  },
  {
    id: 2,
    columnTitles: "In progress",
    category: "Technical task",
    title: "Task 2",
    description: "Task 2 description",
    dueDate: "2024/10/15",
    subTask: [
      { name: "test3", completed: false },
      { name: "test4", completed: false },
    ],
    users: [
      { initial: "FK", completed: false },
      { initial: "DL", completed: false },
      { initial: "MD", completed: false },
    ],
    prio: [],
  },
  {
    id: 3,
    columnTitles: "Await feedback",
    category: "User story",
    title: "Task 3",
    description: "Task 3 description",
    dueDate: "2024/10/20",
    subTask: [
      { name: "test5", completed: false },
      { name: "test6", completed: false },
      { name: "test6.3", completed: false },
      { name: "test6.4", completed: false },
      { name: "test6.5", completed: false },
    ],
    users: [
      { initial: "HA", completed: false },
      { initial: "DL", completed: false },
      { initial: "RT", completed: false },
    ],
    prio: [],
  },
  {
    id: 4,
    columnTitles: "Done",
    category: "Technical task",
    title: "Task 4",
    description: "Task 4 description",
    dueDate: "2024/10/25",
    subTask: [
      { name: "test7", completed: false },
      { name: "test8", completed: false },
    ],
    users: [
      { initial: "HA", completed: false },
      { initial: "DL", completed: false },
      { initial: "MD", completed: false },
    ],
    prio: [],
  },
];*/

let currentDraggedElement;
let currentSelectedTask;
let currentUsers = [];
let currentPrio = [];



async function initBoard() {
  await loadDataUsers();
  await loadTasks();
  renderTasks();
}

function renderTasks() {
  document.getElementById("todo").innerHTML = "";
  document.getElementById("inprogress").innerHTML = "";
  document.getElementById("awaitfeedback").innerHTML = "";
  document.getElementById("done").innerHTML = "";

  tasks.forEach((task) => {
    let taskCard = generateTaskCard(task);
    let columnId = task.columnTitles
      ? task.columnTitles.toLowerCase().replace(" ", "")
      : "todo";
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

// function generateTaskCard(task) {
//   let completedSubtasks = task.subTask
//     ? task.subTask.filter((st) => st.completed).length
//     : 0;
//   let totalSubtasks = task.subTask ? task.subTask.length : 0;

//   let taskCard = document.createElement("div");
//   taskCard.classList.add("task-card");
//   taskCard.id = `task-${task.id}`;
//   taskCard.draggable = true;
//   taskCard.ondragstart = (event) => startDragging(event, task.id);

//   taskCard.innerHTML = /*html*/ `
//   <div class="task-card-div" onclick="openTaskPopup(${task.id})">
//     <div class="task-card-category-div">
//       <div class="task-card-category">
//         <h2 class="task-card-category-h2">${task.category}</h2>
//       </div>
//     </div>
//     <h3>${task.title}</h3>
//     <p>${task.description}</p>
    
//     <div class="progress-container">
//         <div class="progress-bar-container">
//             <div class="progress-bar" id="progressBar-${
//               task.id
//             }" style="width: ${
//     (completedSubtasks / totalSubtasks) * 100
//   }%;"></div>
//         </div>
//         <div class="subtasks-div">
//           <span class="subtasks-amount" id="subtasksAmount-${
//             task.id
//           }">${completedSubtasks}/${totalSubtasks} Subtasks</span>
//         </div>
//     </div>
//     <div class="task-footer">    
//       <div class="task-users">
//           <div class="tasks-user1 tasks-user">${task.users}</div>

//         </div>
//         <div>
//           <img src="/assets/icons/priom.png" alt="">
//         </div>
//   </div>
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
  let completedSubtasks = task.subTasks
    ? task.subTasks.filter((st) => st.completed).length
    : 0;
  let totalSubtasks = task.subTasks ? task.subTasks.length : 0;

  let taskCard = document.createElement("div");
  taskCard.classList.add("task-card");
  taskCard.id = `task-${task.id}`;
  taskCard.draggable = true;
  taskCard.ondragstart = (event) => startDragging(event, task.id);

  taskCard.innerHTML = /*html*/ `
    <div class="task-card-div">
      <div class="task-card-category-div">
        <div class="task-card-category">
          <h2 class="task-card-category-h2">${task.category}</h2>
        </div>
      </div>
      <h3>${task.title}</h3>
      <p>${task.description}</p>
      
      <div class="progress-container">
        <div class="progress-bar-container">
          <div class="progress-bar" id="progressBar-${task.id}" style="width: ${
            (completedSubtasks / totalSubtasks) * 100
          }%;"></div>
        </div>
        <div class="subtasks-div">
          <span class="subtasks-amount" id="subtasksAmount-${task.id}">${completedSubtasks}/${totalSubtasks} Subtasks</span>
        </div>
      </div>
      <div class="task-footer">      
        <div class="task-users">
          <div class="tasks-user1 tasks-user">${task.users}</div>
        </div>
        <div>
          <img src="/assets/icons/priom.png" alt="">
        </div>
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

  // Event Listener hinzufügen
  taskCard.querySelector(".task-card-div").addEventListener("click", () => {
    openTaskPopup(task.id);
  });

  return taskCard;
}


function searchTask() {
  let searchTaskInput = document
    .getElementById("searchTask")
    .value.toLowerCase();
  let allTasks = document.querySelectorAll(".task-card");

  allTasks.forEach((task) => {
    let title = task.querySelector("h3").innerText.toLowerCase();
    let description = task.querySelector("p").innerText.toLowerCase();

    if (
      title.includes(searchTaskInput) ||
      description.includes(searchTaskInput)
    ) {
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
  let task = tasks.find((t) => t.id == taskId);
  if (task) {
    task.columnTitles = column;
    renderTasks();
  }
}

function deleteTask(taskId) {
  let id = tasks.findIndex((task) => task.id == taskId);
  let taskCard = document.getElementById(`task-${taskId}`);
  taskCard.remove();
  tasks.splice(id, 1);
  renderTasks();
}

function updateSteps(taskId) {
  let task = tasks.find((t) => t.id === taskId);
  if (!task || !task.subTask) return;

  const checkboxes = document.querySelectorAll(
    `#taskPopUp[data-task-id='${taskId}'] .step input[type='checkbox']`
  );
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

async function createTaskPlusToDoBtn() {
  let title = document.getElementById("titleInput").value;
  let description = document.getElementById("descriptionTextarea").value;
  let dueDate = document.getElementById("date").value;
  let category = document.getElementById("category").value;
  
  selectedContacts = Array.from(selectedContacts);

  let prioUrgentEdit = document.getElementById("prioUrgentEdit");
  let prioMediumEdit = document.getElementById("prioMediumEdit");
  let prioLowEdit = document.getElementById("prioLowEdit");

  let priority = "";

  if (prioUrgentEdit.classList.contains("prioUrgentRed")) {
    priority = "urgent";
  } else if (prioMediumEdit.classList.contains("prioMediumYellow")) {
    priority = "medium";
  } else if (prioLowEdit.classList.contains("prioLowGreen")) {
    priority = "low";
  }

  let data = {
    //id: todos.length + 1,
    columntitles: "To Do",
    title,
    description,
    dueDate,
    priority,
    subTasks,
    category,
    selectedContacts,
  };

  try {
    await postDataToFirebase("tasks/", data);
  } catch (error) {
    console.error(error);
  }
}

async function createTaskPlusInProgressBtn() {
  let title = document.getElementById("titleInput").value;
  let description = document.getElementById("descriptionTextarea").value;
  let dueDate = document.getElementById("date").value;
  let category = document.getElementById("category").value;
  
  selectedContacts = Array.from(selectedContacts);

  let prioUrgentEdit = document.getElementById("prioUrgentEdit");
  let prioMediumEdit = document.getElementById("prioMediumEdit");
  let prioLowEdit = document.getElementById("prioLowEdit");

  let priority = "";

  if (prioUrgentEdit.classList.contains("prioUrgentRed")) {
    priority = "urgent";
  } else if (prioMediumEdit.classList.contains("prioMediumYellow")) {
    priority = "medium";
  } else if (prioLowEdit.classList.contains("prioLowGreen")) {
    priority = "low";
  }

  let data = {
    //id: todos.length + 1,
    columntitles: "In Progress",
    title,
    description,
    dueDate,
    priority,
    subTasks,
    category,
    selectedContacts,
  };

  try {
    await postDataToFirebase("tasks/", data);
  } catch (error) {
    console.error(error);
  }
}

async function createTaskPlusAwaitFeedbackBtn() {
  let title = document.getElementById("titleInput").value;
  let description = document.getElementById("descriptionTextarea").value;
  let dueDate = document.getElementById("date").value;
  let category = document.getElementById("category").value;
  
  selectedContacts = Array.from(selectedContacts);

  let prioUrgentEdit = document.getElementById("prioUrgentEdit");
  let prioMediumEdit = document.getElementById("prioMediumEdit");
  let prioLowEdit = document.getElementById("prioLowEdit");

  let priority = "";

  if (prioUrgentEdit.classList.contains("prioUrgentRed")) {
    priority = "urgent";
  } else if (prioMediumEdit.classList.contains("prioMediumYellow")) {
    priority = "medium";
  } else if (prioLowEdit.classList.contains("prioLowGreen")) {
    priority = "low";
  }

  let data = {
    //id: todos.length + 1,
    columntitles: "Await Feedback",
    title,
    description,
    dueDate,
    priority,
    subTasks,
    category,
    selectedContacts,
  };

  try {
    await postDataToFirebase("tasks/", data);
  } catch (error) {
    console.error(error);
  }
}

/*function createtTaskBtn() {
  let title = document.getElementById("titleInput").value;
  let description = document.getElementById("descriptionTextarea").value;
  let category = document.getElementById("category").value;
  let subTask = document.getElementById("subTask").value;

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
}*/

function addSubTaskPopUp() {
  if (subTaskPopUp.value != "") {
    subTasks.push({
      description: subTaskPopUp.value,
    });
    renderSubTaskList();
    subTaskPopUp.value = "";
  }
}


