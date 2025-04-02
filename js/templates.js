/**
 * Renders the HTML structure for the "Add Task" popup button.
 *
 * This function returns a string containing the HTML markup for a popup form
 * that allows users to add a new task. The form includes fields for title,
 * description, assigned contacts, due date, priority, category, and subtasks.
 * It also provides buttons for clearing the form and creating a task.
 *
 * The popup includes the following features:
 * - Title input field (required)
 * - Description textarea
 * - Assigned contacts selection with dropdown
 * - Due date input field (required)
 * - Priority selection (Urgent, Medium, Low)
 * - Category selection with dropdown (required)
 * - Subtask input and list
 * - Responsive design with required field indicators
 *
 * @returns {string} The HTML string for the "Add Task" popup.
 */
function renderAddTaskPoupBtn() {
  return /*html*/ `
<div class="shadow-div"></div>
<div class="add-edit-popup-task-div">
  <div class="addTaskContent">
  <div class="addTaskClose"><img onclick="closeAddTaskPopUp()" src="/assets/icons/close.png" alt=""></div>
      <div class="headlineDiv"><h1>Add Task</h1></div>
      <form onsubmit="return false">
        <div class="formParts">
          <section class="formPartLeft">
            <label for="title">Title<span class="required">*</span> </label>
            <input id="titleInput" type="text" placeholder="Enter a title" />
            <span id="titleError" class="text-custom"></span>
            <br />
            <label for="description">Description</label>
            <textarea id="descriptionTextarea" rows="5" placeholder="Enter a Description"></textarea>
            <span id="descriptionTextareaError" class="text-custom"></span>
            <br />
            <label for="contactSelection">Assigned to</label>
            <div onclick="contactList()" class="assignedContainer">
              <span>Select contacts to assign</span>
              <img id="assignedArrowDown" src="/assets/icons/arrow_drop_down.png" alt="" />
              <img id="assignedArrowUp" class="d-none" src="/assets/icons/arrow_drop_up.png" alt="" />
            </div>
            <div id="assignedContactsList" class="hidden"></div>
            <div id="selectedContactsDisplay" class="selectedContactsContainer"></div>
          </section>
          <hr class="hrBoardPopUp" />
          <section class="formPartRight">
            <label for="dueDate">Due Date<span class="required">*</span> </label>
            <input type="date" id="date" onkeydown="return false;"/>
            <span id="dateError" class="text-custom"></span>
            <br />
            <label for="prio">Prio</label>
            <section id="prio" class="prioContent">
              <button type="button" id="prioUrgentEdit" class="prioBtn" onclick="prioUrgent()">
                Urgent
                <img id="urgentImg" src="/assets/icons/urgentRed.png" alt="" />
              </button>
              <button type="button" id="prioMediumEdit" class="prioBtn" onclick="prioMedium()">
                Medium
                <img id="mediumImg" src="/assets/icons/mediumYellow.png" alt="" />
              </button>
              <button type="button" id="prioLowEdit" class="prioBtn" onclick="prioLow()">
                Low <img id="lowImg" src="/assets/icons/lowGreen.png" alt="" />
              </button>
            </section>
            <br />
            <label for="category">Category<span class="required">*</span> </label>
            <div onclick="categorytList()" class="categoryContainer" id="category">
              <span id="dropdownCategory" class="">Select Task Category</span>
              <img id="categoryArrowDown" src="/assets/icons/arrow_drop_down.png" alt="" />
              <img id="categoryArrowUp" class="d-none" src="/assets/icons/arrow_drop_up.png" alt="" />
              <div id="categoryList" class="hidden"></div>
            </div>
            <span id="categoryError" class="text-custom"></span>
            <br />
            <label for="subtask">Subtasks</label>
            <div id="addSubTask">
              <input id="subTaskPopUp" class="addSubTask" placeholder="Add new subtask" type="text" />
              <img onclick="addSubTaskPopUp()" style="cursor: pointer" src="/assets/icons/Subtasks_plus.png" alt="" />
            </div>
            <ul id="subTaskList" class="subTaskList"></ul>
            <p class="requiredInfoResponsive">
            <span class="required">*</span>
            This field is required
          </p>
          </section>
        </div>
        <div class="taskFormButtons">
          <p class="requiredInfo">
            <span class="required">*</span>
            This field is required
          </p>
          <div class="btnSection">
            <button type="reset" class="clearBtn" onclick="clearForm()">Clear <img src="/assets/icons/cancel.png" alt="" /></button>
            <button type="button" onclick="createTaskBtn()" class="button">
              Create Task <img src="/assets/icons/check.png" alt="" />
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
    `;
}

