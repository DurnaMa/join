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
            <!-- <select id="category">
              <option value disabled selected hidden>Select Task Category</option>
              <option value="Technical Task">Technical Task</option>
              <option value="User Story">User Story</option>
            </select> -->
            <div onclick="categorytList()" class="categoryContainer" id="category">
              <span id="dropdownCategory" class="">Select Task Category</span>
              <img id="categoryArrowDown" src="/assets/icons/arrow_drop_down.png" alt="" />
              <img id="categoryArrowUp" class="d-none" src="/assets/icons/arrow_drop_up.png" alt="" />
              <div id="categoryList" class="hidden"></div>
            </div>
            <br />
            <label for="subtask">Subtasks</label>
            <div id="addSubTask">
              <input id="subTaskPopUp" class="addSubTask" placeholder="Add new subtask" type="text" />
              <img onclick="addSubTaskPopUp()" style="cursor: pointer" src="/assets/icons/Subtasks_plus.png" alt="" />
            </div>
            <ul id="subTaskList"></ul>
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
            <button onclick="createTaskBtn()" class="button">
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
            <!-- <select id="category">
              <option value disabled selected hidden>Select Task Category</option>
              <option value="Technical Task">Technical Task</option>
              <option value="User Story">User Story</option>
            </select> -->
            <div onclick="categorytList()" class="categoryContainer">
              <span id="dropdownCategory" class="">Select Task Category</span>
              <img id="categoryArrowDown" src="/assets/icons/arrow_drop_down.png" alt="" />
              <img id="categoryArrowUp" class="d-none" src="/assets/icons/arrow_drop_up.png" alt="" />
              <div id="categoryList" class="hidden"></div>
            </div>
            <br />
            <label for="subtask">Subtasks</label>
            <div id="addSubTask">
              <input id="subTaskPopUp" class="addSubTask" placeholder="Add new subtask" type="text" />
              <img onclick="addSubTaskPopUp()" style="cursor: pointer" src="/assets/icons/Subtasks_plus.png" alt="" />
            </div>
            <ul id="subTaskList"></ul>
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
            <!-- <select id="category">
              <option value disabled selected hidden>Select Task Category</option>
              <option value="Technical Task">Technical Task</option>
              <option value="User Story">User Story</option>
            </select> -->
            <div onclick="categorytList()" class="categoryContainer" id="category">
              <span id="dropdownCategory" class="">Select Task Category</span>
              <img id="categoryArrowDown" src="/assets/icons/arrow_drop_down.png" alt="" />
              <img id="categoryArrowUp" class="d-none" src="/assets/icons/arrow_drop_up.png" alt="" />
              <div id="categoryList" class="hidden"></div>
            </div>
            <br />
            <label for="subtask">Subtasks</label>
            <div id="addSubTask">
              <input id="subTaskPopUp" class="addSubTask" placeholder="Add new subtask" type="text" />
              <img onclick="addSubTaskPopUp()" style="cursor: pointer" src="/assets/icons/Subtasks_plus.png" alt="" />
            </div>
            <ul id="subTaskList"></ul>
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
            <!-- <select id="category">
              <option value disabled selected hidden>Select Task Category</option>
              <option value="Technical Task">Technical Task</option>
              <option value="User Story">User Story</option>
            </select> -->
            <div onclick="categorytList()" class="categoryContainer" id="category">
              <span id="dropdownCategory" class="">Select Task Category</span>
              <img id="categoryArrowDown" src="/assets/icons/arrow_drop_down.png" alt="" />
              <img id="categoryArrowUp" class="d-none" src="/assets/icons/arrow_drop_up.png" alt="" />
              <div id="categoryList" class="hidden"></div>
            </div>
            <br />
            <label for="subtask">Subtasks</label>
            <div id="addSubTask">
              <input id="subTaskPopUp" class="addSubTask" placeholder="Add new subtask" type="text" />
              <img onclick="addSubTaskPopUp()" style="cursor: pointer" src="/assets/icons/Subtasks_plus.png" alt="" />
            </div>
            <ul id="subTaskList"></ul>
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

      <div class="test987654test">
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

