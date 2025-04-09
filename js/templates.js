/**
 * Prepares and returns the HTML for a task popup card, including the appropriate priority icon.
 * 
 * This function selects the correct priority image based on the task's priority value
 * (`'Urgent'`, `'Medium'`, or `'Low'`), and passes it along with the task data
 * to `renderTasksCardPopupHTML()` to generate the final HTML string.
 * 
 * @function renderTasksCardPopup
 * @param {Object} task - The task object containing all necessary task data.
 * @param {string} task.priority - The priority of the task (used to determine the icon).
 * @returns {string} The HTML string for rendering the task popup card.
 */
function renderTasksCardPopup(task) {
  let priorityImages = {
    Urgent: "urgentRed.png",
    Medium: "mediumYellow.png",
    Low: "lowGreen.png",
  };
  let priorityImageSrc = `/assets/icons/${
    priorityImages[task.priority] || "default.png"
  }`;
  return /*html*/ renderTasksCardPopupHTML(task, priorityImageSrc);
}

/**
 * Generates the HTML markup for a task detail popup card.
 * 
 * This function returns a string of HTML that represents a task's detailed view in a popup, including:
 * - Category and close button
 * - Task title, description, due date, and priority with corresponding icon
 * - Assigned users with colored initials
 * - Subtasks with checkboxes to mark them as complete
 * - Buttons to delete or edit the task
 * 
 * The function includes fallbacks for missing data (e.g. "No Title", "No Description").
 * It also integrates event handlers for closing the popup, updating subtasks, editing, and deleting the task.
 * 
 * @function renderTasksCardPopupHTML
 * @param {Object} task - The task object containing details to display.
 * @param {string} task.id - The unique ID of the task.
 * @param {string} [task.category] - The task's category.
 * @param {string} [task.title] - The title of the task.
 * @param {string} [task.description] - The description of the task.
 * @param {string} [task.dueDate] - The due date of the task.
 * @param {string} [task.priority] - The priority of the task (e.g. 'urgent', 'medium', 'low').
 * @param {Array<Object>} [task.users] - An array of assigned users with `name`, `color`, and `initials`.
 * @param {Array<Object>} [task.subTasks] - An array of subtasks with `description` and `completed` boolean.
 * @param {string} priorityImageSrc - The image source URL for the priority icon.
 * @returns {string} The HTML string representing the task popup card.
 */
function renderTasksCardPopupHTML(task, priorityImageSrc) {
  return /*html*/ `
  <div class="shadow-div"></div>
    <div class="taskCardPopup" id="taskPopUp" data-task-id="${task.id}">
      <div class="taskCardPopupCategory">
        <div class="taskCardPopupCategoryColor">
          <h2>${task.category || "No Category"}</h2>
        </div>
        <img onclick="closeTaskCardPopUp()" src="/assets/icons/close.png" alt="" />
      </div>

      <div class="taskCardContent">
      <div class="taskCardPopupTitle">${task.title || "No Title"}</div>
      <div class="taskCardPopupDescription">${task.description || "No Description"}</div>
      <div class="taskCardPopupDate">
        <label>Due date:</label>
        <span>${task.dueDate || "N/A"}</span> 
      </div>
      <div class="taskCardPopupPrio">
        <label>Priority:</label>
        <span>${task.priority || "Medium"} 
          <img src="${priorityImageSrc}" alt="${task.priority}">
        </span> 
      </div>
      <label class="taskCardPopupLabel">Assigned To:</label>
      <div class="taskCardPopupContact">
        ${Array.isArray(task.users) && task.users.length > 0
      ? task.users
        .map(
          (user) => `<div class="taskCardPopupContactName"><div class="taskCardPopupContactInitials" style="background-color: ${user.color}">
                    ${user.initials || "??"} 
                  </div>
                  <div>${user.name || "No Name"}</div>
                  </div>
                  `
        )
        .join("")
      : "<p>Kein Benutzer zugewiesen</p>"}
      </div>
    <label class="taskCardPopupLabel">Subtasks</label>
      <div class="taskCardPopupSubTasks">
        <div class="progress-container-popup">
          ${Array.isArray(task.subTasks) && task.subTasks.length > 0
      ? task.subTasks
        .map(
          (subtasks, index) => `
                    <div class="step">
                      <input type="checkbox" id="step${index}-${task.id}"
                        onchange="updateSteps('${task.id}')" 
                        ${subtasks.completed ? "checked" : ""}>
                      <label for="step${index}-${task.id}">${subtasks.description || "Unnamed Subtask"}</label>
                    </div>
                  `
        )
        .join("")
      : "<p>Keine Subtasks vorhanden</p>"}
        </div>
      </div>

        </div>
      <div class="taskCardPopupButtons">
        <div onclick="deleteTask('${task.id}')">
          <img src="/assets/icons/deleteContact.png" alt="">Delete
        </div>
        <hr class="hrBoardTaskPopUp">
        <div onclick="openEditTaskPopup('${task.id}')">
          <img src="/assets/icons/edit-pencil.png" alt="">Edit
        </div>
      </div>
    </div>
  `;
}