/**
 * Renders the HTML structure for the "Add Task" popup in the To-Do application.
 * This function returns a string containing the HTML markup for the popup,
 * which includes input fields for task details, priority selection, category selection,
 * and subtasks, along with buttons for clearing or creating the task.
 *
 * @returns {string} The HTML string for the "Add Task" popup.
 */
function renderAddTaskPopupToDoPlus() {
  return /*html*/ `
<div class="shadow-div"></div>
<div class="add-edit-popup-task-div">
  <div class="addTaskContent">
  <div class="addTaskClose"><img onclick="closeAddTaskPopUpToDo()" src="/assets/icons/close.png" alt=""></div>
      <div class="headlineDiv"><h1>Add Task</h1></div>
      <form onsubmit="return false">
        <div class="formParts">
          <section class="formPartLeft">
            <label for="title">Title<span class="required">*</span> </label>
            <input id="titleInput" type="text" placeholder="Enter a title" />
            <span id="titleError" class="text-custom"></span>
            <br />
            <label for="description">Description</label>
            <textarea id="descriptionTextarea" rows="5" placeholder="Enter a Description"></textarea>
            <span id="descriptionTextareaError" class="text-custom"></span>
            <br />
            <label for="contactSelection">Assigned to</label>
            <div onclick="contactList()" class="assignedContainer">
              <span>Select contacts to assign</span>
              <img id="assignedArrowDown" src="/assets/icons/arrow_drop_down.png" alt="" />
              <img id="assignedArrowUp" class="d-none" src="/assets/icons/arrow_drop_up.png" alt="" />
            </div>
            <div id="assignedContactsList" class="hidden"></div>
            <div id="selectedContactsDisplay" class="selectedContactsContainer"></div>
          </section>
          <hr class="hrBoardPopUp" />
          <section class="formPartRight">
            <label for="dueDate">Due Date<span class="required">*</span> </label>
            <input type="date" id="date" onkeydown="return false;"/>
            <span id="dateError" class="text-custom"></span>
            <br />
            <label for="prio">Prio</label>
            <section id="prio" class="prioContent">
              <button type="button" id="prioUrgentEdit" class="prioBtn" onclick="prioUrgent()">
                Urgent
                <img id="urgentImg" src="/assets/icons/urgentRed.png" alt="" />
              </button>
              <button type="button" id="prioMediumEdit" class="prioBtn" onclick="prioMedium()">
                Medium
                <img id="mediumImg" src="/assets/icons/mediumYellow.png" alt="" />
              </button>
              <button type="button" id="prioLowEdit" class="prioBtn" onclick="prioLow()">
                Low <img id="lowImg" src="/assets/icons/lowGreen.png" alt="" />
              </button>
            </section>
            <br />
            <label for="category">Category<span class="required">*</span> </label>
            <div onclick="categorytList()" class="categoryContainer" id="category">
              <span id="dropdownCategory" class="">Select Task Category</span>
              <img id="categoryArrowDown" src="/assets/icons/arrow_drop_down.png" alt="" />
              <img id="categoryArrowUp" class="d-none" src="/assets/icons/arrow_drop_up.png" alt="" />
              <div id="categoryList" class="hidden"></div>
            </div>
            <span id="categoryError" class="text-custom"></span>
            <br />
            <label for="subtask">Subtasks</label>
            <div id="addSubTask">
              <input id="subTaskPopUp" class="addSubTask" placeholder="Add new subtask" type="text" />
              <img onclick="addSubTaskPopUp()" style="cursor: pointer" src="/assets/icons/Subtasks_plus.png" alt="" />
            </div>
            <ul id="subTaskList" class="subTaskList"></ul>
            <p class="requiredInfoResponsive">
            <span class="required">*</span>
            This field is required
          </p>
          </section>
        </div>
        <div class="taskFormButtons">
          <p class="requiredInfo">
            <span class="required">*</span>
            This field is required
          </p>
          <div class="btnSection">
            <button type="reset" class="clearBtn">Clear <img src="/assets/icons/cancel.png" alt="" /></button>
            <button type="button" onclick="createTaskPlusToDoBtn()" class="button">
              Create Task <img src="/assets/icons/check.png" alt="" />
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
    `;
}

