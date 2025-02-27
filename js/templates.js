//--------- Board page add task templates ---------
function renderAddTaskPoupBtn() {
  return /*html*/ `
<div class="shadow-div d-none"></div>
<div class="add-edit-popup-task-div">
  <div class="addTaskContent">
  <div class="addTaskClose"><img onclick="closeAddTaskPopUp()" src="/assets/icons/close.png" alt=""></div>
      <div class="headlineDiv"><h1>Add Task</h1></div>
      <form onsubmit="return false">
        <div class="formParts">
          <section class="formPartLeft">
            <label for="title">Title<span class="required">*</span> </label>
            <input id="titleInput" type="text" placeholder="Enter a title" />
            <br />
            <label for="description">Description</label>
            <textarea id="descriptionTextarea" rows="5" placeholder="Enter a Description"></textarea>
            <br />
            <label for="contactSelection">Assigned to</label>
            <div onclick="contactListPopUp()" class="assignedContainer">
              <span>Select contacts to assign</span>
              <img id="assignedArrowDown" src="/assets/icons/arrow_drop_down.png" alt="" />
              <img id="assignedArrowUp" class="d-none" src="/assets/icons/arrow_drop_up.png" alt="" />
            </div>
            <div id="assignedContactsListPopUp" class="hidden"></div>
          </section>
          <hr class="hrBoardPopUp" />
          <section class="formPartRight">
            <label for="dueDate">Due Date<span class="required">*</span> </label>
            <input type="date" id="date" />
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
            <select id="category">
              <option value disabled selected hidden>Select Task Category</option>
              <option value="Technical Task">Technical Task</option>
              <option value="User Story">User Story</option>
            </select>
            <br />
            <label for="subtask">Subtasks</label>
            <div id="addSubTask">
              <input id="subTaskPopUp" class="addSubTask" placeholder="Add new subtask" type="text" />
              <img onclick="addSubTaskPopUp()" style="cursor: pointer" src="/assets/icons/Subtasks_plus.png" alt="" />
            </div>
            <ul id="subTaskList"></ul>
          </section>
        </div>
        <div class="taskFormButtons">
          <p>
            <span class="required">*</span>
            This field is required
          </p>
          <div class="btnSection">
            <button type="reset" class="clearBtn">Clear <img src="/assets/icons/cancel.png" alt="" /></button>
            <button onclick="postAddTask()" class="button">
              Create Task <img src="/assets/icons/check.png" alt="" />
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
    `;
}

function renderAddTaskPopupToDoPlus() {
  return /*html*/ `

<div class="add-edit-popup-task-div">
  <div class="addTaskContent">
  <div class="addTaskClose"><img onclick="closeAddTaskPopUpToDo()" src="/assets/icons/close.png" alt=""></div>
      <div class="headlineDiv"><h1>Add Task</h1></div>
      <form onsubmit="return false">
        <div class="formParts">
          <section class="formPartLeft">
            <label for="title">Title<span class="required">*</span> </label>
            <input id="titleInput" type="text" placeholder="Enter a title" />
            <br />
            <label for="description">Description</label>
            <textarea id="descriptionTextarea" rows="5" placeholder="Enter a Description"></textarea>
            <br />
            <label for="contactSelection">Assigned to</label>
            <div onclick="contactListPopUp()" class="assignedContainer">
              <span>Select contacts to assign</span>
              <img id="assignedArrowDown" src="/assets/icons/arrow_drop_down.png" alt="" />
              <img id="assignedArrowUp" class="d-none" src="/assets/icons/arrow_drop_up.png" alt="" />
            </div>
            <div id="assignedContactsListPopUp" class="hidden"></div>
          </section>
          <hr class="hrBoardPopUp" />
          <section class="formPartRight">
            <label for="dueDate">Due Date<span class="required">*</span> </label>
            <input type="date" id="date" />
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
            <select id="category">
              <option value disabled selected hidden>Select Task Category</option>
              <option value="Technical Task">Technical Task</option>
              <option value="User Story">User Story</option>
            </select>
            <br />
            <label for="subtask">Subtasks</label>
            <div id="addSubTask">
              <input id="subTaskPopUp" class="addSubTask" placeholder="Add new subtask" type="text" />
              <img onclick="addSubTaskPopUp()" style="cursor: pointer" src="/assets/icons/Subtasks_plus.png" alt="" />
            </div>
            <ul id="subTaskList"></ul>
          </section>
        </div>
        <div class="taskFormButtons">
          <p>
            <span class="required">*</span>
            This field is required
          </p>
          <div class="btnSection">
            <button type="reset" class="clearBtn">Clear <img src="/assets/icons/cancel.png" alt="" /></button>
            <button onclick="postAddTask()" class="button">
              Create Task <img src="/assets/icons/check.png" alt="" />
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
    `;
}

