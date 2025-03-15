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
        <div class="task-card-category" id="taskCategory-${task.id}">
          <h2 class="task-card-category-h2" id="taskCategoryH2">${
            task.category
          }</h2>
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
        <div class="task-priority" id="taskPriority-${task.id}"></div>
      </div>
    </div>
  `;

  let usersContainer = taskCard.querySelector(`#taskUsers-${task.id}`);

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

  let categoryElement = taskCard.querySelector(".task-card-category");
  if (categoryElement) {
    const categoryColors = {
      "User Story": "#0038FF",
      "Technical Task": "#1FD7C1",
    };
    categoryElement.style.backgroundColor =
      categoryColors[task.category] || "#000";
  }

  chooseImgPriority(taskCard, task);

  taskCard.querySelector(".task-card-div").addEventListener("click", () => {
    openTaskPopup(task.id);
  });

  return taskCard;
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
  if (!task || !task.subTasks) {
    return;
  }

  const checkboxes = document.querySelectorAll(
    `#taskPopUp[data-task-id='${taskId}'] .step input[type='checkbox']`
  );

  if (!checkboxes.length) {
    return;
  }

  let checkedCount = 0;

  checkboxes.forEach((checkbox, index) => {
    if (task.subTasks[index]) {
      task.subTasks[index].completed = checkbox.checked;
      if (checkbox.checked) {
        checkedCount++;
      }
    }
  });

  const progressBar = document.getElementById(`progressBar-${taskId}`);
  if (progressBar) {
    const progressPercentage = (checkedCount / task.subTasks.length) * 100;
    progressBar.style.width = `${progressPercentage}%`;
  }
  const subtasksAmount = document.getElementById(`subtasksAmount-${taskId}`);
  if (subtasksAmount) {
    subtasksAmount.textContent = `${checkedCount}/${task.subTasks.length} Subtasks`;
  }

  await saveTaskToFirebase(task);
  renderTasks();
}

async function saveTaskToFirebase(task) {
  try {

    const response = await fetch(
      `https://join-7f1d9-default-rtdb.europe-west1.firebasedatabase.app/tasks/${task.id}.json`,
      {
        method: "PUT", 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      }
    );

    if (!response.ok) throw new Error("Fehler beim Speichern in Firebase!");

    console.log(`erfolgreich.`);
  } catch (error) {
    console.error("Fehler:", error);
  }
}

async function createTaskBtn() {
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
    priority = "Urgent";
  } else if (prioMediumEdit.classList.contains("prioMediumYellow")) {
    priority = "Medium";
  } else if (prioLowEdit.classList.contains("prioLowGreen")) {
    priority = "Low";
  }

  let data = {
    columnTitles: "To Do",
    title,
    description,
    dueDate,
    priority,
    subTasks,
    subTasks: subTasks.map((subTask) => ({
      description: subTask.description,
      completed: subTask.completed ?? false,
    })),
    category,
    users: selectedContacts,
  };

  try {
    await postDataToFirebase("tasks/", data);
  } catch (error) {
    console.error(error);
  }

  await loadTasks();
  closeAddTaskPopUp();
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
    priority = "Urgent";
  } else if (prioMediumEdit.classList.contains("prioMediumYellow")) {
    priority = "Medium";
  } else if (prioLowEdit.classList.contains("prioLowGreen")) {
    priority = "Low";
  }

  let data = {
    columnTitles: "To Do",
    title,
    description,
    dueDate,
    priority,
    subTasks,
    subTasks: subTasks.map((subTask) => ({
      description: subTask.description,
      completed: subTask.completed ?? false,
    })),
    category,
    users: selectedContacts,
  };

  try {
    await postDataToFirebase("tasks/", data);
  } catch (error) {
    console.error(error);
  }

  await loadTasks();
  closeAddTaskPopUpToDo();
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
    priority = "Urgent";
  } else if (prioMediumEdit.classList.contains("prioMediumYellow")) {
    priority = "Medium";
  } else if (prioLowEdit.classList.contains("prioLowGreen")) {
    priority = "Low";
  }

  let data = {
    columnTitles: "In Progress",
    title,
    description,
    dueDate,
    priority,
    subTasks,
    subTasks: subTasks.map((subTask) => ({
      description: subTask.description,
      completed: subTask.completed ?? false,
    })),
    category,
    users: selectedContacts,
  };

  try {
    await postDataToFirebase("tasks/", data);
  } catch (error) {
    console.error(error);
  }

  await loadTasks();
  closeAddTaskPopUpInProgress();
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
    priority = "Urgent";
  } else if (prioMediumEdit.classList.contains("prioMediumYellow")) {
    priority = "Medium";
  } else if (prioLowEdit.classList.contains("prioLowGreen")) {
    priority = "Low";
  }

  let data = {
    columnTitles: "Await Feedback",
    title,
    description,
    dueDate,
    priority,
    subTasks,
    subTasks: subTasks.map((subTask) => ({
      description: subTask.description,
      completed: subTask.completed ?? false,
    })),
    category,
    users: selectedContacts,
  };

  try {
    await postDataToFirebase("tasks/", data);
  } catch (error) {
    console.error(error);
  }

  await loadTasks();
  closeAddTaskPopUpAwaitFeedback();
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
