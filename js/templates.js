//--------- Board page add task templates ---------
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
            <br />
            <label for="description">Description</label>
            <textarea id="descriptionTextarea" rows="5" placeholder="Enter a Description"></textarea>
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
            <br />
            <label for="description">Description</label>
            <textarea id="descriptionTextarea" rows="5" placeholder="Enter a Description"></textarea>
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
            <button onclick="createTaskPlusToDoBtn()" class="button">
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
            <br />
            <label for="description">Description</label>
            <textarea id="descriptionTextarea" rows="5" placeholder="Enter a Description"></textarea>
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
            <button onclick="createTaskPlusInProgressBtn()" class="button">
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
            <br />
            <label for="description">Description</label>
            <textarea id="descriptionTextarea" rows="5" placeholder="Enter a Description"></textarea>
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
            <button onclick="createTaskPlusAwaitFeedbackBtn()" class="button">
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
  // if (!task) {
  //   return `<p>Fehler: Keine Daten für diese Aufgabe gefunden.</p>`;
  // }

  // let priority = task.priority ? task.priority.toLowerCase() : "medium";

  // return /*html*/ `
  // <div class="shadow-div"></div>
  //   <div class="taskCardPopup" id="taskPopUp" data-task-id="${task.id}">
  //     <div class="taskCardPopupCategory">
  //       <div class="taskCardPopupCategoryColor">
  //         <h2>${task.category || "No Category"}</h2>
  //       </div>
  //       <img onclick="closeTaskCardPopUp()" src="/assets/icons/close.png" alt="" />
  //     </div>
  //     <div class="taskCardPopupTitle">${task.title || "No Title"}</div>
  //     <div class="taskCardPopupDescription">${task.description || "No Description"}</div>
  //     <div class="taskCardPopupDate">
  //       <label>Due date:</label>
  //       <span>${task.dueDate || "N/A"}</span> 
  //     </div>
  //     <div class="taskCardPopupPrio">
  //       <label>Priority:</label>
  //       <span>${task.priority || "Medium"} 
  //         <img src="/assets/icons/${priority}Priority.png" alt="">
  //       </span> 
  //     </div>
  if (!task) {
    return `<p>Fehler: Keine Daten für diese Aufgabe gefunden.</p>`;
  }

  let priorityImages = {
    "urgent": "urgentRed.png",
    "medium": "mediumYellow.png",
    "low": "lowGreen.png",
  };
  let priorityImageSrc = `/assets/icons/${priorityImages[task.priority] || "default.png"}`;

  return /*html*/ `
  <div class="shadow-div"></div>
    <div class="taskCardPopup" id="taskPopUp" data-task-id="${task.id}">
      <div class="taskCardPopupCategory">
        <div class="taskCardPopupCategoryColor">
          <h2>${task.category || "No Category"}</h2>
        </div>
        <img onclick="closeTaskCardPopUp()" src="/assets/icons/close.png" alt="" />
      </div>
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
                (user) =>
                  `<div class="taskCardPopupContactName"><div class="taskCardPopupContactInitials" style="background-color: ${user.color}">
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

      <div class="taskCardPopupButtons">
        <div onclick="deleteTask('${task.id}')">
          <img src="/assets/icons/deleteContact.png" alt="">Delete
        </div>
        <hr class="hrBoardTaskPopUp">
        <div onclick="editTaskPopup('${task.id}')">
          <img src="/assets/icons/edit-pencil.png" alt="">Edit
        </div>
      </div>
    </div>
  `;
}



// function renderTasksCardPopup(task) {
//   let priority = task.priority ? task.priority.toLowerCase() : "medium";
//   return /*html*/ `
//   <div class="shadow-div"></div>
//     <div class="taskCardPopup" id="taskPopUp" data-task-id="${task.id}">
//       <div class="taskCardPopupCategory">
//         <div class="taskCardPopupCategoryColor">
//           <h2>${task.category}</h2>
//         </div>
//         <img onclick="closeTaskCardPopUp()" src="/assets/icons/close.png" alt="" />
//       </div>
//       <div class="taskCardPopupTitle">${task.title}</div>
//       <div class="taskCardPopupDescription">${task.description}</div>
//       <div class="taskCardPopupDate">
//         <label>Due date:</label>
//         <span>${task.dueDate || "N/A"}</span> 
//       </div>
//       <div class="taskCardPopupPrio">
//         <label>Priority:</label>
//         <span>${task.priority || "Medium"} <img src="/assets/icons/${priority}Priority.png" alt=""></span> 
//       </div>
//       <label class="taskCardPopupLabel">Assigned To:</label>
//       <div class="taskCardPopupContact">
//         ${(task.assignedUsers || [])
//           .map(
//             (user) =>
//               `<div class="taskCardPopupContactUsers">${user.initials}</div>`
//           )
//           .join("")}
//       </div>
//       <label class="taskCardPopupLabel">Subtasks</label>
//       <div class="taskCardPopupSubTasks">
//         <div class="progress-container">
//           ${(task.subTask || [])
//             .map(
//               (subtask, index) => `
//             <div class="step">
//               <input type="checkbox" id="step${index}-${
//                 task.id
//               }" onchange="updateSteps(${task.id})" ${
//                 subtask.completed ? "checked" : ""
//               }>
//               <label for="step${index}-${task.id}">${subtask.name}</label>
//             </div>
//           `
//             )
//             .join("")}
//         </div>
//       </div>
//       <div class="taskCardPopupButtons">
//         <div onclick="deleteTask('${task.id}')">
//         <img src="/assets/icons/deleteContact.png" alt="">Delete</div>
//         <hr class="hrBoardTaskPopUp">
//         <div onclick="editTaskPopup('${task.id}')"><img src="/assets/icons/edit-pencil.png" alt="">Edit</div>
//       </div>
//     </div>
//   `;
// }