function renderAddTaskPopupInProgressPlus() {
  return /*html*/ `

<div class="add-edit-popup-task-div">
  <div class="addTaskContent">
  <div class="addTaskClose"><img onclick="closeAddTaskPopUpInProgress()" src="/assets/icons/close.png" alt=""></div>
      <div class="headlineDiv"><h1>Add Task</h1></div>
      <form onsubmit="return false">
        <div class="formParts">
          <section class="formPartLeft">
            <label for="title">Title<span class="required">*</span> </label>
            <input id="titleInput" type="text" placeholder="Enter a title" />
            <br />
            <label for="description">Description</label>
            <textarea id="descriptionTextarea" rows="5" placeholder="Enter a Description"></textarea>
            <br />
            <label for="contactSelection">Assigned to</label>
            <div onclick="contactListPopUp()" class="assignedContainer">
              <span>Select contacts to assign</span>
              <img id="assignedArrowDown" src="/assets/icons/arrow_drop_down.png" alt="" />
              <img id="assignedArrowUp" class="d-none" src="/assets/icons/arrow_drop_up.png" alt="" />
            </div>
            <div id="assignedContactsListPopUp" class="hidden"></div>
          </section>
          <hr class="hrBoardPopUp" />
          <section class="formPartRight">
            <label for="dueDate">Due Date<span class="required">*</span> </label>
            <input type="date" id="date" />
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
            <select id="category">
              <option value disabled selected hidden>Select Task Category</option>
              <option value="Technical Task">Technical Task</option>
              <option value="User Story">User Story</option>
            </select>
            <br />
            <label for="subtask">Subtasks</label>
            <div id="addSubTask">
              <input id="subTaskPopUp" class="addSubTask" placeholder="Add new subtask" type="text" />
              <img onclick="addSubTaskPopUp()" style="cursor: pointer" src="/assets/icons/Subtasks_plus.png" alt="" />
            </div>
            <ul id="subTaskList"></ul>
          </section>
        </div>
        <div class="taskFormButtons">
          <p>
            <span class="required">*</span>
            This field is required
          </p>
          <div class="btnSection">
            <button type="reset" class="clearBtn">Clear <img src="/assets/icons/cancel.png" alt="" /></button>
            <button onclick="postAddTask()" class="button">
              Create Task <img src="/assets/icons/check.png" alt="" />
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
    `;
}

