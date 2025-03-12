function openTaskPopup(taskId) {
  console.log("Task ID:", taskId);
  let id = tasks.findIndex((task) => task.id == taskId);
  if (id === -1) {
    console.error("Task nicht gefunden:", taskId);
    return;
  }

  let currentSelectedTask = tasks[id];
  console.log("Gewählte Aufgabe:", currentSelectedTask);
  console.log("Assigned Users:", currentSelectedTask.users);
  console.log("Subtasks:", currentSelectedTask.subTasks);

  let openTaskPopupDiv = document.getElementById("openTaskPopupDiv");
  openTaskPopupDiv.classList.remove("d-none");
  openTaskPopupDiv.innerHTML = renderTasksCardPopup(currentSelectedTask);
}

function openEditTaskPopup(taskId) {
  let id = tasks.findIndex((task) => task.id == taskId);
  let currentSelectedTask = tasks[id];

  let editTaskPopupDiv = document.getElementById("editTaskPopupDiv");
  let openTaskPopupDiv = document.getElementById("openTaskPopupDiv");
  openTaskPopupDiv.classList.add("d-none");
  editTaskPopupDiv.classList.remove("d-none");
  editTaskPopupDiv.innerHTML = renderEditTasksCardPopup(currentSelectedTask, taskId);
}

// async function editTask(taskId) {
//   let id = tasks.findIndex((task) => task.id == taskId);
//   let currentSelectedTask = tasks[id];

//   if (!currentSelectedTask) {
//     console.error("Task nicht gefunden");
//     return;
//   }

//   let taskCard = document.getElementById(`task-${taskId}`);

//   let title = document.getElementById("titleInput").value;
//   let description = document.getElementById("descriptionTextarea").value;
//   let category = document.getElementById("category").value;
//   let dueDate = document.getElementById("date").value;
//   let priority = document.getElementById("prio").value;
  
//   let subTasksInput = document.getElementById("subTask").value;
//   let subTasks = subTasksInput ? subTasksInput.split(",").map(task => task.trim()) : [];

//   let updatedTask = {
//     title: title,
//     description: description,
//     category: category,
//     dueDate: dueDate,
//     priority: priority,
//     subTasks: subTasks,
//   };

//   try {
//     await patchDataToFirebase(`tasks/${taskId}`, updatedTask);
//     tasks[id] = { ...currentSelectedTask, ...updatedTask }; 
//     renderTasks(); 
//   } catch (error) {
//     console.error("Fehler beim Speichern der Änderungen:", error);
//   }

//   document.getElementById("editTaskPopupDiv").classList.add("d-none");
// }

async function updateEditTask(taskId) {
  let id = tasks.findIndex((task) => task.id == taskId);
  // let currentSelectedTasks = currentSelectedTask.id;
  let task = id;
  let taskCard = document.getElementById(`task-${taskId}`);

  let title = document.getElementById("titleInput").value;
  let description = document.getElementById("descriptionTextarea").value;
  let category = document.getElementById("category").value;
  let dueDate = document.getElementById("date").value;
  let priority = document.getElementById("prio").value;
  let prioUrgentEdit = document.getElementById("prioUrgentEdit").value;
  let prioMediumEdit = document.getElementById("prioMediumEdit").value;
  let prioLowEdit = document.getElementById("prioLowEdit").value;
  let subTask = document.getElementById("subTask").value;

  let taskCardContent = {
    title: title,
    description: description,
    category: category,
    dueDate: dueDate,
    priority: priority,
    prioUrgentEdit: prioUrgentEdit,
    prioMediumEdit: prioMediumEdit,
    prioLowEdit: prioLowEdit,
    subTask: subTask,
  };


  
  try {
    await postDataToFirebase(`tasks/${taskId}`, taskCardContent);
  } catch (error) {
    console.error(error);
  }

  taskCard.innerHTML = renderAddTaskPoupBtn(task);
  renderTasks();
}

function addTaskPopupBtn() {
  let addNewTaskBtnDiv = document.getElementById("addNewTaskBtnDiv");
  addNewTaskBtnDiv.classList.remove("d-none");
  addNewTaskBtnDiv.innerHTML = renderAddTaskPoupBtn();
}

function addTaskPopupPlusToDoBtn() {
  let openTaskPopupToDoDiv = document.getElementById("openTaskPopupToDoDiv");
  openTaskPopupToDoDiv.classList.remove("d-none");
  openTaskPopupToDoDiv.innerHTML = renderAddTaskPopupToDoPlus();
}

function addTaskPopupPlusInProgressBtn() {
  let openTaskPopupInProgressDiv = document.getElementById(
    "openTaskPopupInProgressDiv"
  );
  openTaskPopupInProgressDiv.classList.remove("d-none");
  openTaskPopupInProgressDiv.innerHTML = renderAddTaskPopupInProgressPlus();
}

function addTaskPopupPlusAwaitFeedbackBtn() {
  let openTaskPopupAwaitFeedbackDiv = document.getElementById(
    "openTaskPopupAwaitFeedbackDiv"
  );
  openTaskPopupAwaitFeedbackDiv.classList.remove("d-none");
  openTaskPopupAwaitFeedbackDiv.innerHTML =
    renderAddTaskPopupAwaitFeedbackPlus();
}

function closeAddTaskPopUp() {
  document.getElementById("addNewTaskBtnDiv").classList.add("d-none");
  document.getElementById("addTaskPopupDiv").classList.add("d-none");
  document.getElementById("openTaskPopupDiv").classList.add("d-none");
}

function closeAddTaskPopUpToDo() {
  document.getElementById("openTaskPopupToDoDiv").classList.add("d-none");
}

function closeAddTaskPopUpInProgress() {
  document.getElementById("openTaskPopupInProgressDiv").classList.add("d-none");
}

function closeAddTaskPopUpAwaitFeedback() {
  document
    .getElementById("openTaskPopupAwaitFeedbackDiv")
    .classList.add("d-none");
}

function closeTaskCardPopUp() {
  document.getElementById("openTaskPopupDiv").classList.add("d-none");
}

function closeEditTaskCardPopUp() {
  document.getElementById("editTaskPopupDiv").classList.add("d-none");
}

function contactListPopUp() {
  let contactList = document.getElementById("assignedContactsListPopUp");

  contactList.innerHTML = contacts
    .map((contact) => {
      const initials = generateInitials(contact.name);
      const isChecked = selectedContacts.has(contact.name) ? "checked" : "";
      return `
        <div class="assignedContactContentPopUp" onclick="toggleCheckbox(event, '${contact.name}')">
          <div class="assignedContactsPopUp">
            <span class="assignedShortcutNamePopUp" style="background-color: ${contact.color};">${initials}</span>
            <span class="assignedNamePopUp">${contact.name}</span>
          </div>
          <input type="checkbox" id="contact-${contact.name}" ${isChecked} onclick="toggleCheckbox(event, '${contact.name}')">
        </div>
      `;
    })
    .join("");

  contactList.classList.toggle("hidden");

  if (contactList.classList.contains("hidden")) {
    updateSelectedContactsDisplay();
  }
  openclassList();
}