// function renderEditTasksCardPopup(currentSelectedTask, taskId) {
//   let assignedContacts = currentSelectedTask.users || [];
//   let title = currentSelectedTask.title;
//   let description = currentSelectedTask.description;
//   let dueDate = currentSelectedTask.dueDate;
//   subTasks = currentSelectedTask.subTasks || [];
//   let priority = currentSelectedTask.priority;

//   if (priority === "Urgent") {
//     prioUrgentEditPopup.classList.add("prioUrgentRed");
//     urgentImgPopup.src = "/assets/icons/urgentWhite.png";
//   } else if (priority === "Medium") {
//     prioMediumEditPopup.classList.add("prioMediumYellow");
//     mediumImgPopup.src = "/assets/icons/mediumWhite.png";
//   } else if (priority === "Low") {
//     let prioLowEdit = prioLowEditPopup.classList.add("prioLowGreen");
//     let lowImg = lowImgPopup.src = "/assets/icons/lowWhite.png";
//   }

//   // 🛠 Sicherstellen, dass die vorhandenen Nutzer in selectedContacts gespeichert werden
//   selectedContacts = new Set(assignedContacts.map((user) => user.name));

//   return /*html*/ `
//     <div class="shadow-div"></div>
//     <div class="taskCardEditPopup">
//       <div class="task-edit-close-popup-div">
//         <div class="test987">
//           <img onclick="closeEditTaskCardPopUp()" class="task-edit-close-popup" src="/assets/icons/close.png" alt=""/>
//         </div>
//       </div>
//       <div class="test-test">
//       <label>Title</label>
//       <input id="titleInput" value="${title}" class="task-edit-input-popup" placeholder="Enter a title" type="text" />
//       <label>Description</label>
//       <textarea id="descriptionTextarea" class="task-edit-input-popup" placeholder="Enter a description">${description}</textarea>
//       <label>Due Date</label>
//       <input id="dueDateInput" value="${dueDate}" class="task-edit-input-popup" type="date" />
        
//       <label>Priority</label>
//       <div  class="task-edit-prio-popup">
//         <button onclick="prioUrgent()" id="prioUrgentEditPopup" class="prioBtn">
//           Urgent
//           <img id="urgentImgPopup" src="/assets/icons/urgentRed.png" alt="" />
//         </button>
//         <button onclick="prioMedium()" id="prioMediumEditPopup" class="prioBtn">
//           Medium
//           <img id="mediumImgPopup" src="/assets/icons/mediumYellow.png" alt="" />
//         </button>
//         <button onclick="prioLow()" id="prioLowEditPopup" class="prioBtn">
//           Low
//           <img id="lowImgPopup" src="/assets/icons/lowGreen.png" alt="" />
//         </button>
//       </div>

//       <label class="TESTAssignedTEST" for="contactSelection">Assigned to</label>
//       <div onclick="contactListPopUp()" class="assignedContainer">
//         <span>Select contacts to assign</span>
//         <img id="assignedArrowDown" src="/assets/icons/arrow_drop_down.png" alt="" />
//         <img id="assignedArrowUp" class="d-none" src="/assets/icons/arrow_drop_up.png" alt="" />
//       </div>
//       <div id="assignedContactsListPopUp" class="hidden"></div>
//       <div id="selectedContactsDisplay" class="selectedContactsContainerPopUp">
//         ${assignedContacts
//           .map(
//             (contact) =>
//               `<span class="assignedShortcutName" style="background-color: ${contact.color}">${contact.initials}</span>`
//           )
//           .join("")}
//       </div>
    
