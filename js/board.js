const columnOrder = ["todo", "inprogress", "awaitfeedback", "done"];

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
      ? task.columnTitles.toLowerCase().replace(/\s/g, "")
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
  let completedSubtasks = task.subTasks ? task.subTasks.filter((st) => st.completed).length : 0;
  let totalSubtasks = task.subTasks ? task.subTasks.length : 0;

  let taskCard = document.createElement("div");
  taskCard.classList.add("task-card");
  taskCard.id = `task-${task.id}`;
  taskCard.draggable = true;
  taskCard.ondragstart = (event) => startDragging(event, task.id);

  taskCard.innerHTML += taskCardHTML(task, totalSubtasks, completedSubtasks); 

  let usersContainer = taskCard.querySelector(`#taskUsers-${task.id}`);

  userColor(task, usersContainer);

  taskColemTitel(task);

  let categoryElement = taskCard.querySelector(".task-card-category");
  categoryColor(categoryElement, task);

  chooseImgPriority(taskCard, task);

  taskCard
    .querySelector(".task-card-div")
    .addEventListener("click", (event) => {
      if (!event.target.classList.contains("move-btn")) {
        openTaskPopup(task.id);
      }
    });

  return taskCard;
}


function categoryColor(categoryElement, task) {
  if (categoryElement) {
    const categoryColors = {
      "User Story": "#0038FF",
      "Technical Task": "#1FD7C1",
    };
    let categoryColor = categoryColors[task.category] || "#ccc";
    categoryElement.style.backgroundColor = categoryColor;
  }
}

function taskColemTitel(task) {
  if (task.columnTitles) {
    let columnTitle = task.columnTitles.toLowerCase().trim();
    const columnMappings = {
      "To Do": "To Do",
      "In Progress": "In Progress",
      "Await Feedback": "Await Feedback",
      Done: "Done",
    };
    task.columnTitles = columnMappings[columnTitle] || task.columnTitles;
  }
}

function userColor(task, usersContainer) {
  if (Array.isArray(task.users)) {
    task.users.forEach((user) => {
      let userDiv = document.createElement("div");
      userDiv.classList.add("tasks-user");
      userDiv.style.backgroundColor = user.color;
      userDiv.textContent = user.initials;
      usersContainer.appendChild(userDiv);
    });
  } else if (typeof task.users === "string") {
    let userDiv = document.createElement("div");
    userDiv.classList.add("tasks-user");
    const contact = contacts.find((c) => c.name === task.users);
    userDiv.style.backgroundColor = contact ? contact.color : "#000";
    userDiv.textContent = task.users;
    usersContainer.appendChild(userDiv);
  }
}

function updateTaskStatusInFirebase(taskId, newColumn) {
  let task = tasks.find((t) => t.id === taskId);
  if (task) {
    task.status = newColumn;
    patchDataToFirebase(`tasks/${taskId}`, { status: newColumn });
  } else {
    console.log("Fehler", taskId);
  }
}

function startDragging(event, id) {
  currentDraggedElement = id;
  event.dataTransfer.setData("text", id);
}

function allowDrop(event) {
  event.preventDefault();
}

async function drop(event, column) {
  event.preventDefault();
  let taskId = event.dataTransfer.getData("text");
  let task = tasks.find((t) => t.id == taskId);
  if (task) {
    task.columnTitles = column;
    renderTasks();
    await patchDataToFirebase(`tasks/${task.id}`, { columnTitles: column });
  }
}