/**
 * Renders the HTML structure for the "Add Task" popup in the "In Progress" section.
 * This function returns a string containing the HTML markup for the popup,
 * which includes input fields for task details, priority selection, category selection,
 * and subtasks, as well as buttons for clearing the form or creating the task.
 *
 * @returns {string} The HTML string for the "Add Task" popup.
 */
function renderAddTaskPopupInProgressPlus() {
  return /*html*/ `
<div class="shadow-div"></div>
<div class="add-edit-popup-task-div">
  <div class="addTaskContent">
  <div class="addTaskClose"><img onclick="closeAddTaskPopUpInProgress()" src="/assets/icons/close.png" alt=""></div>
      <div class="headlineDiv"><h1>Add Task</h1></div>
      <form onsubmit="return false">
        <div class="formParts">
          <section class="formPartLeft">
            <label for="title">Title<span class="required">*</span> </label>
            <input id="titleInput" type="text" placeholder="Enter a title" />
            <span id="titleError" class="text-custom"></span>
            <br />
            <label for="description">Description</label>
            <textarea id="descriptionTextarea" rows="5" placeholder="Enter a Description"></textarea>
            <span id="descriptionTextareaError" class="text-custom"></span>
            <br />
            <label for="contactSelection">Assigned to</label>
            <div onclick="contactList()" class="assignedContainer">
              <span>Select contacts to assign</span>
              <img id="assignedArrowDown" src="/assets/icons/arrow_drop_down.png" alt="" />
              <img id="assignedArrowUp" class="d-none" src="/assets/icons/arrow_drop_up.png" alt="" />
            </div>
            <div id="assignedContactsList" class="hidden"></div>
            <div id="selectedContactsDisplay" class="selectedContactsContainer"></div>
          </section>
          <hr class="hrBoardPopUp" />
          <section class="formPartRight">
            <label for="dueDate">Due Date<span class="required">*</span> </label>
            <input type="date" id="date" onkeydown="return false;"/>
            <span id="dateError" class="text-custom"></span>
            <br />
            <label for="prio">Prio</label>
            <section id="prio" class="prioContent">
              <button type="button" id="prioUrgentEdit" class="prioBtn" onclick="prioUrgent()">
                Urgent
                <img id="urgentImg" src="/assets/icons/urgentRed.png" alt="" />
              </button>
              <button type="button" id="prioMediumEdit" class="prioBtn" onclick="prioMedium()">
                Medium
                <img id="mediumImg" src="/assets/icons/mediumYellow.png" alt="" />
              </button>
              <button type="button" id="prioLowEdit" class="prioBtn" onclick="prioLow()">
                Low <img id="lowImg" src="/assets/icons/lowGreen.png" alt="" />
              </button>
            </section>
            <br />
            <label for="category">Category<span class="required">*</span> </label>
            <div onclick="categorytList()" class="categoryContainer" id="category">
              <span id="dropdownCategory" class="">Select Task Category</span>
              <img id="categoryArrowDown" src="/assets/icons/arrow_drop_down.png" alt="" />
              <img id="categoryArrowUp" class="d-none" src="/assets/icons/arrow_drop_up.png" alt="" />
              <div id="categoryList" class="hidden"></div>
            </div>
            <span id="categoryError" class="text-custom"></span>
            <br />
            <label for="subtask">Subtasks</label>
            <div id="addSubTask">
              <input id="subTaskPopUp" class="addSubTask" placeholder="Add new subtask" type="text" />
              <img onclick="addSubTaskPopUp()" style="cursor: pointer" src="/assets/icons/Subtasks_plus.png" alt="" />
            </div>
            <ul id="subTaskList" class="subTaskList"></ul>
            <p class="requiredInfoResponsive">
            <span class="required">*</span>
            This field is required
          </p>
          </section>
        </div>
        <div class="taskFormButtons">
          <p class="requiredInfo">
            <span class="required">*</span>
            This field is required
          </p>
          <div class="btnSection">
            <button type="reset" class="clearBtn">Clear <img src="/assets/icons/cancel.png" alt="" /></button>
            <button type="button" onclick="createTaskPlusInProgressBtn()" class="button">
              Create Task <img src="/assets/icons/check.png" alt="" />
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
    `;
}

