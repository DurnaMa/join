let currentDraggedElement;
let currentSelectedTask;
let currentUsers = [];
let currentPrio = [];

async function initBoard() {
  await loadDataUsers();
  await loadTasks();
  renderTasks();
  //taskGetFromLocalStorage();
  //taskGetFromFirebase();
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
    totalSubtasks > 0 ? (completedSubtasks / totalSubtasks) * 100 : 0
  }%;"></div>
        </div>
        <div class="subtasks-div">
          <span class="subtasks-amount" id="subtasksAmount-${
            task.id
          }">${completedSubtasks}/${totalSubtasks} Subtasks</span>
        </div>
      </div>
      <div class="task-footer">      
        <div class="task-users" id="taskUsers-${task.id}"></div>
        <div>
          <img src="/assets/icons/priom.png" alt="">
        </div>
      </div>
    </div>
  `;

  // Benutzerelemente separat hinzufügen
  let usersContainer = taskCard.querySelector(`#taskUsers-${task.id}`);
  if (Array.isArray(task.users)) {
    task.users.forEach((user) => {
      let userDiv = document.createElement("div");
      userDiv.classList.add("tasks-user");
      userDiv.textContent = user; // Hier wird der Name oder die Initialen des Benutzers gesetzt
      usersContainer.appendChild(userDiv);
    });
  } else if (typeof task.users === "string") {
    let userDiv = document.createElement("div");
    userDiv.classList.add("tasks-user");
    userDiv.textContent = task.users;
    usersContainer.appendChild(userDiv);
  }

  // Spaltennamen formatieren
  if (task.columnTitles) {
    let columnTitle = task.columnTitles.toLowerCase().trim();
    const columnMappings = {
      "to do": "To Do",
      "in progress": "In Progress",
      "await feedback": "Await Feedback",
      "done": "Done",
    };
    task.columnTitles = columnMappings[columnTitle] || task.columnTitles;
  }

  // Kategorie-Farbe setzen
  let categoryElement = taskCard.querySelector(".task-card-category");
  if (categoryElement) {
    const categoryColors = {
      "User story": "#0038FF",
      "Technical task": "#1FD7C1",
    };
    categoryElement.style.backgroundColor = categoryColors[task.category] || "#000";
  }

  taskCard.querySelector(".task-card-div").addEventListener("click", () => {
    openTaskPopup(task.id);
  });

  return taskCard;
}




// function generateTaskCard(task) {
//   let completedSubtasks = task.subTasks
//     ? task.subTasks.filter((st) => st.completed).length
//     : 0;
//   let totalSubtasks = task.subTasks ? task.subTasks.length : 0;

//   let taskCard = document.createElement("div");
//   taskCard.classList.add("task-card");
//   taskCard.id = `task-${task.id}`;
//   taskCard.draggable = true;
//   taskCard.ondragstart = (event) => startDragging(event, task.id);

//   taskCard.innerHTML = /*html*/ `
//     <div class="task-card-div">
//       <div class="task-card-category-div">
//         <div class="task-card-category">
//           <h2 class="task-card-category-h2">${task.category}</h2>
//         </div>
//       </div>
//       <h3>${task.title}</h3>
//       <p>${task.description}</p>
      
//       <div class="progress-container">
//         <div class="progress-bar-container">
//           <div class="progress-bar" id="progressBar-${task.id}" style="width: ${
//     (completedSubtasks / totalSubtasks) * 100
//   }%;"></div>
//         </div>
//         <div class="subtasks-div">
//           <span class="subtasks-amount" id="subtasksAmount-${
//             task.id
//           }">${completedSubtasks}/${totalSubtasks} Subtasks</span>
//         </div>
//       </div>
//       <div class="task-footer">      
//         <div class="task-users">
//         <div class="tasks-user1 tasks-user">${task.users}</div>

//         </div>
//         <div>
//           <img src="/assets/icons/priom.png" alt="">
//         </div>
//       </div>
//     </div>
//   `;

//   if (task.columnTitles) {
//     let columnTitle = task.columnTitles.toLowerCase().trim();