function renderAddTaskPopupAwaitFeedbackPlus() {
  return /*html*/ `

<div class="add-edit-popup-task-div">
  <div class="addTaskContent">
  <div class="addTaskClose"><img onclick="closeAddTaskPopUpAwaitFeedback()" src="/assets/icons/close.png" alt=""></div>
      <div class="headlineDiv"><h1>Add Task</h1></div>
      <form onsubmit="return false">
        <div class="formParts">
          <section class="formPartLeft">
            <label for="title">Title<span class="required">*</span> </label>
            <input id="titleInput" type="text" placeholder="Enter a title" />
            <br />
            <label for="description">Description</label>
            <textarea id="descriptionTextarea" rows="5" placeholder="Enter a Description"></textarea>
            <br />
            <label for="contactSelection">Assigned to</label>
            <div onclick="contactListPopUp()" class="assignedContainer">
              <span>Select contacts to assign</span>
              <img id="assignedArrowDown" src="/assets/icons/arrow_drop_down.png" alt="" />
              <img id="assignedArrowUp" class="d-none" src="/assets/icons/arrow_drop_up.png" alt="" />
            </div>
            <div id="assignedContactsListPopUp" class="hidden"></div>
          </section>
          <hr class="hrBoardPopUp" />
          <section class="formPartRight">
            <label for="dueDate">Due Date<span class="required">*</span> </label>
            <input type="date" id="date" />
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
            <select id="category">
              <option value disabled selected hidden>Select Task Category</option>
              <option value="Technical Task">Technical Task</option>
              <option value="User Story">User Story</option>
            </select>
            <br />
            <label for="subtask">Subtasks</label>
            <div id="addSubTask">
              <input id="subTaskPopUp" class="addSubTask" placeholder="Add new subtask" type="text" />
              <img onclick="addSubTaskPopUp()" style="cursor: pointer" src="/assets/icons/Subtasks_plus.png" alt="" />
            </div>
            <ul id="subTaskList"></ul>
          </section>
        </div>
        <div class="taskFormButtons">
          <p>
            <span class="required">*</span>
            This field is required
          </p>
          <div class="btnSection">
            <button type="reset" class="clearBtn">Clear <img src="/assets/icons/cancel.png" alt="" /></button>
            <button onclick="postAddTask()" class="button">
              Create Task <img src="/assets/icons/check.png" alt="" />
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
    `;
}

function renderTasksCardPopup(task) {
  let priority = task.priority ? task.priority.toLowerCase() : "medium";
  return /*html*/ `
    <div class="taskCardEditPopup" id="taskPopUp" data-task-id="${task.id}">
      <div class="taskCardPopupCategory">
        <div class="taskCardPopupCategoryColor">
          <h2>${task.category}</h2>
        </div>
        <img onclick="closeTaskCardPopUp()" src="/assets/icons/close.png" alt="" />
      </div>
      <div class="taskCardPopupTitle">${task.title}</div>
      <div class="taskCardPopupDescription">${task.description}</div>
      <div class="taskCardPopupDate">Due date: ${task.dueDate || "N/A"}</div>
      <div class="taskCardPopupPrio">
        Priority: ${
          task.priority || "Medium"
        } <img src="/assets/icons/${priority}Priority.png" alt="">
      </div>
      <label class="taskCardPopupLabel">Assigned To:</label>
      <div class="taskCardPopupContact">
        ${(task.assignedUsers || [])
          .map(
            (user) =>
              `<div class="taskCardPopupContactUsers">${user.initials}</div>`
          )
          .join("")}
      </div>
      <label class="taskCardPopupLabel">Subtasks</label>
      <div class="taskCardPopupSubTasks">
        <div class="progress-container">
          ${(task.subTask || [])
            .map(
              (subtask, index) => `
            <div class="step">
              <input type="checkbox" id="step${index}-${
                task.id
              }" onchange="updateSteps(${task.id})" ${
                subtask.completed ? "checked" : ""
              }>
              <label for="step${index}-${task.id}">${subtask.name}</label>
            </div>
          `
            )
            .join("")}
        </div>
      </div>
      <div class="taskCardPopupButtons">
        <div onclick="deleteTask(${
          task.id
        })"><img src="/assets/icons/deleteContact.png" alt="">Delete</div>
        <hr class="hrBoardTaskPopUp">
        <div onclick="editTaskPopup(${
          task.id
        })"><img src="/assets/icons/edit-pencil.png" alt="">Edit</div>
      </div>
    </div>
  `;
}

