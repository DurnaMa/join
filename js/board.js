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

/**
 * Renders tasks into their respective columns on the board.
 * Clears the content of all task columns before rendering.
 * Iterates through the `tasks` array, generates task cards, 
 * and appends them to the appropriate column based on the task's `columnTitles`.
 * If a task does not have a `columnTitles` property, it defaults to the "todo" column.
 * Finally, checks for and handles empty columns.
 *
 * @function
 * @global
 */
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

/**
 * Checks all columns in the document for child nodes and updates their content accordingly.
 * If a column is empty, it populates it with a placeholder generated by `generateEmptyColumn`.
 * If a column has tasks, it removes any existing "no-tasks" placeholder element.
 */
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

/**
 * Generates an HTML string representing an empty column message based on the provided column ID.
 *
 * @param {string} columnId - The ID of the column. Expected values are:
 *   - "todo" for the "To Do" column
 *   - "inprogress" for the "In Progress" column
 *   - "awaitfeedback" for the "Await Feedback" column
 *   - "done" for the "Done" column
 * @returns {string} An HTML string containing a message indicating that the column is empty.
 */
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

/**
 * Generates a task card element for a given task object.
 *
 * @param {Object} task - The task object containing details for the task card.
 * @param {number} task.id - The unique identifier for the task.
 * @param {string} task.title - The title of the task.
 * @param {Array<Object>} [task.subTasks] - An optional array of subtasks associated with the task.
 * @param {boolean} task.subTasks[].completed - Indicates whether a subtask is completed.
 * @param {Array<Object>} task.assignedUsers - An array of users assigned to the task.
 * @param {Object} task.category - The category object associated with the task.
 * @param {string} task.category.name - The name of the category.
 * @param {string} task.category.color - The color associated with the category.
 * @param {string} task.priority - The priority level of the task (e.g., "low", "medium", "high").
 *
 * @returns {HTMLDivElement} The generated task card element.
 */
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


/**
 * Sets the background color of a category element based on the task's category.
 *
 * @param {HTMLElement} categoryElement - The HTML element representing the category.
 * @param {Object} task - The task object containing category information.
 * @param {string} task.category - The category of the task (e.g., "User Story", "Technical Task").
 *
 * The function assigns a predefined color to the category element's background
 * based on the task's category. If the category is not recognized, a default
 * color of "#ccc" is applied.
 */
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

/**
 * Updates the `columnTitles` property of a task object to match a predefined set of column mappings.
 * If the `columnTitles` property exists, it is converted to lowercase, trimmed, and then mapped
 * to a corresponding value in the `columnMappings` object. If no match is found, the original
 * `columnTitles` value is retained.
 *
 * @param {Object} task - The task object to be updated.
 * @param {string} task.columnTitles - The current column title of the task.
 */
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

/**
 * Renders user information as colored div elements and appends them to the specified container.
 * 
 * @param {Object} task - The task object containing user information.
 * @param {Array|String} task.users - An array of user objects or a string representing a single user.
 * @param {HTMLElement} usersContainer - The container element where user divs will be appended.
 * 
 * User Object Structure:
 * @typedef {Object} User
 * @property {string} color - The background color associated with the user.
 * @property {string} initials - The initials of the user to display in the div.
 * 
 * Notes:
 * - If `task.users` is an array, each user object should have `color` and `initials` properties.
 * - If `task.users` is a string, it is assumed to be the name of a user, and the function will attempt to find the corresponding contact in the `contacts` array.
 * - If no matching contact is found for a string user, a default color of `#000` (black) is used.
 */
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
    // console.log("Fehler", taskId);
  }
}

function startDragging(event, id) {
  currentDraggedElement = id;
  event.dataTransfer.setData("text", id);
}

function allowDrop(event) {
  event.preventDefault();
}


/**
 * Handles the drop event for a drag-and-drop operation, updating the task's column
 * and synchronizing the change with Firebase.
 *
 * @async
 * @function drop
 * @param {DragEvent} event - The drag event triggered by dropping an item.
 * @param {string} column - The target column where the task is dropped.
 * @returns {Promise<void>} A promise that resolves when the task's column is updated in Firebase.
 */
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

/**
 * Appends a priority image to the specified task card based on the task's priority level.
 *
 * @param {HTMLElement} taskCard - The HTML element representing the task card.
 * @param {Object} task - The task object containing task details.
 * @param {number|string} task.id - The unique identifier of the task.
 * @param {string} task.priority - The priority level of the task. Expected values are "Urgent", "Medium", or "Low".
 *
 * The function dynamically creates an <img> element with the appropriate source and alt attributes
 * based on the task's priority and appends it to the priority element within the task card.
 */
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

/**
 * Filters and displays task cards based on the user's search input.
 * The function retrieves the search input, converts it to lowercase, 
 * and compares it with the title and description of each task card.
 * Matching task cards are displayed, while non-matching ones are hidden.
 * After filtering, it clears the search input and checks for empty columns.
 *
 * @function
 * @returns {void}
 */
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

/**
 * Deletes a task by its ID, removes it from Firebase, reloads the tasks, 
 * and updates the UI accordingly.
 *
 * @async
 * @function deleteTask
 * @param {string} taskId - The unique identifier of the task to be deleted.
 * @returns {Promise<void>} - A promise that resolves when the task is deleted and the UI is updated.
 */
async function deleteTask(taskId) {
  let id = tasks.findIndex((task) => task.id == taskId);
  let path = `/tasks/${tasks[id].id}`;
  await deleteDataFromFirebase(path);
  await loadTasks();
  renderTasks();
  document.getElementById("openTaskPopupDiv").innerHTML = "";
  closeTaskCardPopUp();
}