/**
 * Prepares and returns the HTML for the edit task popup, initializing necessary state.
 * 
 * This function extracts relevant task data from the `currentSelectedTask` object, such as:
 * - Title, description, due date
 * - Assigned users (used to update `selectedContacts`)
 * - Subtasks (assigned to global `subTasks`)
 * - Priority (assigned to global `window.currentSelectedPriority`)
 * 
 * It then calls `renderEditTasksCardPopupHTML()` with the extracted data to generate the HTML content.
 * 
 * @function renderEditTasksCardPopup
 * @param {Object} currentSelectedTask - The task object containing all editable fields.
 * @param {string} currentSelectedTask.title - The task title.
 * @param {string} currentSelectedTask.description - The task description.
 * @param {string} currentSelectedTask.dueDate - The task's due date.
 * @param {Array<Object>} currentSelectedTask.users - List of assigned user objects.
 * @param {Array<Object>} currentSelectedTask.subTasks - List of subtasks for the task.
 * @param {string} currentSelectedTask.priority - The task's current priority.
 * @param {string} taskId - The ID of the task being edited.
 * @returns {string} The HTML string for the edit task popup.
 */
function renderEditTasksCardPopup(currentSelectedTask, taskId) {
  let assignedContacts = currentSelectedTask.users || [];
  let title = currentSelectedTask.title;
  let description = currentSelectedTask.description;
  let dueDate = currentSelectedTask.dueDate;
  subTasks = currentSelectedTask.subTasks || [];
  window.currentSelectedPriority = currentSelectedTask.priority;

  selectedContacts = new Set(assignedContacts.map((user) => user.name));

  return renderEditTasksCardPopupHTML(title, description, dueDate, assignedContacts, taskId);
}

/**
 * Generates the HTML markup for the edit task popup interface.
 * 
 * This function returns a full HTML string that represents the popup form
 * used to edit an existing task. It includes:
 * 
 * - Title, description, and due date inputs
 * - Priority selection buttons with appropriate styling and icons
 * - Assigned contacts with dropdown selection and current visual display
 * - Subtask list with inline editing, deleting, and saving capabilities
 * - A submit button to confirm the changes
 * 
 * It uses global variables like `subTasks` and `window.currentSelectedPriority` to 
 * maintain state across renders and actions.
 * 
 * @function renderEditTasksCardPopupHTML
 * @param {string} title - The current title of the task.
 * @param {string} description - The current description of the task.
 * @param {string} dueDate - The current due date of the task in `YYYY-MM-DD` format.
 * @param {Array<Object>} assignedContacts - List of assigned contact objects (with `color`, `initials`).
 * @param {string} taskId - The unique identifier of the task being edited.
 * @returns {string} A string of HTML markup for the edit task popup.
 */