/**
 * Renders the HTML structure for the "Add Task" popup with Await Feedback functionality.
 *
 * This function returns a string containing the HTML markup for a popup form
 * that allows users to add a new task. The form includes fields for title, description,
 * assigned contacts, due date, priority, category, and subtasks. It also provides
 * buttons for clearing the form and creating the task.
 *
 * @returns {string} The HTML string for the "Add Task" popup.
 */
function renderAddTaskPopupAwaitFeedbackPlus() {
  return /*html*/ `
<div class="shadow-div"></div>
<div class="add-edit-popup-task-div">
  <div class="addTaskContent">
  <div class="addTaskClose"><img onclick="closeAddTaskPopUpAwaitFeedback()" src="/assets/icons/close.png" alt=""></div>
      <div class="headlineDiv"><h1>Add Task</h1></div>
      <form onsubmit="return false">
        <div class="formParts">
          <section class="formPartLeft">
            <label for="title">Title<span class="required">*</span> </label>
            <input id="titleInput" type="text" placeholder="Enter a title" />
            <span id="titleError" class="text-custom"></span>
            <br />
            <label for="description">Description</label>
            <textarea id="descriptionTextarea" rows="5" placeholder="Enter a Description"></textarea>
            <span id="descriptionTextareaError" class="text-custom"></span>
            <br />
            <label for="contactSelection">Assigned to</label>
            <div onclick="contactList()" class="assignedContainer">
              <span>Select contacts to assign</span>
              <img id="assignedArrowDown" src="/assets/icons/arrow_drop_down.png" alt="" />
              <img id="assignedArrowUp" class="d-none" src="/assets/icons/arrow_drop_up.png" alt="" />
            </div>
            <div id="assignedContactsList" class="hidden"></div>
            <div id="selectedContactsDisplay" class="selectedContactsContainer"></div>
          </section>
          <hr class="hrBoardPopUp" />
          <section class="formPartRight">
            <label for="dueDate">Due Date<span class="required">*</span> </label>
            <input type="date" id="date" onkeydown="return false;"/>
            <span id="dateError" class="text-custom"></span>
            <br />
            <label for="prio">Prio</label>
            <section id="prio" class="prioContent">
              <button type="button" id="prioUrgentEdit" class="prioBtn" onclick="prioUrgent()">
                Urgent
                <img id="urgentImg" src="/assets/icons/urgentRed.png" alt="" />
              </button>
              <button type="button" id="prioMediumEdit" class="prioBtn" onclick="prioMedium()">
                Medium
                <img id="mediumImg" src="/assets/icons/mediumYellow.png" alt="" />
              </button>
              <button type="button" id="prioLowEdit" class="prioBtn" onclick="prioLow()">
                Low <img id="lowImg" src="/assets/icons/lowGreen.png" alt="" />
              </button>
            </section>
            <br />
            <label for="category">Category<span class="required">*</span> </label>
            <div onclick="categorytList()" class="categoryContainer" id="category">
              <span id="dropdownCategory" class="">Select Task Category</span>
              <img id="categoryArrowDown" src="/assets/icons/arrow_drop_down.png" alt="" />
              <img id="categoryArrowUp" class="d-none" src="/assets/icons/arrow_drop_up.png" alt="" />
              <div id="categoryList" class="hidden"></div>
            </div>
            <span id="categoryError" class="text-custom"></span>
            <br />
            <label for="subtask">Subtasks</label>
            <div id="addSubTask">
              <input id="subTaskPopUp" class="addSubTask" placeholder="Add new subtask" type="text" />
              <img onclick="addSubTaskPopUp()" style="cursor: pointer" src="/assets/icons/Subtasks_plus.png" alt="" />
            </div>
            <ul id="subTaskList" class="subTaskList"></ul>
            <p class="requiredInfoResponsive">
            <span class="required">*</span>
            This field is required
          </p>
          </section>
        </div>
        <div class="taskFormButtons">
          <p class="requiredInfo">
            <span class="required">*</span>
            This field is required
          </p>
          <div class="btnSection">
            <button type="reset" class="clearBtn">Clear <img src="/assets/icons/cancel.png" alt="" /></button>
            <button type="button" onclick="createTaskPlusAwaitFeedbackBtn()" class="button">
              Create Task <img src="/assets/icons/check.png" alt="" />
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
    `;
}

