/**
 * Opens a popup displaying the details of a specific task.
 *
 * This function locates a task by its ID, retrieves its details, and renders
 * a popup with the task's information. It also disables scrolling on the body
 * element while the popup is open.
 *
 * @param {string|number} taskId - The unique identifier of the task to display.
 * @throws {Error} Logs an error to the console if the task with the given ID is not found.
 */
function openTaskPopup(taskId) {
  document.getElementById("bodyId").classList.add("overflow-hidden");
  // console.log("Task ID:", taskId);
  let id = tasks.findIndex((task) => task.id == taskId);
  if (id === -1) {
    console.error("Task nicht gefunden:", taskId);
    return;
  }

  let currentSelectedTask = tasks[id];
  // console.log("Gewählte Aufgabe:", currentSelectedTask);
  // console.log("Assigned Users:", currentSelectedTask.users);
  // console.log("Subtasks:", currentSelectedTask.subTasks);

  let openTaskPopupDiv = document.getElementById("openTaskPopupDiv");
  openTaskPopupDiv.classList.remove("d-none");
  openTaskPopupDiv.innerHTML = renderTasksCardPopup(currentSelectedTask);
}

/**
 * Opens the edit task popup for a specific task.
 * 
 * This function locates the task by its ID, retrieves the task data,
 * and updates the DOM to display the edit task popup while hiding the open task popup.
 * 
 * @param {number|string} taskId - The unique identifier of the task to be edited.
 */
function openEditTaskPopup(taskId) {
  let id = tasks.findIndex((task) => task.id == taskId);
  let currentSelectedTask = tasks[id];

  let editTaskPopupDiv = document.getElementById("editTaskPopupDiv");
  let openTaskPopupDiv = document.getElementById("openTaskPopupDiv");
  openTaskPopupDiv.classList.add("d-none");
  editTaskPopupDiv.classList.remove("d-none");
  editTaskPopupDiv.innerHTML = renderEditTasksCardPopup(
    currentSelectedTask,
    taskId
  );
}

/**
 * Updates an existing task with new data provided through the edit task form.
 * 
 * @async
 * @function
 * @param {Event} event - The event object triggered by the form submission.
 * @returns {Promise<void>} - A promise that resolves when the task is successfully updated.
 * 
 * @throws Will log an error if the task ID is missing or if there is an issue updating the task in Firebase.
 * 
 * @description
 * This function handles the process of updating a task. It retrieves the task ID from the event target,
 * validates the required fields, updates the task data, and sends the updated task to Firebase.
 * If the update is successful, it closes the edit task popup and re-renders the tasks.
 * 
 * Steps:
 * 1. Prevents the default form submission behavior.
 * 2. Retrieves the task ID from the event target.
 * 3. Validates the presence of the task ID and required fields (title and due date).
 * 4. Updates the task data, including title, description, due date, priority, contacts, and subtasks.
 * 5. Sends the updated task data to Firebase using a PATCH request.
 * 6. Handles errors during the update process.
 * 7. Reloads the tasks and updates the UI.
 */
async function updateEditTask(event) {
  event.preventDefault();
  let taskId = event.target.getAttribute("data-task-id");
  if (!taskId) {
    console.error("Task ID fehlt");
    return;
  }

  let { existingTask, updatedTitle, updatedDueDate, updatedDescription, updatedPriority } = await updateVariables(taskId);

  let updatedContacts = {};
  Array.from(selectedContacts).forEach((name, index) => {
    updatedContacts[index] = name;
  });

  let newSubtasks = subTaskList(existingTask);
  if (!updatedTitle || !updatedDueDate) {
    alert("Bitte fülle alle Pflichtfelder aus.");
    return;
  }

  let updatedTask = updateData(existingTask, updatedTitle, updatedDescription, updatedDueDate, updatedPriority, updatedContacts, newSubtasks);

  try {
    await patchDataToFirebase(`tasks/${taskId}`, updatedTask);
    // console.log("Task erfolgreich bearbeitet:", updatedTask);
    closeEditTaskCardPopUp();
    renderTasks();
  } catch (error) {
    console.error("Fehler beim Bearbeiten der Aufgabe:", error);
  }

  await loadTasks();
}