//       <label class="TESTSubtasksTEST" for="subtask">Subtasks</label>
//       <div id="addSubTask">
//         <input id="subTaskPopUp" class="addSubTask" placeholder="Add new subtask" type="text" />
//         <img onclick="addSubTaskPopUp()" style="cursor: pointer" src="/assets/icons/Subtasks_plus.png" alt="" />
//       </div>
//       <ul id="subTaskList">
//         ${subTasks
//           .map(
//             (subTask, i) => `
//           <li class="subTask" data-index="${i}">
//             <input id="subInputEdit-${i}" type="text" class="subTask-edit-input d-none" value="${subTask.description}">
//             <span id="subEditSpan-${i}" class="subTask-text">${subTask.description}</span>
//             <div class="subTask-actions">
//               <div class="icon-wrapper">
//                 <img id="subEditImgPen-${i}" src="/assets/icons/edit-icon.png" alt="Edit" onclick="editSubTask(${i})" class="action-icon edit-icon">
//               </div>
//               <div class="icon-wrapper">
//                 <img src="/assets/icons/delete-icon.png" alt="Delete" onclick="deleteSubTask(${i})" class="action-icon delete-icon">
//               </div>
//               <div class="separator"></div>
//               <div class="icon-wrapper">
//                 <img id="subEditImgCheck-${i}" src="/assets/icons/checkBgWhite.png" alt="Save" onclick="saveSubTask(${i})" class="action-icon save-icon d-none">
//               </div>
//             </div>
//           </li>
//         `
//           )
//           .join("")}
//       </ul>
//       </div>
//       <div class="button-ok-div">
//         <div class="buttontest987">
//         <button onclick="updateEditTask(event)" data-task-id="${taskId}" class="button-ok">Ok <img src="/assets/icons/check.png" alt="" /></button>
//         </div>
//       </div>
//     </div>
//   `;
// }

// ChatGPT
// function renderEditTasksCardPopup(currentSelectedTask, taskId) {
//   let assignedContacts = currentSelectedTask.users || [];
//   let title = currentSelectedTask.title;
//   let description = currentSelectedTask.description;
//   let dueDate = currentSelectedTask.dueDate;
//   subTasks = currentSelectedTask.subTasks || [];
//   let priority = currentSelectedTask.priority;

//   const priorityStyles = {
//     Urgent: {
//       class: "prioUrgentRed",
//       imgSrc: "/assets/icons/urgentWhite.png",
//     },
//     Medium: {
//       class: "prioMediumYellow",
//       imgSrc: "/assets/icons/mediumWhite.png",
//     },
//     Low: {
//       class: "prioLowGreen",
//       imgSrc: "/assets/icons/lowWhite.png",
//     },
//   };

//   selectedContacts = new Set(assignedContacts.map((user) => user.name));

//   return /*html*/ `
//     <div class="shadow-div"></div>
//     <div class="taskCardEditPopup">
//       <div class="task-edit-close-popup-div">
//         <div class="test987">
//           <img onclick="closeEditTaskCardPopUp()" class="task-edit-close-popup" src="/assets/icons/close.png" alt=""/>
//         </div>
//       </div>
//       <div class="test-test">
//       <label>Title</label>
//       <input id="titleInput" value="${title}" class="task-edit-input-popup" placeholder="Enter a title" type="text" />
//       <label>Description</label>
//       <textarea id="descriptionTextarea" class="task-edit-input-popup" placeholder="Enter a description">${description}</textarea>
//       <label>Due Date</label>
//       <input id="dueDateInput" value="${dueDate}" class="task-edit-input-popup" type="date" />
        