function renderEditTasksCardPopupHTML(title, description, dueDate, assignedContacts, taskId) {
  return /*html*/ `
    <div class="shadow-div"></div>
    <div class="taskCardEditPopup">
      <div class="task-edit-close-popup-div">
        <div class="closeImgContent">
          <img onclick="closeEditTaskCardPopUp()" class="task-edit-close-popup" src="/assets/icons/close.png" alt=""/>
        </div>
      </div>
      <div class="taskCardEditContent">
      <label>Title</label>
      <input id="titleInput" value="${title}" class="task-edit-input-popup" placeholder="Enter a title" type="text" />
      <label>Description</label>
      <textarea id="descriptionTextarea" class="task-edit-input-popup" placeholder="Enter a description">${description}</textarea>
      <label>Due Date</label>
      <input onclick="datelimit()" onkeydown="return false;" id="date" value="${dueDate}" class="task-edit-input-popup" type="date"/>
        
      <label>Priority</label>
      <div class="task-edit-prio-popup">
        <button onclick="updatePriority('Urgent')" id="prioUrgentEditPopup" class="prioBtn ${window.currentSelectedPriority === "Urgent" ? "prioUrgentRed" : ""}">
          Urgent
          <img src="${window.currentSelectedPriority === "Urgent"
      ? "/assets/icons/urgentWhite.png"
      : "/assets/icons/urgentRed.png"}" alt="" />
        </button>
        <button onclick="updatePriority('Medium')" id="prioMediumEditPopup" class="prioBtn ${window.currentSelectedPriority === "Medium" ? "prioMediumYellow" : ""}">
          Medium
          <img src="${window.currentSelectedPriority === "Medium"
      ? "/assets/icons/mediumWhite.png"
      : "/assets/icons/mediumYellow.png"}" alt="" />
        </button>
        <button onclick="updatePriority('Low')" id="prioLowEditPopup" class="prioBtn ${window.currentSelectedPriority === "Low" ? "prioLowGreen" : ""}">
          Low
          <img src="${window.currentSelectedPriority === "Low"
      ? "/assets/icons/lowWhite.png"
      : "/assets/icons/lowGreen.png"}" alt="" />
        </button>
      </div>

      <label for="contactSelection">Assigned to</label>
      <div>
        <div onclick="contactListPopUp()" class="assignedContainer">
          <span>Select contacts to assign</span>
          <img id="assignedArrowDown" src="/assets/icons/arrow_drop_down.png" alt="" />
          <img id="assignedArrowUp" class="d-none" src="/assets/icons/arrow_drop_up.png" alt="" />
        </div>
        <div id="assignedContactsListPopUp" class="hidden"></div>
      </div>
      <div id="selectedContactsDisplay" class="selectedContactsContainerPopUp">
        ${assignedContacts
      .map(
        (contact) => `<span class="assignedShortcutName" style="background-color: ${contact.color}">${contact.initials}</span>`
      )
      .join("")}
      </div>
    
      <label for="subtask">Subtasks</label>
      <div id="addSubTask">
        <input id="subTaskPopUp" class="addSubTask" placeholder="Add new subtask" type="text"
              onkeydown="if(event.key === 'Enter') { event.preventDefault(); addSubTaskPopUp(); }">
        <img onclick="addSubTaskPopUp()" style="cursor: pointer" src="/assets/icons/Subtasks_plus.png" alt="" />
      </div>
      <ul id="subTaskList">
        ${subTasks
      .map(
        (subTask, i) => `
          <li class="subTask" data-index="${i}">
            <input id="subInputEdit-${i}" type="text" class="subTask-edit-input d-none" value="${subTask.description}">
            <span id="subEditSpan-${i}" class="subTask-text">${subTask.description}</span>
            <div class="subTask-actions">
              <div class="icon-wrapper">
                <img id="subEditImgPen-${i}" src="/assets/icons/edit-icon.png" alt="Edit" onclick="editSubTask(${i})" class="action-icon edit-icon">
              </div>
              <div class="icon-wrapper">
                <img src="/assets/icons/delete-icon.png" alt="Delete" onclick="deleteSubTask(${i})" class="action-icon delete-icon">
              </div>
              <div class="separator"></div>
              <div class="icon-wrapper">
                <img id="subEditImgCheck-${i}" src="/assets/icons/checkBgWhite.png" alt="Save" onclick="saveSubTask(${i})" class="action-icon save-icon d-none">
              </div>
            </div>
          </li>
        `
      )
      .join("")}
      </ul>
      </div>
      <div class="button-ok-div">
        <div class="buttonContent">
        <button onclick="updateEditTask(event)" data-task-id="${taskId}" class="button-ok">Ok <img src="/assets/icons/check.png" alt="" /></button>
        </div>
      </div>
    </div>
  `;
}