// function renderEditTasksCardPopup(currentSelectedTask) { 
//   let assignedUsers = currentSelectedTask.users || []; // Falls undefined, setzen wir ein leeres Array
//   let subTasks = currentSelectedTask.subTasks || []; 

//   return /*html*/ `
//     <div class="shadow-div"></div>
//     <div class="taskCardEditPopup">
//       <div class="task-edit-close-popup-div">
//         <img
//           onclick="closeEditTaskCardPopUp()"
//           class="task-edit-close-popup"
//           src="/assets/icons/close.png"
//           alt=""
//         />
//       </div>
//       <label>Title</label>
//       <input class="task-edit-input-popup" type="text" value="${currentSelectedTask.title}" />
//       <label>Description</label>
//       <textarea class="task-edit-input-popup">${currentSelectedTask.description}</textarea>
//       <label>Due Date</label>
//       <input class="task-edit-input-popup" type="date" value="${currentSelectedTask.dueDate}" />
//       <div>
//         <label>Priority</label>
//         <div class="task-edit-prio-popup">
//           <button class="prioEditBtn" ${currentSelectedTask.priority === 'Urgent' ? 'selected' : ''}>
//             Urgent
//             <img src="/assets/icons/urgentRed.png" alt="" />
//           </button>
//           <button class="prioEditBtn" ${currentSelectedTask.priority === 'Medium' ? 'selected' : ''}>
//             Medium
//             <img src="/assets/icons/mediumYellow.png" alt="" />
//           </button>
//           <button class="prioEditBtn" ${currentSelectedTask.priority === 'Low' ? 'selected' : ''}>
//             Low
//             <img src="/assets/icons/lowGreen.png" alt="" />
//           </button>
//         </div>
//         <label for="contactSelection">Assigned to</label>
//         <div onclick="contactListPopUp()" class="assignedContainer">
//           <span>${assignedUsers.map(user => user.initials).join(', ')}</span>
//           <img id="assignedArrowDown" src="/assets/icons/arrow_drop_down.png" alt="" />
//           <img id="assignedArrowUp" class="d-none" src="/assets/icons/arrow_drop_up.png" alt="" />
//         </div>
//         <div id="assignedContactsListPopUp" class="hidden"></div>
//       </div>
//       <label for="subtask">Subtasks</label>
//       <div id="addSubTask">
//         <input id="subTaskPopUp" class="addSubTask" placeholder="Add new subtask" type="text" />
//         <img onclick="addSubTaskPopUp()" style="cursor: pointer" src="/assets/icons/Subtasks_plus.png" alt="" />
//       </div>
//       <ul id="subTaskList">
//         ${subTasks.map(subtask => `<li>${subtask.name}</li>`).join('')}
//       </ul>
//       <div class="button-ok-div">
//         <button class="button-ok">
//           Ok <img src="/assets/icons/check.png" alt="" />
//         </button>
//       </div>
//     </div>
//   `;
// }