//       <label>Priority</label>
//       <div class="task-edit-prio-popup">
//         <button onclick="prioUrgent()" id="prioUrgentEditPopup" class="prioBtn ${priority === 'Urgent' ? priorityStyles.Urgent.class : ''}">
//           Urgent
//           <img id="urgentImgPopup" src="${priority === 'Urgent' ? priorityStyles.Urgent.imgSrc : '/assets/icons/urgentRed.png'}" alt="" />
//         </button>
//         <button onclick="prioMedium()" id="prioMediumEditPopup" class="prioBtn ${priority === 'Medium' ? priorityStyles.Medium.class : ''}">
//           Medium
//           <img id="mediumImgPopup" src="${priority === 'Medium' ? priorityStyles.Medium.imgSrc : '/assets/icons/mediumYellow.png'}" alt="" />
//         </button>
//         <button onclick="prioLow()" id="prioLowEditPopup" class="prioBtn ${priority === 'Low' ? priorityStyles.Low.class : ''}">
//           Low
//           <img id="lowImgPopup" src="${priority === 'Low' ? priorityStyles.Low.imgSrc : '/assets/icons/lowGreen.png'}" alt="" />
//         </button>
//       </div>

//       <label class="TESTAssignedTEST" for="contactSelection">Assigned to</label>
//       <div onclick="contactListPopUp()" class="assignedContainer">
//         <span>Select contacts to assign</span>
//         <img id="assignedArrowDown" src="/assets/icons/arrow_drop_down.png" alt="" />
//         <img id="assignedArrowUp" class="d-none" src="/assets/icons/arrow_drop_up.png" alt="" />
//       </div>
//       <div id="assignedContactsListPopUp" class="hidden"></div>
//       <div id="selectedContactsDisplay" class="selectedContactsContainerPopUp">
//         ${assignedContacts
//           .map(
//             (contact) =>
//               `<span class="assignedShortcutName" style="background-color: ${contact.color}">${contact.initials}</span>`
//           )
//           .join("")}
//       </div>
    
//       <label class="TESTSubtasksTEST" for="subtask">Subtasks</label>
//       <div id="addSubTask">
//         <input id="subTaskPopUp" class="addSubTask" placeholder="Add new subtask" type="text" />
//         <img onclick="addSubTaskPopUp()" style="cursor: pointer" src="/assets/icons/Subtasks_plus.png" alt="" />
//       </div>
//       <ul id="subTaskList">
//         ${subTasks
//           .map(
//             (subTask, i) => `
//           <li class="subTask" data-index="${i}">
//             <input id="subInputEdit-${i}" type="text" class="subTask-edit-input d-none" value="${subTask.description}">
//             <span id="subEditSpan-${i}" class="subTask-text">${subTask.description}</span>
//             <div class="subTask-actions">
//               <div class="icon-wrapper">
//                 <img id="subEditImgPen-${i}" src="/assets/icons/edit-icon.png" alt="Edit" onclick="editSubTask(${i})" class="action-icon edit-icon">
//               </div>
//               <div class="icon-wrapper">
//                 <img src="/assets/icons/delete-icon.png" alt="Delete" onclick="deleteSubTask(${i})" class="action-icon delete-icon">
//               </div>
//               <div class="separator"></div>
//               <div class="icon-wrapper">
//                 <img id="subEditImgCheck-${i}" src="/assets/icons/checkBgWhite.png" alt="Save" onclick="saveSubTask(${i})" class="action-icon save-icon d-none">
//               </div>
//             </div>
//           </li>
//         `
//           )
//           .join("")}
//       </ul>
//       </div>
//       <div class="button-ok-div">
//         <div class="buttontest987">
//         <button onclick="updateEditTask(event)" data-task-id="${taskId}" class="button-ok">Ok <img src="/assets/icons/check.png" alt="" /></button>
//         </div>
//       </div>
//     </div>
//   `;
// }

// geht
// function renderEditTasksCardPopup(currentSelectedTask, taskId) {
//   let assignedContacts = currentSelectedTask.users || [];
//   let title = currentSelectedTask.title;
//   let description = currentSelectedTask.description;
//   let dueDate = currentSelectedTask.dueDate;
//   subTasks = currentSelectedTask.subTasks || [];
//   let priority = currentSelectedTask.priority;