/**
 * Updates the properties of an existing task with new values.
 *
 * @param {Object} existingTask - The original task object to be updated.
 * @param {string} updatedTitle - The new title for the task.
 * @param {string} updatedDescription - The new description for the task.
 * @param {string} updatedDueDate - The new due date for the task in a string format.
 * @param {string} updatedPriority - The new priority level for the task.
 * @param {Array} updatedContacts - An array of updated contacts (users) associated with the task.
 * @param {Array} newSubtasks - An array of new subtasks for the task.
 * @returns {Object} - A new task object with the updated properties.
 */
function updateData(existingTask, updatedTitle, updatedDescription, updatedDueDate, updatedPriority, updatedContacts, newSubtasks) {
  return {
    ...existingTask,
    title: updatedTitle,
    description: updatedDescription,
    dueDate: updatedDueDate,
    priority: updatedPriority,
    users: updatedContacts,
    subTasks: newSubtasks,
    category: existingTask.category || "",
  };
}

/**
 * Generates a list of sub-task objects based on the current DOM structure and an existing task.
 *
 * @param {Object} existingTask - The existing task object containing sub-task data.
 * @param {Array} [existingTask.subTasks] - An optional array of sub-task objects from the existing task.
 * @param {boolean} [existingTask.subTasks[].completed] - The completion status of each sub-task.
 * @returns {Array<Object>} An array of sub-task objects.
 * @returns {string} return[].id - The unique identifier for the sub-task.
 * @returns {string} return[].description - The description text of the sub-task.
 * @returns {boolean} return[].completed - The completion status of the sub-task.
 */
function subTaskList(existingTask) {
  return Array.from(document.querySelectorAll("#subTaskList li")).map((li, i) => {
    let subTaskTextElement = li.querySelector(".subTask-text");
    let subTaskDescription = subTaskTextElement ? subTaskTextElement.innerText.trim() : "";
    let subTaskId = li.getAttribute("data-id") || crypto.randomUUID();

    return {
      id: subTaskId, description: subTaskDescription, completed: existingTask.subTasks?.[i]?.completed ?? false,
    };
  });
}

/**
 * Updates and retrieves task variables from the DOM and Firebase.
 *
 * @async
 * @function
 * @param {string} taskId - The ID of the task to retrieve from Firebase.
 * @returns {Promise<Object>} A promise that resolves to an object containing:
 *   @property {Object} existingTask - The existing task data retrieved from Firebase, or an empty object if not found.
 *   @property {string} updatedTitle - The updated title from the input field, trimmed of whitespace.
 *   @property {string} updatedDescription - The updated description from the textarea, trimmed of whitespace.
 *   @property {string} updatedDueDate - The updated due date from the input field.
 *   @property {string} updatedPriority - The updated priority, determined by the current selection or the existing task's priority.
 */
async function updateVariables(taskId) {
  let taskRef = await getDataFromFirebase(`tasks/${taskId}`);
  let existingTask = taskRef || {};
  let updatedTitle = document.getElementById("titleInput").value.trim();
  let updatedDescription = document.getElementById("descriptionTextarea").value.trim();
  let updatedDueDate = document.getElementById("dueDateInput").value;
  let updatedPriority = window.currentSelectedPriority || existingTask.priority || "";
  return { existingTask, updatedTitle, updatedDueDate, updatedDescription, updatedPriority };
}

/**
 * Displays the "Add Task" popup button by modifying the DOM.
 * 
 * This function performs the following actions:
 * 1. Adds the "overflow-hidden" class to the body element to prevent scrolling.
 * 2. Removes the "d-none" class from the "addNewTaskBtnDiv" element to make it visible.
 * 3. Sets the inner HTML of the "addNewTaskBtnDiv" element to the rendered "Add Task" popup button.
 * 
 * @function
 */
function addTaskPopupBtn() {
  document.getElementById("bodyId").classList.add("overflow-hidden");
  let addNewTaskBtnDiv = document.getElementById("addNewTaskBtnDiv");
  addNewTaskBtnDiv.classList.remove("d-none");
  addNewTaskBtnDiv.innerHTML = renderAddTaskPoupBtn();
  prioMedium();
  datelimit();
}