function chooseImgPriority(taskCard, task) {
  let priorityElement = taskCard.querySelector(`#taskPriority-${task.id}`);
  if (priorityElement) {
    const priorityImages = {
      Urgent: "urgentRed.png",
      Medium: "mediumYellow.png",
      Low: "lowGreen.png",
    };
    let priorityImage = document.createElement("img");
    priorityImage.src = `/assets/icons/${
      priorityImages[task.priority] || "default.png"
    }`;
    priorityImage.alt = task.priority;
    priorityElement.appendChild(priorityImage);
  }
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

async function deleteTask(taskId) {
  let id = tasks.findIndex((task) => task.id == taskId);
  let path = `/tasks/${tasks[id].id}`;
  await deleteDataFromFirebase(path);
  await loadTasks();
  renderTasks();
  document.getElementById("openTaskPopupDiv").innerHTML = "";
  closeTaskCardPopUp();
}

async function updateSteps(taskId) {
  let task = tasks.find((t) => t.id === taskId);
  if (!task || !task.subTasks) {return;}

  const checkboxes = document.querySelectorAll(`#taskPopUp[data-task-id='${taskId}'] .step input[type='checkbox']`);
  if (!checkboxes.length) {return;}
  let checkedCount = 0;
  checkboxes.forEach((checkbox, index) => {
    if (task.subTasks[index]) {
      task.subTasks[index].completed = checkbox.checked;
      if (checkbox.checked) {
        checkedCount++;}}
      });

  const progressBar = document.getElementById(`progressBar-${taskId}`);
  progressBarStatus(progressBar, checkedCount, task, taskId);
  await saveTaskToFirebase(task);
  renderTasks();
}

function progressBarStatus(progressBar, checkedCount, task, taskId) {
  if (progressBar) {
    const progressPercentage = (checkedCount / task.subTasks.length) * 100;
    progressBar.style.width = `${progressPercentage}%`;
  }
  const subtasksAmount = document.getElementById(`subtasksAmount-${taskId}`);
  if (subtasksAmount) {
    subtasksAmount.textContent = `${checkedCount}/${task.subTasks.length} Subtasks`;
  }
}

async function saveTaskToFirebase(task) {
  try {
    const response = await fetch(
      `https://join-7f1d9-default-rtdb.europe-west1.firebasedatabase.app/tasks/${task.id}.json`,
      {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(task),
      }
    );

    if (!response.ok) throw new Error("Fehler beim Speichern in Firebase!");

    console.log(`erfolgreich.`);
  } catch (error) {
    console.error("Fehler:", error);
  }
}

async function moveTaskToNextColumn(taskId, direction, event) {
  event.stopPropagation();

  let task = tasks.find((t) => t.id === taskId);
  if (!task) return;

  let currentIndex = columnOrder.indexOf(task.columnTitles);
  let newIndex = currentIndex + direction;
  if (newIndex >= 0 && newIndex < columnOrder.length) {
    let newColumnTitle = columnOrder[newIndex];
    task.columnTitles = newColumnTitle;
    task.status = newColumnTitle;
    await patchDataToFirebase(`tasks/${taskId}`, {
      columnTitles: newColumnTitle,
      status: newColumnTitle,
    });

    renderTasks();
  }
}

async function createTaskBtn() {
  let title = document.getElementById("titleInput").value;
  let description = document.getElementById("descriptionTextarea").value;
  let dueDate = document.getElementById("date").value;
  let category = document.getElementById("dropdownCategory").innerText;
  selectedContacts = Array.from(selectedContacts);

  let priority = prioCategory();

  let data = {columnTitles: "To Do", title, description, dueDate, priority, subTasks,
    subTasks: subTasks.map((subTask) => ({description: subTask.description, completed: subTask.completed ?? false,})),
    category, users: selectedContacts,
  };

  try {
    await postDataToFirebase("tasks/", data);
  } catch (error) {
    console.error(error);
  }

  await loadTasks();
  closeAddTaskPopUp();
  showAddTaskPopup();
  location.reload();
}

function prioCategory() {
  let prioUrgentEdit = document.getElementById("prioUrgentEdit");
  let prioMediumEdit = document.getElementById("prioMediumEdit");
  let prioLowEdit = document.getElementById("prioLowEdit");

  let priority = "";

  if (prioUrgentEdit.classList.contains("prioUrgentRed")) {
    priority = "Urgent";
  } else if (prioMediumEdit.classList.contains("prioMediumYellow")) {
    priority = "Medium";
  } else if (prioLowEdit.classList.contains("prioLowGreen")) {
    priority = "Low";
  }
  return priority;
}

async function createTaskPlusToDoBtn() {
  let title = document.getElementById("titleInput").value;
  let description = document.getElementById("descriptionTextarea").value;
  let dueDate = document.getElementById("date").value;
  let category = document.getElementById("dropdownCategory").innerText;

  selectedContacts = Array.from(selectedContacts);

  let priority = prioCategory();

  let data = {columnTitles: "To Do", title, description, dueDate, priority, subTasks,
    subTasks: subTasks.map((subTask) => ({description: subTask.description, completed: subTask.completed ?? false,})),
    category, users: selectedContacts,
  };

  try {
    await postDataToFirebase("tasks/", data);
  } catch (error) {
    console.error(error);
  }

  await loadTasks();
  closeAddTaskPopUpToDo();
  location.reload();
}

async function createTaskPlusInProgressBtn() {
  let title = document.getElementById("titleInput").value;
  let description = document.getElementById("descriptionTextarea").value;
  let dueDate = document.getElementById("date").value;
  let category = document.getElementById("dropdownCategory").innerText;

  selectedContacts = Array.from(selectedContacts);

  let priority = prioCategory();

  let data = {columnTitles: "In Progress", title, description, dueDate, priority, subTasks,
    subTasks: subTasks.map((subTask) => ({description: subTask.description, completed: subTask.completed ?? false,})),
    category, users: selectedContacts,
  };

  try {
    await postDataToFirebase("tasks/", data);
  } catch (error) {
    console.error(error);
  }

  await loadTasks();
  closeAddTaskPopUpInProgress();
  location.reload();
}

async function createTaskPlusAwaitFeedbackBtn() {
  let title = document.getElementById("titleInput").value;
  let description = document.getElementById("descriptionTextarea").value;
  let dueDate = document.getElementById("date").value;
  let category = document.getElementById("dropdownCategory").innerText;

  selectedContacts = Array.from(selectedContacts);

  let priority = prioCategory();

  let data = {columnTitles: "Await Feedback", title, description, dueDate, priority, subTasks,
    subTasks: subTasks.map((subTask) => ({description: subTask.description, completed: subTask.completed ?? false,})),
    category, users: selectedContacts,
  };

  try {
    await postDataToFirebase("tasks/", data);
  } catch (error) {
    console.error(error);
  }

  await loadTasks();
  closeAddTaskPopUpAwaitFeedback();
  location.reload();
}

function addSubTaskPopUp() {
  let subTaskInput = document.getElementById("subTaskPopUp");

  if (subTaskInput.value.trim() !== "") {
    let newSubtask = {
      id: crypto.randomUUID(),
      description: subTaskInput.value.trim(),
    };
    if (!subTasks.some((sub) => sub.description === newSubtask.description)) {
      subTasks.push(newSubtask);
    }
    
    renderSubTaskList();
    subTaskInput.value = "";
  }
}

function showAddTaskPopup() {
    const addTaskPopup = document.getElementById("AddTaskPopupDiv");

    if (addTaskPopup) {
      addTaskPopup.classList.remove("d-none")
      setTimeout(() => {
        addTaskPopup.classList.add("d-none");
      }, 1500);
    } else {
      console.error(
        "Das Element mit der ID 'addTaskPopup' wurde nicht gefunden!"
      );
    }
}