//   const priorityStyles = {
//     Urgent: {
//       class: "prioUrgentRed",
//       imgSrc: "/assets/icons/urgentWhite.png",
//     },
//     Medium: {
//       class: "prioMediumYellow",
//       imgSrc: "/assets/icons/mediumWhite.png",
//     },
//     Low: {
//       class: "prioLowGreen",
//       imgSrc: "/assets/icons/lowWhite.png",
//     },
//   };

//   function updatePriority(newPriority) {
//     document.getElementById("prioUrgentEditPopup").classList.remove(priorityStyles.Urgent.class);
//     document.getElementById("prioMediumEditPopup").classList.remove(priorityStyles.Medium.class);
//     document.getElementById("prioLowEditPopup").classList.remove(priorityStyles.Low.class);
  
//     document.getElementById("prioUrgentEditPopup").querySelector("img").src = "/assets/icons/urgentRed.png";
//     document.getElementById("prioMediumEditPopup").querySelector("img").src = "/assets/icons/mediumYellow.png";
//     document.getElementById("prioLowEditPopup").querySelector("img").src = "/assets/icons/lowGreen.png";
  
//     document.getElementById(`prio${newPriority}EditPopup`).classList.add(priorityStyles[newPriority].class);
//     document.getElementById(`prio${newPriority}EditPopup`).querySelector("img").src = priorityStyles[newPriority].imgSrc;
  
//     priority = newPriority;
//   }

//   selectedContacts = new Set(assignedContacts.map((user) => user.name));

//   return /*html*/ `
//     <div class="shadow-div"></div>
//     <div class="taskCardEditPopup">
//       <div class="task-edit-close-popup-div">
//         <div class="test987">
//           <img onclick="closeEditTaskCardPopUp()" class="task-edit-close-popup" src="/assets/icons/close.png" alt=""/>
//         </div>
//       </div>
//       <div class="test-test">
//       <label>Title</label>
//       <input id="titleInput" value="${title}" class="task-edit-input-popup" placeholder="Enter a title" type="text" />
//       <label>Description</label>
//       <textarea id="descriptionTextarea" class="task-edit-input-popup" placeholder="Enter a description">${description}</textarea>
//       <label>Due Date</label>
//       <input id="dueDateInput" value="${dueDate}" class="task-edit-input-popup" type="date" />
        
//       <label>Priority</label>
//       <div class="task-edit-prio-popup">
//         <button onclick="updatePriority('Urgent')" id="prioUrgentEditPopup" class="prioBtn ${priority === 'Urgent' ? priorityStyles.Urgent.class : ''}">
//           Urgent
//           <img src="${priority === 'Urgent' ? priorityStyles.Urgent.imgSrc : '/assets/icons/urgentRed.png'}" alt="" />
//         </button>
//         <button onclick="updatePriority('Medium')" id="prioMediumEditPopup" class="prioBtn ${priority === 'Medium' ? priorityStyles.Medium.class : ''}">
//           Medium
//           <img src="${priority === 'Medium' ? priorityStyles.Medium.imgSrc : '/assets/icons/mediumYellow.png'}" alt="" />
//         </button>
//         <button onclick="updatePriority('Low')" id="prioLowEditPopup" class="prioBtn ${priority === 'Low' ? priorityStyles.Low.class : ''}">
//           Low
//           <img src="${priority === 'Low' ? priorityStyles.Low.imgSrc : '/assets/icons/lowGreen.png'}" alt="" />
//         </button>
//       </div>

//       <label class="TESTAssignedTEST" for="contactSelection">Assigned to</label>
//       <div onclick="contactListPopUp()" class="assignedContainer">
//         <span>Select contacts to assign</span>
//         <img id="assignedArrowDown" src="/assets/icons/arrow_drop_down.png" alt="" />
//         <img id="assignedArrowUp" class="d-none" src="/assets/icons/arrow_drop_up.png" alt="" />
//       </div>
//       <div id="assignedContactsListPopUp" class="hidden"></div>
//       <div id="selectedContactsDisplay" class="selectedContactsContainerPopUp">
//         ${assignedContacts
//           .map(
//             (contact) =>
//               `<span class="assignedShortcutName" style="background-color: ${contact.color}">${contact.initials}</span>`
//           )
//           .join("")}
//       </div>
    
