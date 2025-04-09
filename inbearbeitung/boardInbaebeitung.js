const columnOrder = ["todo", "inprogress", "awaitfeedback", "done"];

let currentDraggedElement;
let currentSelectedTask;
let currentUsers = [];
let currentPrio = [];

/**
 * Initializes the task board by loading necessary data and rendering tasks.
 * 
 * This asynchronous function:
 * - Loads user data by calling `loadDataUsers()`.
 * - Loads tasks by calling `loadTasks()`.
 * - Renders the tasks on the board by calling `renderTasks()`.
 * 
 * @async
 * @function initBoard
 * @returns {Promise<void>} A promise that resolves when the board initialization is complete.
 */
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
// function checkEmptyColumns() {
//   document.querySelectorAll(".column").forEach((column) => {
//     if (!column.hasChildNodes() || column.children.length === 0) {
//       column.innerHTML = generateEmptyColumn(column.id);
//     }
//   });
// }
function checkEmptyColumns() {
  document.querySelectorAll(".column").forEach((column) => {
    if (!column.hasChildNodes() || column.children.length === 0) {
      column.innerHTML = ""; // Entferne vorhandene Inhalte
      createDragArea(column, column.id); // Füge eine neue `drag-area` hinzu
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

  return /*html*/ `<div class="empty-column"><p>${text}</p></div>`;
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
  let taskCard = createTaskCardDiv(task); 
  let usersContainer = taskCard.querySelector(`#taskUsers-${task.id}`);

  userColor(task, usersContainer);
  taskColemTitel(task);
  let categoryElement = taskCard.querySelector(".task-card-category");
  categoryColor(categoryElement, task);
  chooseImgPriority(taskCard, task);

  taskCard.querySelector(".task-card-div").addEventListener("click", (event) => {
      if (!event.target.classList.contains("move-btn")) {
        openTaskPopup(task.id);
      }
    });
  return taskCard;
}

function createTaskCardDiv(task) {
  let completedSubtasks = task.subTasks ? task.subTasks.filter((st) => st.completed).length : 0;
  let totalSubtasks = task.subTasks ? task.subTasks.length : 0;
  let taskCard = document.createElement("div");
  taskCard.classList.add("task-card");
  taskCard.id = `task-${task.id}`;
  taskCard.draggable = true;
  taskCard.ondragstart = (event) => startDragging(event, task.id);
  taskCard.innerHTML += taskCardHTML(task, totalSubtasks, completedSubtasks);
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
 */
function userColor(task, usersContainer) {
  usersContainer.innerHTML = "";
  if (Array.isArray(task.users)) {
    let maxUsersToShow = 4;
    let totalUsers = task.users.length;

    task.users.slice(0, maxUsersToShow).forEach((user) => {
      let userDiv = document.createElement("div");
      userDiv.classList.add("tasks-user");
      userDiv.style.backgroundColor = user.color;
      userDiv.textContent = user.initials;
      usersContainer.appendChild(userDiv);
    });
    createContactInitialDiv(totalUsers, maxUsersToShow, usersContainer);
  } else createStringContact(task, usersContainer);
}

function createStringContact(task, usersContainer) {
  if (typeof task.users === "string") {
    let userDiv = document.createElement("div");
    userDiv.classList.add("tasks-user");
    const contact = contacts.find((c) => c.name === task.users);
    userDiv.style.backgroundColor = contact ? contact.color : "#000";
    userDiv.textContent = task.users;
    usersContainer.appendChild(userDiv);
  }
}

function createContactInitialDiv(totalUsers, maxUsersToShow, usersContainer) {
  if (totalUsers > maxUsersToShow) {
    let extraUsersDiv = document.createElement("div");
    extraUsersDiv.classList.add("tasks-user", "extra-users");
    extraUsersDiv.textContent = `+${totalUsers - maxUsersToShow}`;
    usersContainer.appendChild(extraUsersDiv);
  }
}

/**
 * Updates the status of a task in Firebase by changing its column.
 * 
 * This function:
 * - Finds the task in the `tasks` array by its `taskId`.
 * - If the task is found, updates its `status` property to the `newColumn` value.
 * - Sends the updated status to Firebase using the `patchDataToFirebase()` function.
 * 
 * @function updateTaskStatusInFirebase
 * @param {string} taskId - The ID of the task to update.
 * @param {string} newColumn - The new column (status) for the task.
 */
function updateTaskStatusInFirebase(taskId, newColumn) {
  let task = tasks.find((t) => t.id === taskId);
  if (task) {
    task.status = newColumn;
    patchDataToFirebase(`tasks/${taskId}`, { status: newColumn });
  }
}

/**
 * Initiates the dragging of an element by storing its ID and setting the drag data.
 * 
 * This function is called when a drag event starts on an element. It sets the `currentDraggedElement` 
 * to the element's ID and stores the element's ID in the dataTransfer object for the drag operation.
 * 
 * @function startDragging
 * @param {Event} event - The drag event triggered by the user.
 * @param {string} id - The ID of the element being dragged.
 */
function startDragging(event, id) {
  console.log("Dragging started:", id);
  currentDraggedElement = id;
  event.dataTransfer.setData("text", id);

  // Erstelle fehlende drag-area-Felder
  document.querySelectorAll(".column").forEach((columnElement) => {
    if (!columnElement.querySelector(".drag-area")) {
      createDragArea(columnElement, columnElement.id);
    }
  });

  // Aktiviere alle drag-area-Felder
  document.querySelectorAll(".drag-area").forEach((area) => {
    console.log("Aktiviere drag-area:", area);
    area.classList.add("active");
  });
}

/**
 * Allows an element to accept a dragged item by preventing the default behavior.
 * 
 * This function is called when an element is a target for a drag-and-drop operation. It prevents 
 * the default action to allow the element to accept the dragged content.
 * 
 * @function allowDrop
 * @param {Event} event - The dragover event triggered when an element is being dragged over.
 */
function allowDrop(event) {
  event.preventDefault();
}

function autoScroll(event) {
  const scrollMargin = 50; // Abstand vom Rand, ab dem gescrollt wird
  const scrollSpeed = 10; // Geschwindigkeit des Scrollens

  // Scrollen der gesamten Seite
  if (event.clientY < scrollMargin) {
    window.scrollBy(0, -scrollSpeed);
  } else if (window.innerHeight - event.clientY < scrollMargin) {
    window.scrollBy(0, scrollSpeed);
  }

  // Scrollen innerhalb der Spalte
  const column = event.target.closest(".column");
  if (column) {
    const rect = column.getBoundingClientRect();
    if (event.clientY - rect.top < scrollMargin) {
      column.scrollBy(0, -scrollSpeed);
    } else if (rect.bottom - event.clientY < scrollMargin) {
      column.scrollBy(0, scrollSpeed);
    }
  }
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
function startDragging(event, id) {
  console.log("Dragging started:", id);
  currentDraggedElement = id;
  event.dataTransfer.setData("text", id);

  // Erstelle fehlende drag-area-Felder
  document.querySelectorAll(".column").forEach((columnElement) => {
    if (!columnElement.querySelector(".drag-area")) {
      createDragArea(columnElement, columnElement.id);
    }
  });

  // Aktiviere alle drag-area-Felder
  document.querySelectorAll(".drag-area").forEach((area) => {
    console.log("Aktiviere drag-area:", area);
    area.classList.add("active");
  });

  // Überprüfe die Sichtbarkeit der drag-area
  document.querySelectorAll(".drag-area").forEach((area) => {
    const styles = window.getComputedStyle(area);
    console.log("Berechnete CSS-Werte:", {
      display: styles.display,
      visibility: styles.visibility,
      opacity: styles.opacity,
      zIndex: styles.zIndex,
    });
  });
}

async function drop(event, column) {
  event.preventDefault();
  const taskId = event.dataTransfer.getData("text");
  const task = tasks.find((t) => t.id === taskId);

  if (task) {
    task.columnTitles = column;
    renderTasks();
    await patchDataToFirebase(`tasks/${task.id}`, { columnTitles: column });
  }

  document.querySelectorAll(".drag-area").forEach((area) => {
    console.log("Deaktiviere drag-area");
    area.classList.remove("active");
  });
}

/**
 * Erstellt eine neue `drag-area` in der angegebenen Spalte.
 *
 * @param {HTMLElement} columnElement - Das Spaltenelement, in dem die `drag-area` erstellt werden soll.
 * @param {string} columnId - Die ID der Spalte.
 */
function createDragArea(columnElement, columnId) {
  if (!columnElement.querySelector(".drag-area")) {
    const dragArea = document.createElement("div");
    dragArea.classList.add("drag-area"); // Standardmäßig unsichtbar
    dragArea.setAttribute("ondragover", "allowDrop(event)");
    dragArea.setAttribute("ondrop", `drop(event, '${columnId}')`);
    columnElement.appendChild(dragArea);
    console.log(`Drag-area erstellt in Spalte: ${columnId}`);
  }
}

function initializeDragAreas() {
  document.querySelectorAll(".column").forEach((columnElement) => {
    createDragArea(columnElement, columnElement.id);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initializeDragAreas();
});

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
  let searchTaskInput = document.getElementById("searchTask").value.toLowerCase();
  let allTasks = document.querySelectorAll(".task-card");
  let searchInfo = document.getElementById("searchInfo");
  let taskFound = false;

  taskFound = searchTaskCotainerContent(allTasks, searchTaskInput, taskFound);
  searchPopUpDiv(searchTaskInput, searchInfo, taskFound);
}

document.getElementById("searchTask").addEventListener("keyup", searchTask);

function searchPopUpDiv(searchTaskInput, searchInfo, taskFound) {
  if (searchTaskInput === "") {
    searchInfo.classList.add("d-none");
  } else {
    if (taskFound) {
      searchInfo.classList.add("d-none");
    } else {
      searchInfo.classList.remove("d-none");
    }
  }
}

function searchTaskCotainerContent(allTasks, searchTaskInput, taskFound) {
  allTasks.forEach((task) => {
    let title = task.querySelector("h3").innerText.toLowerCase();
    let description = task.querySelector("p").innerText.toLowerCase();

    if (title.includes(searchTaskInput) || description.includes(searchTaskInput)) {
      task.style.display = "block";
      taskFound = true;
    } else {
      task.style.display = "none";
    }
  });
  return taskFound;
}