function renderEditTasksCardPopup(currentSelectedTask) {
  return /*html*/ `
    <div class="shadow-div d-none"></div>
    <div class="taskCardEditPopup">
      <div class="task-edit-close-popup-div">
        <img
          onclick="closeEditTaskCardPopUp()"
          class="task-edit-close-popup"
          src="/assets/icons/close.png"
          alt=""
        />
      </div>
      <label>Title</label>
      <input class="task-edit-input-popup" type="text" />
      <label>Description</label>
      <textarea class="task-edit-input-popup" name="" id=""></textarea>
      <label>Due Date</label>
      <input class="task-edit-input-popup" type="date" />
      <div>
        <label>Priority</label>
        <div class="task-edit-prio-popup">
          <button class="prioEditBtn">
            Urgent
            <img src="/assets/icons/urgentRed.png" alt="" />
          </button>
          <button class="prioEditBtn">
            Medium
            <img src="/assets/icons/mediumYellow.png" alt="" />
          </button>
          <button class="prioEditBtn">
            Low
            <img src="/assets/icons/lowGreen.png" alt="" />
          </button>
        </div>
      <label for="contactSelection">Assigned to</label>
        <div onclick="contactListPopUp()" class="assignedContainer">
          <span>Select contacts to assign</span>
          <img id="assignedArrowDown" src="/assets/icons/arrow_drop_down.png" alt="" />
          <img id="assignedArrowUp" class="d-none" src="/assets/icons/arrow_drop_up.png" alt="" />
        </div>
        <div id="assignedContactsListPopUp" class="hidden"></div>
      </div>
      <div></div>
      <label for="subtask">Subtasks</label>
        <div id="addSubTask">
          <input id="subTaskPopUp" class="addSubTask" placeholder="Add new subtask" type="text" />
          <img onclick="addSubTaskPopUp()" style="cursor: pointer" src="/assets/icons/Subtasks_plus.png" alt="" />
        </div>
        <ul id="subTaskList"></ul>
      <ul></ul>
      <div class="button-ok-div">
        <button class="button-ok">
          Ok <img src="/assets/icons/check.png" alt="" />
        </button>
      </div>
    </div>
  `;
}

//--------- contact templates ---------
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
            type="text"
            id="newContactName"
            placeholder="Name"
          />
          <input
            class="email"
            type="text"
            id="newContactEmail"
            placeholder="Email"
          />
          <input
            class="phone"
            type="text"
            id="newContactPhone"
            placeholder="Phone"
          />
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
          <input
            class="mobile-email"
            type="text"
            id="newContactEmail"
            placeholder="Email"
          />
          <input
            class="mobile-phone"
            type="text"
            id="newContactPhone"
            placeholder="Phone"
          />
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

function editContactPopup() {
  let contact = contacts[currentSelectedContact];
  let name = contact.name;
  let email = contact.email;
  let phone = contact.phone;
  return /*html*/ `
  <div class="shadow-div"></div>
  <div class="add-edit-popup-contact-div">
    <div class="popup-left">
      <img src="/assets/img/logohell.png" alt="" />
      <h1>Edit contact</h1>
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
            value="${name}"
            class="name"
            type="text"
            id="editContactName"
            placeholder="Name"
          />
          <input
            value="${email}"
            class="email"
            type="text"
            id="editContactEmail"
            placeholder="Email"
          />
          <input
            value="${phone}"
            class="phone"
            type="text"
            id="editContactPhone"
            placeholder="Phone"
          />
        </form>
        <div class="popup-buttons">
          <button class="cancel-button" onclick="deleteContact()">
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
function mobileEditContactPopup() {
  let contact = contacts[currentSelectedContact];
  let name = contact.name;
  let email = contact.email;
  let phone = contact.phone;
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
            value="${name}"
            class="mobile-name"
            type="text"
            id="newContactName"
            placeholder="Name"
          />
          <input
            value="${email}"
            class="mobile-email"
            type="text"
            id="newContactEmail"
            placeholder="Email"
          />
          <input
            value="${phone}"
            class="mobile-phone"
            type="text"
            id="newContactPhone"
            placeholder="Phone"
          />
        </form>
        <div class="mobile-popup-button">
          <button class="cancel-button" onclick="deleteContact()">
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