//       <label class="TESTSubtasksTEST" for="subtask">Subtasks</label>
//       <div id="addSubTask">
//         <input id="subTaskPopUp" class="addSubTask" placeholder="Add new subtask" type="text" />
//         <img onclick="addSubTaskPopUp()" style="cursor: pointer" src="/assets/icons/Subtasks_plus.png" alt="" />
//       </div>
//       <ul id="subTaskList">
//         ${subTasks
//           .map(
//             (subTask, i) => `
//           <li class="subTask" data-index="${i}">
//             <input id="subInputEdit-${i}" type="text" class="subTask-edit-input d-none" value="${subTask.description}">
//             <span id="subEditSpan-${i}" class="subTask-text">${subTask.description}</span>
//             <div class="subTask-actions">
//               <div class="icon-wrapper">
//                 <img id="subEditImgPen-${i}" src="/assets/icons/edit-icon.png" alt="Edit" onclick="editSubTask(${i})" class="action-icon edit-icon">
//               </div>
//               <div class="icon-wrapper">
//                 <img src="/assets/icons/delete-icon.png" alt="Delete" onclick="deleteSubTask(${i})" class="action-icon delete-icon">
//               </div>
//               <div class="separator"></div>
//               <div class="icon-wrapper">
//                 <img id="subEditImgCheck-${i}" src="/assets/icons/checkBgWhite.png" alt="Save" onclick="saveSubTask(${i})" class="action-icon save-icon d-none">
//               </div>
//             </div>
//           </li>
//         `
//           )
//           .join("")}
//       </ul>
//       </div>
//       <div class="button-ok-div">
//         <div class="buttontest987">
//         <button onclick="updateEditTask(event)" data-task-id="${taskId}" class="button-ok">Ok <img src="/assets/icons/check.png" alt="" /></button>
//         </div>
//       </div>
//     </div>
//   `;
// }
// function renderEditTasksCardPopup(currentSelectedTask, taskId) {
//   window.currentSelectedTask = currentSelectedTask; // Globale Referenz für updatePriority
//   let assignedContacts = currentSelectedTask.users || [];
//   let title = currentSelectedTask.title;
//   let description = currentSelectedTask.description;
//   let dueDate = currentSelectedTask.dueDate;
//   subTasks = currentSelectedTask.subTasks || [];
//   let priority = currentSelectedTask.priority;

//   selectedContacts = new Set(assignedContacts.map((user) => user.name));

//   return /*html*/ `
//     <div class="shadow-div"></div>
//     <div class="taskCardEditPopup">
//       <div class="task-edit-close-popup-div">
//         <div class="test987">
//           <img onclick="closeEditTaskCardPopUp()" class="task-edit-close-popup" src="/assets/icons/close.png" alt=""/>
//         </div>
//       </div>
//       <div class="test-test">
//       <label>Title</label>
//       <input id="titleInput" value="${title}" class="task-edit-input-popup" placeholder="Enter a title" type="text" />
//       <label>Description</label>
//       <textarea id="descriptionTextarea" class="task-edit-input-popup" placeholder="Enter a description">${description}</textarea>
//       <label>Due Date</label>
//       <input id="dueDateInput" value="${dueDate}" class="task-edit-input-popup" type="date" />
        