/**
 * Renders a task card popup as an HTML string.
 *
 * @param {Object} task - The task object containing details to render.
 * @param {string} task.id - The unique identifier of the task.
 * @param {string} [task.category] - The category of the task (default: "No Category").
 * @param {string} [task.title] - The title of the task (default: "No Title").
 * @param {string} [task.description] - The description of the task (default: "No Description").
 * @param {string} [task.dueDate] - The due date of the task (default: "N/A").
 * @param {string} [task.priority] - The priority of the task (e.g., "Urgent", "Medium", "Low"; default: "Medium").
 * @param {Array<Object>} [task.users] - The list of users assigned to the task.
 * @param {string} task.users[].name - The name of the user.
 * @param {string} task.users[].initials - The initials of the user.
 * @param {string} task.users[].color - The background color associated with the user.
 * @param {Array<Object>} [task.subTasks] - The list of subtasks associated with the task.
 * @param {string} task.subTasks[].description - The description of the subtask.
 * @param {boolean} task.subTasks[].completed - Whether the subtask is completed.
 * @returns {string} The HTML string representing the task card popup.
 */
function renderTasksCardPopup(task) {
  if (!task) {
    return `<p>Fehler: Keine Daten für diese Aufgabe gefunden.</p>`;
  }

  let priorityImages = {
    Urgent: "urgentRed.png",
    Medium: "mediumYellow.png",
    Low: "lowGreen.png",
  };
  let priorityImageSrc = `/assets/icons/${
    priorityImages[task.priority] || "default.png"
  }`;

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
      <div class="taskCardPopupDescription">${
        task.description || "No Description"
      }</div>
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
        ${
          Array.isArray(task.users) && task.users.length > 0
            ? task.users
                .map(
                  (user) =>
                    `<div class="taskCardPopupContactName"><div class="taskCardPopupContactInitials" style="background-color: ${
                      user.color
                    }">
                    ${user.initials || "??"} 
                  </div>
                  <div>${user.name || "No Name"}</div>
                  </div>
                  `
                )
                .join("")
            : "<p>Kein Benutzer zugewiesen</p>"
        }
      </div>

    <label class="taskCardPopupLabel">Subtasks</label>
      <div class="taskCardPopupSubTasks">
        <div class="progress-container-popup">
          ${
            Array.isArray(task.subTasks) && task.subTasks.length > 0
              ? task.subTasks
                  .map(
                    (subtasks, index) => `
                    <div class="step">
                      <input type="checkbox" id="step${index}-${task.id}"
                        onchange="updateSteps('${task.id}')" 
                        ${subtasks.completed ? "checked" : ""}>
                      <label for="step${index}-${task.id}">${
                      subtasks.description || "Unnamed Subtask"
                    }</label>
                    </div>
                  `
                  )
                  .join("")
              : "<p>Keine Subtasks vorhanden</p>"
          }
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
 * Renders the HTML content for the Edit Task Card Popup.
 *
 * @param {Object} currentSelectedTask - The task object containing details of the selected task.
 * @param {string} currentSelectedTask.title - The title of the task.
 * @param {string} currentSelectedTask.description - The description of the task.
 * @param {string} currentSelectedTask.dueDate - The due date of the task in YYYY-MM-DD format.
 * @param {string} currentSelectedTask.priority - The priority level of the task (e.g., "Urgent", "Medium", "Low").
 * @param {Array<Object>} [currentSelectedTask.users=[]] - The list of users assigned to the task.
 * @param {string} currentSelectedTask.users[].name - The name of the assigned user.
 * @param {string} currentSelectedTask.users[].color - The color associated with the user.
 * @param {string} currentSelectedTask.users[].initials - The initials of the assigned user.
 * @param {Array<Object>} [currentSelectedTask.subTasks=[]] - The list of subtasks associated with the task.
 * @param {string} currentSelectedTask.subTasks[].description - The description of the subtask.
 * @param {number} taskId - The unique identifier of the task.
 * @returns {string} The HTML string for the Edit Task Card Popup.
 */
function renderEditTasksCardPopup(currentSelectedTask, taskId) {
  let assignedContacts = currentSelectedTask.users || [];
  let title = currentSelectedTask.title;
  let description = currentSelectedTask.description;
  let dueDate = currentSelectedTask.dueDate;
  subTasks = currentSelectedTask.subTasks || [];
  window.currentSelectedPriority = currentSelectedTask.priority;

  selectedContacts = new Set(assignedContacts.map((user) => user.name));

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
        <button onclick="updatePriority('Urgent')" id="prioUrgentEditPopup" class="prioBtn ${
          window.currentSelectedPriority === "Urgent" ? "prioUrgentRed" : ""
        }">
          Urgent
          <img src="${
            window.currentSelectedPriority === "Urgent"
              ? "/assets/icons/urgentWhite.png"
              : "/assets/icons/urgentRed.png"
          }" alt="" />
        </button>
        <button onclick="updatePriority('Medium')" id="prioMediumEditPopup" class="prioBtn ${
          window.currentSelectedPriority === "Medium" ? "prioMediumYellow" : ""
        }">
          Medium
          <img src="${
            window.currentSelectedPriority === "Medium"
              ? "/assets/icons/mediumWhite.png"
              : "/assets/icons/mediumYellow.png"
          }" alt="" />
        </button>
        <button onclick="updatePriority('Low')" id="prioLowEditPopup" class="prioBtn ${
          window.currentSelectedPriority === "Low" ? "prioLowGreen" : ""
        }">
          Low
          <img src="${
            window.currentSelectedPriority === "Low"
              ? "/assets/icons/lowWhite.png"
              : "/assets/icons/lowGreen.png"
          }" alt="" />
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
            (contact) =>
              `<span class="assignedShortcutName" style="background-color: ${contact.color}">${contact.initials}</span>`
          )
          .join("")}
      </div>
    
      <label for="subtask">Subtasks</label>
      <div id="addSubTask">
        <input id="subTaskPopUp" class="addSubTask" placeholder="Add new subtask" type="text" />
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
    Urgent: {
      class: "prioUrgentRed",
      imgSrc: "/assets/icons/urgentWhite.png",
    },
    Medium: {
      class: "prioMediumYellow",
      imgSrc: "/assets/icons/mediumWhite.png",
    },
    Low: {
      class: "prioLowGreen",
      imgSrc: "/assets/icons/lowWhite.png",
    },
  };

  document
    .getElementById("prioUrgentEditPopup")
    .classList.remove(priorityStyles.Urgent.class);
  document
    .getElementById("prioMediumEditPopup")
    .classList.remove(priorityStyles.Medium.class);
  document
    .getElementById("prioLowEditPopup")
    .classList.remove(priorityStyles.Low.class);

  document.getElementById("prioUrgentEditPopup").querySelector("img").src =
    "/assets/icons/urgentRed.png";
  document.getElementById("prioMediumEditPopup").querySelector("img").src =
    "/assets/icons/mediumYellow.png";
  document.getElementById("prioLowEditPopup").querySelector("img").src =
    "/assets/icons/lowGreen.png";

  document
    .getElementById(`prio${newPriority}EditPopup`)
    .classList.add(priorityStyles[newPriority].class);
  document
    .getElementById(`prio${newPriority}EditPopup`)
    .querySelector("img").src = priorityStyles[newPriority].imgSrc;
}