/**
 * Updates the progress of a task's subtasks and reflects the changes in the UI.
 * 
 * This function updates the completion status of subtasks for a given task based on the state
 * of the corresponding checkboxes in the DOM. It also updates the progress bar, saves the task
 * to Firebase, and re-renders the tasks.
 * 
 * @async
 * @function
 * @param {string} taskId - The unique identifier of the task to update.
 * @returns {Promise<void>} Resolves when the task is successfully saved and the UI is updated.
 */
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

/**
 * Updates the progress bar and the subtasks count display for a given task.
 *
 * @param {HTMLElement} progressBar - The progress bar element to update.
 * @param {number} checkedCount - The number of completed subtasks.
 * @param {Object} task - The task object containing subtasks.
 * @param {string} taskId - The unique identifier of the task.
 */
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

/**
 * Saves a task object to Firebase Realtime Database.
 *
 * @async
 * @function saveTaskToFirebase
 * @param {Object} task - The task object to be saved.
 * @param {string} task.id - The unique identifier for the task.
 * @throws {Error} Throws an error if the request to Firebase fails.
 * @returns {Promise<void>} A promise that resolves when the task is successfully saved.
 */
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

    // console.log(`erfolgreich.`);
  } catch (error) {
    console.error("Fehler:", error);
  }
}

/**
 * Moves a task to the next column based on the specified direction.
 *
 * @async
 * @function moveTaskToNextColumn
 * @param {string} taskId - The unique identifier of the task to be moved.
 * @param {number} direction - The direction to move the task. Use 1 for forward and -1 for backward.
 * @param {Event} event - The event object to stop propagation.
 * @returns {Promise<void>} Resolves when the task has been updated and the UI re-rendered.
 *
 * @description
 * This function updates the column and status of a task based on the direction provided.
 * It ensures the task remains within valid column boundaries and updates the data in Firebase.
 * After updating, it re-renders the tasks to reflect the changes in the UI.
 */
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

/**
 * Asynchronously creates a new task by gathering input values from the DOM, 
 * constructing a task object, and sending it to Firebase. After the task is 
 * created, it reloads the tasks and resets the task creation popup.
 *
 * @async
 * @function createTaskBtn
 * @returns {Promise<void>} A promise that resolves when the task is created 
 * and the UI is updated.
 *
 * @throws {Error} If there is an issue with posting data to Firebase.
 *
 * @description
 * This function performs the following steps:
 * 1. Retrieves input values for the task (title, description, due date, category, etc.).
 * 2. Constructs a task object with the gathered data.
 * 3. Sends the task object to Firebase using the `postDataToFirebase` function.
 * 4. Reloads the tasks by calling `loadTasks`.
 * 5. Closes and resets the task creation popup.
 * 6. Reloads the page to reflect the changes.
 */
async function createTaskBtn() {
  if (!validateForm()) {
    return; 
  }
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

/**
 * Determines the priority category based on the CSS class of the priority elements.
 *
 * @returns {string} The priority category as a string: "Urgent", "Medium", or "Low".
 */
function prioCategory() {
  if (!validateForm()) {
    return; 
  }
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

/**
 * Asynchronously creates a new task and assigns it to the "To Do" column.
 * 
 * This function gathers input values from the DOM, constructs a task object,
 * and sends it to Firebase. It also reloads tasks and refreshes the page
 * after the task is created.
 * 
 * @async
 * @function
 * @throws {Error} If there is an issue with posting data to Firebase.
 */
async function createTaskPlusToDoBtn() {
  if (!validateForm()) {
    return; 
  }
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

/**
 * Asynchronously creates a new task with the "In Progress" status and posts it to Firebase.
 * The task details are retrieved from the DOM elements, including title, description, due date,
 * category, priority, and selected contacts. Subtasks are also included in the task data.
 * After successfully posting the task, the function reloads the tasks, closes the "Add Task" popup,
 * and refreshes the page.
 *
 * @async
 * @function
 * @throws {Error} Logs an error to the console if the Firebase post operation fails.
 */
async function createTaskPlusInProgressBtn() {
  if (!validateForm()) {
    return; 
  }
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

/**
 * Asynchronously creates a new task with the "Await Feedback" column title and saves it to Firebase.
 * The task includes details such as title, description, due date, category, priority, subtasks, and assigned users.
 * After saving, it reloads the tasks, closes the "Add Task" popup, and refreshes the page.
 *
 * @async
 * @function createTaskPlusAwaitFeedbackBtn
 * @returns {Promise<void>} Resolves when the task is successfully created and the UI is updated.
 * @throws {Error} Logs an error to the console if the Firebase operation fails.
 */
async function createTaskPlusAwaitFeedbackBtn() {
  if (!validateForm()) {
    return; 
  }
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

/**
 * Handles the addition of a new subtask through a popup input field.
 * 
 * This function retrieves the value from the input field with the ID "subTaskPopUp",
 * validates it to ensure it is not empty, and creates a new subtask object with a 
 * unique ID and trimmed description. If the subtask description does not already 
 * exist in the `subTasks` array, it adds the new subtask to the array. Afterward, 
 * it re-renders the subtask list and clears the input field.
 * 
 * @function
 * @returns {void}
 */
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

/**
 * Displays a popup element with the ID "AddTaskPopupDiv" by removing the "d-none" class,
 * making it visible. The popup will automatically hide after 1.5 seconds by re-adding
 * the "d-none" class. If the element is not found, an error is logged to the console.
 */
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