/**
 * Updates the priority styling and icon for the selected priority level.
 *
 * This function modifies the CSS classes and image sources of priority elements
 * in the DOM based on the provided `newPriority` value. It ensures that the
 * selected priority is visually highlighted while resetting the styles of other
 * priority levels.
 *
 * @param {string} newPriority - The new priority level to set.
 *                               Expected values: "Urgent", "Medium", or "Low".
 */
function updatePriority(newPriority) {
  window.currentSelectedPriority = newPriority;

  const priorityStyles = {
    Urgent: {class: "prioUrgentRed",imgSrc: "/assets/icons/urgentWhite.png",},
    Medium: {class: "prioMediumYellow",imgSrc: "/assets/icons/mediumWhite.png",},
    Low: {class: "prioLowGreen",imgSrc: "/assets/icons/lowWhite.png",},
  };

  document.getElementById("prioUrgentEditPopup").classList.remove(priorityStyles.Urgent.class);
  document.getElementById("prioMediumEditPopup").classList.remove(priorityStyles.Medium.class);
  document.getElementById("prioLowEditPopup").classList.remove(priorityStyles.Low.class);
  document.getElementById("prioUrgentEditPopup").querySelector("img").src = "/assets/icons/urgentRed.png";
  document.getElementById("prioMediumEditPopup").querySelector("img").src = "/assets/icons/mediumYellow.png";
  document.getElementById("prioLowEditPopup").querySelector("img").src = "/assets/icons/lowGreen.png";
  document.getElementById(`prio${newPriority}EditPopup`).classList.add(priorityStyles[newPriority].class);
  document.getElementById(`prio${newPriority}EditPopup`).querySelector("img").src = priorityStyles[newPriority].imgSrc;
}

/**
 * Generates the HTML structure for a task card.
 *
 * @param {Object} task - The task object containing details about the task.
 * @param {string} task.id - The unique identifier for the task.
 * @param {string} task.category - The category of the task.
 * @param {string} task.title - The title of the task.
 * @param {string} task.description - A brief description of the task.
 * @param {number} totalSubtasks - The total number of subtasks for the task.
 * @param {number} completedSubtasks - The number of completed subtasks for the task.
 * @returns {string} The HTML string representing the task card.
 */
function taskCardHTML(task, totalSubtasks, completedSubtasks) {
  return /*html*/ `
    <div class="task-card-div">
      <div class="task-card-category-div">
        <div class="task-card-category" id="taskCategory-${task.id}">
          <h2 class="task-card-category-h2" id="taskCategoryH2">${
            task.category
          }</h2>
        </div>
        <div class="task-controls">
        <img class="move-img-up" onclick="moveTaskToNextColumn('${
          task.id
        }', -1, event)" src="/assets/icons/arrow-left-line.png" alt="">
        <img class="move-img-down" onclick="moveTaskToNextColumn('${
          task.id
        }', 1, event)" src="/assets/icons/arrow-left-line.png" alt="">
      </div>
      </div>
      
      <h3 class="h3TaskCard">${task.title}</h3>
      <p>${task.description.substring(0,40)}...</p>
      
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
}