/**
 * Generates the HTML template for the "Add New Contact" popup.
 *
 * This function returns a string containing the HTML structure for a popup
 * that allows users to add a new contact. The popup includes fields for
 * entering the contact's name, email, and phone number, as well as buttons
 * for canceling or creating the contact.
 *
 * @returns {string} The HTML string for the "Add New Contact" popup.
 */
function addNewContactPopup() {
  return /*html*/ `
  <div class="shadow-div"></div>
  <div class="add-edit-popup-contact-div">
    <div class="popup-left">
      <img src="/assets/img/logohell.png" alt="" />
      <h1>Add contact</h1>
      <span>Tasks are better with a team!</span>
      <hr />
    </div>
    <div class="popup-right">
      <div>
        <img src="/assets/img/profileIMG.png" alt="" />
      </div>
      <div>
        <img
          class="popup-close-img"
          onclick="closePopUp()"
          src="/assets/icons/close.png"
          alt=""
        />
      </div>
      <div>
        <form>
          <input
            class="name"
            type="name"
            id="newContactName"
            placeholder="Name"
          />
          <div id="errorNewContactName" class="nameError"></div>
          <input
            class="email"
            type="email"
            id="newContactEmail"
            placeholder="Email"
          />
          <div id="errorNewContactEmail" class="emailError"></div>
          <input
            class="phone"
            type="number"
            id="newContactPhone"
            placeholder="Phone"
          />
          <div id="errorNewContactPhone" class="phoneError"></div>
        </form>
        <div class="popup-buttons">
          <button class="cancel-button" onclick="closePopUp()">
            Cancel <img src="/assets/icons/cancel.png" alt="" />
          </button>
          <button class="create-button" onclick="saveContact()">
            Create contact <img src="/assets/icons/check.png" alt="" />
          </button>
        </div>
      </div>
    </div>
  </div>
  `;
}