//       <label>Priority</label>
//       <div class="task-edit-prio-popup">
//         <button onclick="updatePriority('Urgent')" id="prioUrgentEditPopup" class="prioBtn ${priority === 'Urgent' ? priorityStyles.Urgent.class : ''}">
//           Urgent
//           <img src="${priority === 'Urgent' ? priorityStyles.Urgent.imgSrc : priorityStyles.Urgent.defaultImg}" alt="" />
//         </button>
//         <button onclick="updatePriority('Medium')" id="prioMediumEditPopup" class="prioBtn ${priority === 'Medium' ? priorityStyles.Medium.class : ''}">
//           Medium
//           <img src="${priority === 'Medium' ? priorityStyles.Medium.imgSrc : priorityStyles.Medium.defaultImg}" alt="" />
//         </button>
//         <button onclick="updatePriority('Low')" id="prioLowEditPopup" class="prioBtn ${priority === 'Low' ? priorityStyles.Low.class : ''}">
//           Low
//           <img src="${priority === 'Low' ? priorityStyles.Low.imgSrc : priorityStyles.Low.defaultImg}" alt="" />
//         </button>
//       </div>

//       <label class="TESTAssignedTEST" for="contactSelection">Assigned to</label>
//       <div onclick="contactListPopUp()" class="assignedContainer">
//         <span>Select contacts to assign</span>
//         <img id="assignedArrowDown" src="/assets/icons/arrow_drop_down.png" alt="" />
//         <img id="assignedArrowUp" class="d-none" src="/assets/icons/arrow_drop_up.png" alt="" />
//       </div>
//       <div id="assignedContactsListPopUp" class="hidden"></div>
//       <div id="selectedContactsDisplay" class="selectedContactsContainerPopUp">
//         ${assignedContacts
//           .map(
//             (contact) =>
//               `<span class="assignedShortcutName" style="background-color: ${contact.color}">${contact.initials}</span>`
//           )
//           .join("")}
//       </div>
    