//     if (columnTitle === "to do") {
//       task.columnTitles = "To Do";
//     } else if (columnTitle === "in progress") {
//       task.columnTitles = "In Progress";
//     } else if (columnTitle === "await feedback") {
//       task.columnTitles = "Await Feedback";
//     } else if (columnTitle === "done") {
//       task.columnTitles = "Done";
//     }
//   }

//   let categoryElement = taskCard.querySelector(".task-card-category");
//   if (categoryElement) {
//     if (task.category === "User story") {
//       categoryElement.style.backgroundColor = "#0038FF";
//     } else if (task.category === "Technical task") {
//       categoryElement.style.backgroundColor = "#1FD7C1";
//     }
//   }

//   taskCard.querySelector(".task-card-div").addEventListener("click", () => {
//     openTaskPopup(task.id);
//   });

//   return taskCard;
// }

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

// function drop(event, column) {
//   event.preventDefault();
//   let taskId = event.dataTransfer.getData("text");
//   let task = tasks.find((t) => t.id == taskId);
//   if (task) {
//     task.columnTitles = column;
//     renderTasks();
//     firebase.firestore().collection('tasks').doc(taskId).set(task);
//   }
// }

// function taskGetFromFirebase() {
//   firebase.firestore().collection('tasks').get().then(querySnapshot => {
//     tasks = querySnapshot.docs.map(doc => doc.data());
//     renderTasks();
//   });
// }

function drop(event, column) {
  event.preventDefault();
  let taskId = event.dataTransfer.getData("text");
  let task = tasks.find((t) => t.id == taskId);
  if (task) {
    task.columnTitles = column;
    renderTasks();
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
}

function taskGetFromLocalStorage() {
  let storedTasks = localStorage.getItem("tasks");
  if (storedTasks) {
    tasks = JSON.parse(storedTasks);
  } else {
    tasks = [];
  }
  renderTasks();
}

// function drop(event, column) {
//   event.preventDefault();
//   let taskId = event.dataTransfer.getData("text");
//   let task = tasks.find((t) => t.id == taskId);
//   if (task) {
//     task.columnTitles = column;
//     renderTasks();
//   }
// }

async function deleteTask(taskId) {
  let id = tasks.findIndex((task) => task.id == taskId);
  let path = `/tasks/${tasks[id].id}`;
  await deleteDataFromFirebase(path);
  await loadTasks();
  renderTasks();
  document.getElementById("openTaskPopupDiv").innerHTML = "";
  closeTaskCardPopUp();
}

// function deleteTask(taskId) {
//   let id = tasks.findIndex((task) => task.id == taskId);
//   let taskCard = document.getElementById(`task-${taskId}`);
//   taskCard.remove();
//   tasks.splice(id, 1);
//   renderTasks();
//   firebase.firestore().collection('tasks').doc(taskId).delete().then(() => {
//     console.log('Task gelöscht!');
//   }).catch((error) => {
//     console.error('Fehler beim Löschen des Tasks:', error);
//   });
// }

// function deleteTask(taskId) {
//   let id = tasks.findIndex((task) => task.id == taskId);
//   let taskCard = document.getElementById(`task-${taskId}`);
//   taskCard.remove();
//   tasks.splice(id, 1);
//   renderTasks();
//   firebase.firestore().collection('tasks').doc(taskId).delete();
// }

// function deleteTask(taskId) {
//   let id = tasks.findIndex((task) => task.id == taskId);
//   let taskCard = document.getElementById(`task-${taskId}`);
//   taskCard.remove();
//   tasks.splice(id, 1);
//   renderTasks();
// }

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

  // let users = selectedContacts.map((contact) => {
  //   return contact.id;
  // });

  // let initials = selectedContacts.map((contact) => {
  //   return generateInitials(contact.name);
  // });

  let data = {
    //id: todos.length + 1,
    columnTitles: "To Do",
    title,
    description,
    dueDate,
    priority,
    subTasks,
    category,
    users: selectedContacts,
    //initials,
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
    columnTitles: "In Progress",
    title,
    description,
    dueDate,
    priority,
    subTasks,
    category,
    users: selectedContacts,
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
    columnTitles: "Await Feedback",
    title,
    description,
    dueDate,
    priority,
    subTasks,
    category,
    users: selectedContacts,
  };

  try {
    await postDataToFirebase("tasks/", data);
  } catch (error) {
    console.error(error);
  }
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