/**
 * Displays the "Add Task" popup for the "To-Do" section and prevents body scrolling.
 * 
 * This function adds a CSS class to the body element to disable scrolling and makes
 * the "Add Task" popup visible by removing the "d-none" class from its container.
 * It also populates the popup container with the rendered HTML content.
 * 
 * @function
 * @returns {void}
 */
function addTaskPopupPlusToDoBtn() {
  document.getElementById("bodyId").classList.add("overflow-hidden");
  let openTaskPopupToDoDiv = document.getElementById("openTaskPopupToDoDiv");
  openTaskPopupToDoDiv.classList.remove("d-none");
  openTaskPopupToDoDiv.innerHTML = renderAddTaskPopupToDoPlus();
  prioMedium();
  datelimit();
}

/**
 * Displays the "Add Task" popup for tasks in progress.
 * 
 * This function adds a CSS class to the body element to prevent scrolling,
 * makes the "Add Task" popup for tasks in progress visible by removing the
 * "d-none" class, and sets its inner HTML content by rendering the popup.
 * 
 * @function
 */
function addTaskPopupPlusInProgressBtn() {
  document.getElementById("bodyId").classList.add("overflow-hidden");
  let openTaskPopupInProgressDiv = document.getElementById(
    "openTaskPopupInProgressDiv"
  );
  openTaskPopupInProgressDiv.classList.remove("d-none");
  openTaskPopupInProgressDiv.innerHTML = renderAddTaskPopupInProgressPlus();
  prioMedium();
  datelimit();
}

/**
 * Displays a task popup for adding a task and awaiting feedback.
 * 
 * This function modifies the DOM by adding an "overflow-hidden" class to the body element
 * to prevent scrolling and makes the "openTaskPopupAwaitFeedbackDiv" element visible
 * by removing the "d-none" class. It also updates the inner HTML of the popup
 * with the rendered content from `renderAddTaskPopupAwaitFeedbackPlus()`.
 */
function addTaskPopupPlusAwaitFeedbackBtn() {
  document.getElementById("bodyId").classList.add("overflow-hidden");
  let openTaskPopupAwaitFeedbackDiv = document.getElementById(
    "openTaskPopupAwaitFeedbackDiv"
  );
  openTaskPopupAwaitFeedbackDiv.classList.remove("d-none");
  openTaskPopupAwaitFeedbackDiv.innerHTML =
    renderAddTaskPopupAwaitFeedbackPlus();
    prioMedium();
    datelimit();
}

/**
 * Closes the "Add Task" popup and resets the UI state.
 * 
 * This function performs the following actions:
 * - Removes the "overflow-hidden" class from the body element to restore scrolling.
 * - Hides the "Add New Task" button by adding the "d-none" class.
 * - Hides the "Add Task" popup by adding the "d-none" class.
 * - Hides the "Open Task" popup by adding the "d-none" class.
 * - Reloads the current page to ensure the UI is updated.
 */
function closeAddTaskPopUp() {
  document.getElementById("bodyId").classList.remove("overflow-hidden");
  document.getElementById("addNewTaskBtnDiv").classList.add("d-none");
  document.getElementById("addTaskPopupDiv").classList.add("d-none");
  document.getElementById("openTaskPopupDiv").classList.add("d-none");
  location.reload();
}

/**
 * Closes the "Add Task" popup for the "To-Do" section.
 * 
 * This function removes the "overflow-hidden" class from the body element to restore scrolling,
 * hides the popup by adding the "d-none" class to its container, and reloads the page to reflect
 * any changes made.
 */
function closeAddTaskPopUpToDo() {
  document.getElementById("bodyId").classList.remove("overflow-hidden");
  document.getElementById("openTaskPopupToDoDiv").classList.add("d-none");
  location.reload();
}

/**
 * Closes the "Add Task" popup in the "In Progress" section.
 * 
 * This function performs the following actions:
 * - Removes the "overflow-hidden" class from the body element to restore scrolling.
 * - Adds the "d-none" class to the popup container to hide it.
 * - Reloads the current page to reflect any changes.
 */
