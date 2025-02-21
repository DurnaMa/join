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

// function renderTasksCardPopup() {
//   return /*html*/ `
//     <div id="taskPopUp">
//       <div class="shadow-div d-none"></div>
//       <div class="taskCardPopup">
//         <div class="taskCardPopupCategory">
//           <div class="taskCardPopupCategoryColor">
//             <h2>Technical task</h2>
//           </div>
//           <img onclick="closeTaskCardPopUp()" src="/assets/icons/close.png" alt="" />
//         </div>
//         <div class="taskCardPopupTitle">Test Test Test Versuche</div>
//         <div class="taskCardPopupDescription">
//           Welcome to Join. Here you can find your default board. This board
//           represents your project and contains four default lists: "To do", "In
//           progress", "Await feedback" and "Done".
//         </div>
//         <div class="taskCardPopupDate">Due date: 2024-10-30</div>
//         <div class="taskCardPopupPrio">
//           Priority: medium <img src="/assets/icons/mediumYellow.png" alt=""></div>
//         <label class="taskCardPopupLabel">Assigned To:</label>
//         <div class="taskCardPopupContact">
//           <div class="taskCardPopupContactUsers tasks-user1">DL</div>
//           <div class="taskCardPopupContactUsers tasks-user2">HA</div>
//           <div class="taskCardPopupContactUsers tasks-user3">MD</div>
//         </div>
//         <label class="taskCardPopupLabel">Subtasks</label>
//         <div class="taskCardPopupSubTasks">
//         <div class="progress-container">
//           <div class="step">
//             <input type="checkbox" id="step1" onchange="updateSteps()">
//             <label for="step1">Schritt 1</label>
//           </div>
//           <div class="step">
//             <input type="checkbox" id="step2" onchange="updateSteps()">
//             <label for="step2">Schritt 2</label>
//           </div>
//         </div>

//         </div>
//         <div class="taskCardPopupButtons">
//           <div><img src="/assets/icons/deleteContact.png" alt="">Delete</div>
//           <hr class="hrBoardTaskPopUp">
//           <div><img src="/assets/icons/edit-pencil.png" alt="">Edit</div>
//         </div>
//       </div>
//     </div>
//   `;
// }
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
        Priority: ${task.priority || "Medium"} <img src="/assets/icons/${priority}Priority.png" alt="">
      </div>
      <label class="taskCardPopupLabel">Assigned To:</label>
      <div class="taskCardPopupContact">
        ${(task.assignedUsers || []).map(user => `<div class="taskCardPopupContactUsers">${user.initials}</div>`).join('')}
      </div>
      <label class="taskCardPopupLabel">Subtasks</label>
      <div class="taskCardPopupSubTasks">
        <div class="progress-container">
          ${(task.subTask || []).map((subtask, index) => `
            <div class="step">
              <input type="checkbox" id="step${index}-${task.id}" onchange="updateSteps(${task.id})" ${subtask.completed ? 'checked' : ''}>
              <label for="step${index}-${task.id}">${subtask.name}</label>
            </div>
          `).join('')}
        </div>
      </div>
      <div class="taskCardPopupButtons">
        <div onclick="deleteTask(${task.id})"><img src="/assets/icons/deleteContact.png" alt="">Delete</div>
        <hr class="hrBoardTaskPopUp">
        <div onclick="editTask(${task.id})"><img src="/assets/icons/edit-pencil.png" alt="">Edit</div>
      </div>
    </div>
  `;
}

function renderAddTaskPopupToDoPlus() {
  return /*html*/ `
    <div class="addNewTaskDiv" id="addNewTaskDiv">
      <div class="addNewTaskDivHeader">
        <h2 class="addNewTaskDivHeaderH2">Add new task</h2>
        <button type="button" class="btn-close" aria-label="Close" onclick="closeAddTaskPopUp()">Schliessen</button>
      </div>
      <div class="addNewTaskDivContent">
        <div class="addNewTaskDivContentLeft">
          <label for="titleInput" class="addNewTaskDivContentLeftLabel">Title</label>
          <input type="text" id="titleInput" class="addNewTaskDivContentLeftInput">
          <label for="descriptionTextarea" class="addNewTaskDivContentLeftLabel">Description</label>
          <textarea id="descriptionTextarea" class="addNewTaskDivContentLeftInput"></textarea>
        </div>
      </div>
      <div class="addNewTaskDivFooter">
        <button type="button" class="addNewTaskDivFooterBtn" onclick="createTaskPlusToDoBtn()">Create task</button>
      </div>
    </div>
  `;
}

function renderAddTaskPopupInProgressPlus() {
  return /*html*/ `
    <div class="addNewTaskDiv" id="addNewTaskDiv">
      <div class="addNewTaskDivHeader">
        <h2 class="addNewTaskDivHeaderH2">Add new task</h2>
        <button type="button" class="btn-close" aria-label="Close" onclick="closeAddTaskPopUp()">Schliessen</button>
      </div>
      <div class="addNewTaskDivContent">
        <div class="addNewTaskDivContentLeft">
          <label for="titleInput" class="addNewTaskDivContentLeftLabel">Title</label>
          <input type="text" id="titleInput" class="addNewTaskDivContentLeftInput">
          <label for="descriptionTextarea" class="addNewTaskDivContentLeftLabel">Description</label>
          <textarea id="descriptionTextarea" class="addNewTaskDivContentLeftInput"></textarea>
        </div>
      </div>
      <div class="addNewTaskDivFooter">
        <button type="button" class="addNewTaskDivFooterBtn" onclick="createTaskPlusInProgressBtn()">Create task</button>
      </div>
    </div>
  `;
}

function renderAddTaskPopupAwaitFeedbackPlus() {
  return /*html*/ `
    <div class="addNewTaskDiv" id="addNewTaskDiv">
      <div class="addNewTaskDivHeader">
        <h2 class="addNewTaskDivHeaderH2">Add new task</h2>
        <button type="button" class="btn-close" aria-label="Close" onclick="closeAddTaskPopUp()">Schliessen</button>
      </div>
      <div class="addNewTaskDivContent">
        <div class="addNewTaskDivContentLeft">
          <label for="titleInput" class="addNewTaskDivContentLeftLabel">Title</label>
          <input type="text" id="titleInput" class="addNewTaskDivContentLeftInput">
          <label for="descriptionTextarea" class="addNewTaskDivContentLeftLabel">Description</label>
          <textarea id="descriptionTextarea" class="addNewTaskDivContentLeftInput"></textarea>
        </div>
      </div>
      <div class="addNewTaskDivFooter">
        <button type="button" class="addNewTaskDivFooterBtn" onclick="createTaskPlusAwaitFeedbackBtn()">Create task</button>
      </div>
    </div>
  `;
}

//--------- contact templates ---------
function addNewContactPopup() {
  return /*html*/ `
  <div class="shadow-div d-none"></div>
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

function editContactPopup() {
  let contact = contacts[currentSelectedContact];
  let name = contact.name;
  let email = contact.email;
  let phone = contact.phone;
  return /*html*/ `
  <div class="shadow-div d-none"></div>
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