//       <label class="TESTSubtasksTEST" for="subtask">Subtasks</label>
//       <div id="addSubTask">
//         <input id="subTaskPopUp" class="addSubTask" placeholder="Add new subtask" type="text" />
//         <img onclick="addSubTaskPopUp()" style="cursor: pointer" src="/assets/icons/Subtasks_plus.png" alt="" />
//       </div>
//       <ul id="subTaskList">
//         ${subTasks
//           .map(
//             (subTask, i) => `
//           <li class="subTask" data-index="${i}">
//             <input id="subInputEdit-${i}" type="text" class="subTask-edit-input d-none" value="${subTask.description}">
//             <span id="subEditSpan-${i}" class="subTask-text">${subTask.description}</span>
//             <div class="subTask-actions">
//               <div class="icon-wrapper">
//                 <img id="subEditImgPen-${i}" src="/assets/icons/edit-icon.png" alt="Edit" onclick="editSubTask(${i})" class="action-icon edit-icon">
//               </div>
//               <div class="icon-wrapper">
//                 <img src="/assets/icons/delete-icon.png" alt="Delete" onclick="deleteSubTask(${i})" class="action-icon delete-icon">
//               </div>
//               <div class="separator"></div>
//               <div class="icon-wrapper">
//                 <img id="subEditImgCheck-${i}" src="/assets/icons/checkBgWhite.png" alt="Save" onclick="saveSubTask(${i})" class="action-icon save-icon d-none">
//               </div>
//             </div>
//           </li>
//         `
//           )
//           .join("")}
//       </ul>
//       </div>
//       <div class="button-ok-div">
//         <div class="buttontest987">
//         <button onclick="updateEditTask(event)" data-task-id="${taskId}" class="button-ok">Ok <img src="/assets/icons/check.png" alt="" /></button>
//         </div>
//       </div>
//     </div>
//   `;
// }
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
        <div class="test987">
          <img onclick="closeEditTaskCardPopUp()" class="task-edit-close-popup" src="/assets/icons/close.png" alt=""/>
        </div>
      </div>
      <div class="test-test">
      <label>Title</label>
      <input id="titleInput" value="${title}" class="task-edit-input-popup" placeholder="Enter a title" type="text" />
      <label>Description</label>
      <textarea id="descriptionTextarea" class="task-edit-input-popup" placeholder="Enter a description">${description}</textarea>
      <label>Due Date</label>
      <input id="dueDateInput" value="${dueDate}" class="task-edit-input-popup" type="date" />
        
      <label>Priority</label>
      <div class="task-edit-prio-popup">
        <button onclick="updatePriority('Urgent')" id="prioUrgentEditPopup" class="prioBtn ${window.currentSelectedPriority === 'Urgent' ? 'prioUrgentRed' : ''}">
          Urgent
          <img src="${window.currentSelectedPriority === 'Urgent' ? '/assets/icons/urgentWhite.png' : '/assets/icons/urgentRed.png'}" alt="" />
        </button>
        <button onclick="updatePriority('Medium')" id="prioMediumEditPopup" class="prioBtn ${window.currentSelectedPriority === 'Medium' ? 'prioMediumYellow' : ''}">
          Medium
          <img src="${window.currentSelectedPriority === 'Medium' ? '/assets/icons/mediumWhite.png' : '/assets/icons/mediumYellow.png'}" alt="" />
        </button>
        <button onclick="updatePriority('Low')" id="prioLowEditPopup" class="prioBtn ${window.currentSelectedPriority === 'Low' ? 'prioLowGreen' : ''}">
          Low
          <img src="${window.currentSelectedPriority === 'Low' ? '/assets/icons/lowWhite.png' : '/assets/icons/lowGreen.png'}" alt="" />
        </button>
      </div>

      <label class="TESTAssignedTEST" for="contactSelection">Assigned to</label>
      <div onclick="contactListPopUp()" class="assignedContainer">
        <span>Select contacts to assign</span>
        <img id="assignedArrowDown" src="/assets/icons/arrow_drop_down.png" alt="" />
        <img id="assignedArrowUp" class="d-none" src="/assets/icons/arrow_drop_up.png" alt="" />
      </div>
      <div id="assignedContactsListPopUp" class="hidden"></div>
      <div id="selectedContactsDisplay" class="selectedContactsContainerPopUp">
        ${assignedContacts
          .map(
            (contact) =>
              `<span class="assignedShortcutName" style="background-color: ${contact.color}">${contact.initials}</span>`
          )
          .join("")}
      </div>
    
      <label class="TESTSubtasksTEST" for="subtask">Subtasks</label>
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
        <div class="buttontest987">
        <button onclick="updateEditTask(event)" data-task-id="${taskId}" class="button-ok">Ok <img src="/assets/icons/check.png" alt="" /></button>
        </div>
      </div>
    </div>
  `;
}

// test anfang!!!!!!!!!!!!!!!!!!!!!!
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

  document.getElementById("prioUrgentEditPopup").classList.remove(priorityStyles.Urgent.class);
  document.getElementById("prioMediumEditPopup").classList.remove(priorityStyles.Medium.class);
  document.getElementById("prioLowEditPopup").classList.remove(priorityStyles.Low.class);

  document.getElementById("prioUrgentEditPopup").querySelector("img").src = "/assets/icons/urgentRed.png";
  document.getElementById("prioMediumEditPopup").querySelector("img").src = "/assets/icons/mediumYellow.png";
  document.getElementById("prioLowEditPopup").querySelector("img").src = "/assets/icons/lowGreen.png";

  document.getElementById(`prio${newPriority}EditPopup`).classList.add(priorityStyles[newPriority].class);
  document.getElementById(`prio${newPriority}EditPopup`).querySelector("img").src = priorityStyles[newPriority].imgSrc;
}



// Test Ende!!!!!!!!!!!!!!!!!!!!!!!!!

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
      <div class="popup-right-profile" style="background-color: ${contact.color};">
      ${generateInitials(contact.name)}
        <!-- <img src="" alt="" /> -->
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