/**
 * Generates the HTML template for a mobile popup to add a new contact.
 *
 * This function returns a string containing the HTML structure for a popup
 * that allows users to input a new contact's name, email, and phone number.
 * The popup includes a close button, a header, and a form with input fields.
 *
 * @returns {string} The HTML string for the mobile add new contact popup.
 */
function mobileAddNewContactPopup() {
  return /*html*/ `
  <div class="shadow-div"></div>
  <div class="mobile-add-edit-popup-contact-div">
  <div>
        <img
          class="mobile-popup-close-img"
          onclick="closePopUp()"
          src="/assets/icons/close-white.png"
          alt=""
        />
      </div>
    <div class="mobile-popup-above">
      <h1>Add contact</h1>
      <span>Tasks are better with a team!</span>
      <hr />
    </div>
    <div class="mobile-popup-below">
      <div>
        <img src="/assets/img/profileIMG.png" alt="" />
      </div> 
      <div>
        <form class="mobile-form">
          <input
            class="mobile-name"
            type="text"
            id="newContactName"
            placeholder="Name"
          />
          <div id="errorNewContactName" class="nameError"></div>
          <input
            class="mobile-email"
            type="text"
            id="newContactEmail"
            placeholder="Email"
          />
          <div id="errorNewContactEmail" class="emailError"></div>
          <input
            class="mobile-phone"
            type="text"
            id="newContactPhone"
            placeholder="Phone"
          />
          <div id="errorNewContactPhone" class="phoneError"></div>
        </form>
        <div class="mobile-popup-button">
          <button class="create-button" onclick="saveContact()">
            Create contact <img src="/assets/icons/check.png" alt="" />
          </button>
        </div>
      </div>
    </div>
  </div>
  `;
}