function renderEditTasksCardPopup(currentSelectedTask) {
  let title = currentSelectedTask.title;
  let description = currentSelectedTask.description;
  let dueDate = currentSelectedTask.dueDate;

  return /*html*/ `
    <div class="shadow-div"></div>
    <div class="taskCardEditPopup">
      <div class="task-edit-close-popup-div">
        <div class="test987">
          <img onclick="closeEditTaskCardPopUp()" class="task-edit-close-popup" src="/assets/icons/close.png" alt=""/>
        </div>
      </div>
      <label>Title</label>
      <input value="${title}" class="task-edit-input-popup" placeholder="Enter a title" type="text" />
      <label>Description</label>
      <textarea class="task-edit-input-popup" placeholder="Enter a description" id="">${description}</textarea>
      <label>Due Date</label>
      <input value="${dueDate}" class="task-edit-input-popup" type="date" />
        
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
          <label class="TESTAssignedTEST" for="contactSelection">Assigned to</label>
        <div onclick="contactListPopUp()" class="assignedContainer">
          <span>Select contacts to assign</span>
          <img id="assignedArrowDown" src="/assets/icons/arrow_drop_down.png" alt="" />
          <img id="assignedArrowUp" class="d-none" src="/assets/icons/arrow_drop_up.png" alt="" />
        </div>
        <div id="assignedContactsListPopUp" class="hidden"></div>
    
    
      <label class="TESTSubtasksTEST" for="subtask">Subtasks</label>
        <div id="addSubTask">
          <input id="subTaskPopUp" class="addSubTask" placeholder="Add new subtask" type="text" />
          <img onclick="addSubTaskPopUp()" style="cursor: pointer" src="/assets/icons/Subtasks_plus.png" alt="" />
        </div>
        <ul id="subTaskList"></ul>
    
      <div class="button-ok-div">
        <div class="buttontest987">
          <button class="button-ok">Ok<img src="/assets/icons/check.png" alt="" /></button>
        </div>
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
      <div class="popup-right-profile">
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
      <h1>Edit contact</h1>
      <hr />
    </div>
    <div class="mobile-edit-popup-below">
      <div>
        <img src="/assets/img/profileIMG.png" alt="" />
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
          <input
            value="${email}"
            class="mobile-email"
            type="text"
            id="editContactEmail"
            placeholder="Email"
          />
          <input
            value="${phone}"
            class="mobile-phone"
            type="text"
            id="editContactPhone"
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

//--------- summary templates ---------

// function summaryTemplate(tasks) {
//   return /*html*/ `
//   <div class="summaryContainer">
//       <div class="summaryHeadline">
//         <h1>Join 407</h1>
//         <div class="mobileHeader">
//           <hr class="headlineHr" />
//           <h2>Key Metrics at a Glance</h2>
//         </div>
//       </div>
//       <div class="summaryOverview">
//         <div class="overviewContent">
//           <div class="summaryMediumContent">
//             <a class="mediumBox pencil" href="/pages/bord.html">
//               <img class="mediumBoxImg" src="/assets/icons/pencilBgDunkel.png" alt="" />
//               <img class="mediumBoxImgHover" src="/assets/icons/pencilBgWhite.png" alt="" />
//               <div class="boxInfo">
//                 <span class="amount" id="toDoCount">${tasks.length}</span>
//                 <span class="title">${tasks.length} "To-do"</span>
//               </div>
//             </a>
//             <a class="mediumBox check" href="/pages/bord.html">
//               <img class="mediumBoxImg" src="/assets/icons/checkBgDunkel.png" alt="" />
//               <img class="mediumBoxImgHover" src="/assets/icons/checkBgWhite.png" alt="" />
//               <div class="boxInfo">
//                 <span class="amount" id="doneCount">1</span>
//                 <span class="title">${tasks.length} "Done"</span>
//               </div>
//             </a>
//           </div>
//           <br />
//           <div class="summarysLargeContent">
//             <a class="largeBox" href="/pages/bord.html">
//               <div class="urgent">
//                 <img class="largeBoxImg" src="/assets/icons/urgent.png" alt="" />
//                 <div class="boxInfo">
//                   <span class="amount" id="urgentCount">3</span>
//                   <span class="title">${tasks.length} "Urgent"</span>
//                 </div>
//               </div>
//               <hr class="largeBoxHr" />
//               <div class="date">
//                 <div id="date">October 16, 2022</div>
//                 <span>Upcoming Deadline</span>
//               </div>
//             </a>
//           </div>
//           <br />
//           <div class="summarySmallContent">
//             <a class="smallBox" href="/pages/bord.html">
//               <div class="boxInfo">
//                 <span class="amount" id="totalTaskCount">7</span>
//                 <span class="title">Tasks in<br />Board</span>
//               </div>
//             </a>
//             <a class="smallBox" href="/pages/bord.html">
//               <div class="boxInfo">
//                 <span class="amount" id="inProgressCount">3</span>
//                 <span class="title">Tasks in<br />Progress</span>
//               </div>
//             </a>
//             <a class="smallBox" href="/pages/bord.html">
//               <div class="boxInfo">
//                 <span class="amount" id="awaitFeedbackCount">1</span>
//                 <span class="title">Awaiting<br />Feedback</span>
//               </div>
//             </a>
//           </div>
//         </div>
//         <div id="greetings" class="greetings">
//           <span id="time"></span>
//           <h2>Guest</h2>
//         </div>
//       </div>
//     </div>
//   `;
// }