function closeAddTaskPopUpInProgress() {
  document.getElementById("bodyId").classList.remove("overflow-hidden");
  document.getElementById("openTaskPopupInProgressDiv").classList.add("d-none");
  location.reload();
}

/**
 * Closes the "Add Task" popup for the "Await Feedback" section.
 * 
 * This function performs the following actions:
 * - Removes the "overflow-hidden" class from the body element to restore scrolling.
 * - Adds the "d-none" class to the popup element to hide it.
 * - Reloads the page to reflect any changes made.
 */
function closeAddTaskPopUpAwaitFeedback() {
  document.getElementById("bodyId").classList.remove("overflow-hidden");
  document
    .getElementById("openTaskPopupAwaitFeedbackDiv")
    .classList.add("d-none");
    location.reload();
}

/**
 * Closes the task card popup by performing the following actions:
 * - Removes the "overflow-hidden" class from the body element to restore scrolling.
 * - Adds the "d-none" class to the popup container to hide it.
 * - Reloads the current page to refresh the state.
 */
function closeTaskCardPopUp() {
  document.getElementById("bodyId").classList.remove("overflow-hidden");
  document.getElementById("openTaskPopupDiv").classList.add("d-none");
  location.reload();
}

/**
 * Closes the edit task card popup by performing the following actions:
 * - Removes the "overflow-hidden" class from the body element to restore scrolling.
 * - Adds the "d-none" class to the edit task popup div to hide it.
 * - Reloads the current page to reflect any changes made.
 */
function closeEditTaskCardPopUp() {
  document.getElementById("bodyId").classList.remove("overflow-hidden");
  document.getElementById("editTaskPopupDiv").classList.add("d-none");
  location.reload();
}

/**
 * Toggles the visibility of the contact list popup and updates its content.
 * 
 * This function dynamically generates the HTML content for a list of contacts
 * and displays it in a popup. Each contact is represented with their initials,
 * name, and a checkbox to select or deselect them. The function also handles
 * toggling the visibility of the popup and updates the display of selected
 * contacts when the popup is hidden.
 * 
 * Dependencies:
 * - `contacts`: An array of contact objects, where each object contains `name` and `color` properties.
 * - `selectedContacts`: A Set containing the names of currently selected contacts.
 * - `generateInitials(name)`: A function that generates initials from a contact's name.
 * - `toggleCheckbox(event, name)`: A function that handles checkbox toggle events.
 * - `updateSelectedContactsDisplay()`: A function that updates the display of selected contacts.
 * - `openclassList()`: A function that performs additional operations when the popup is opened.
 * 
 * HTML Structure:
 * - The popup content is rendered inside an element with the ID `assignedContactsListPopUp`.
 * - Each contact is displayed with a colored initials badge, their name, and a checkbox.
 * 
 * Side Effects:
 * - Modifies the innerHTML of the `assignedContactsListPopUp` element.
 * - Toggles the `hidden` class on the `assignedContactsListPopUp` element.
 * - Calls `updateSelectedContactsDisplay()` when the popup is hidden.
 * - Calls `openclassList()` when the popup is opened.
 */
function contactListPopUp() {
  let contactList = document.getElementById("assignedContactsListPopUp");
  
  contactList.innerHTML = contacts
    .map((contact) => {
      const initials = generateInitials(contact.name);
      const isChecked = selectedContacts.has(contact.name) ? "checked" : "";
      const isActive = selectedContacts.has(contact.name) ? "active" : "";
      return `
        <div class="assignedContactContentPopUp ${isActive}" onclick="toggleCheckbox(event, '${contact.name}')">
          <div class="assignedContactsPopUp">
            <span class="assignedShortcutNamePopUp" style="background-color: ${contact.color};">${initials}</span>
            <span class="assignedNamePopUp">${contact.name}</span>
          </div>
          <input type="checkbox" id="contact-${contact.name}" ${isChecked} onclick="toggleCheckbox(event, '${contact.name}')">
        </div>`;
    }).join("");
  contactList.classList.toggle("hidden");
  if (contactList.classList.contains("hidden")) {
    updateSelectedContactsDisplay();
  }
  openclassList();
}