/**
 * Generates the HTML template for the "Edit Contact" popup.
 * This popup allows users to edit the details of a selected contact,
 * including their name, email, and phone number.
 *
 * @returns {string} The HTML string for the "Edit Contact" popup.
 */
function editContactPopup() {
  let contact = contacts[currentSelectedContact];
  let name = contact.name;
  let email = contact.email;
  let phone = contact.phone || "";
  let phonePlaceholder = contact.phone ? "" : "nicht vorhanden";
  return /*html*/ `
  <div class="shadow-div"></div>
  <div class="add-edit-popup-contact-div">
    <div class="popup-left">
      <img src="/assets/img/logohell.png" alt="" />
      <h1>Edit contact</h1>
      <hr />
    </div>
    <div class="popup-right">
      <div class="popup-right-profile" style="background-color: ${
        contact.color
      };">
      ${generateInitials(contact.name)}
      </div>
      <div>
        <img
          class="popup-close-img"
          onclick="closePopUp()"
          src="/assets/icons/close.png"
          alt=""
        />
      </div>
      <div>
        <form>
          <input
            value="${name}"
            class="name"
            type="text"
            id="editContactName"
            placeholder="Name"
          />
          <div id="errorEditContactName" class="nameError"></div>
          <input
            value="${email}"
            class="email"
            type="text"
            id="editContactEmail"
            placeholder="Email"
          />
          <div id="errorEditContactEmail" class="emailError"></div>
          <input
            value="${phone}"
            class="phone"
            type="text"
            id="editContactPhone"
            placeholder="${phonePlaceholder}"
          />
          <div id="errorEditContactPhone" class="phoneError"></div>
        </form>
        <div class="popup-buttons">
          <button class="cancel-button" onclick="deleteContact(currentSelectedContact)">
            Delete
          </button>
          <button class="create-button" onclick="updateContact()">
            Save <img src="/assets/icons/check.png" alt="" />
          </button>
        </div>
      </div>
    </div>
  </div>
  `;
}

/**
 * Generates the HTML template for a mobile popup to edit a contact.
 *
 * This function retrieves the currently selected contact's details (name, email, and phone)
 * and populates an editable form within a popup. The popup includes options to save the
 * updated contact information or delete the contact.
 *
 * @returns {string} The HTML string for the mobile edit contact popup.
 */
function mobileEditContactPopup() {
  let contact = contacts[currentSelectedContact];
  let name = contact.name;
  let email = contact.email;
  let phone = contact.phone || "";
  let phonePlaceholder = contact.phone ? "" : "nicht vorhanden";
  return /*html*/ `
  <div class="shadow-div"></div>
  <div class="mobile-add-edit-popup-contact-div">
      <div>
        <img
          class="mobile-popup-close-img"
          onclick="closePopUp()"
          src="/assets/icons/close-white.png"
          alt=""
        />
      </div>
    <div class="mobile-popup-above">
      <h1>Edit contact</h1>
      <hr />
    </div>
    <div class="mobile-edit-popup-below">
      <div class="popup-right-profile" style="background-color: ${
        contact.color
      };">
      ${generateInitials(contact.name)}
      </div>
      <div>
        <form class="mobile-form">
          <input
            value="${name}"
            class="mobile-name"
            type="text"
            id="editContactName"
            placeholder="Name"
          />
          <div id="errorEditContactName" class="nameError"></div>
          <input
            value="${email}"
            class="mobile-email"
            type="text"
            id="editContactEmail"
            placeholder="Email"
          />
          <div id="errorEditContactEmail" class="emailError"></div>
          <input
            value="${phone}"
            class="mobile-phone"
            type="text"
            id="editContactPhone"
            placeholder="${phonePlaceholder}"
          />
          <div id="errorEditContactPhone" class="phoneError"></div>
        </form>
        <div class="mobile-popup-button">
          <button class="cancel-button" onclick="deleteContact(currentSelectedContact)">
              Delete
          </button>
          <button class="create-button" onclick="updateContact()">
              Save <img src="/assets/icons/check.png" alt="" />
          </button>
        </div>
      </div>
    </div>
  </div>
  `;
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
}