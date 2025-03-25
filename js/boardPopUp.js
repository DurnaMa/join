function openTaskPopup(taskId) {
  document.getElementById("bodyId").classList.add("overflow-hidden");
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
  editTaskPopupDiv.innerHTML = renderEditTasksCardPopup(
    currentSelectedTask,
    taskId
  );
}

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
    console.log("Task erfolgreich bearbeitet:", updatedTask);
    closeEditTaskCardPopUp();
    renderTasks();
  } catch (error) {
    console.error("Fehler beim Bearbeiten der Aufgabe:", error);
  }

  await loadTasks();
}

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

async function updateVariables(taskId) {
  let taskRef = await getDataFromFirebase(`tasks/${taskId}`);
  let existingTask = taskRef || {};
  let updatedTitle = document.getElementById("titleInput").value.trim();
  let updatedDescription = document.getElementById("descriptionTextarea").value.trim();
  let updatedDueDate = document.getElementById("dueDateInput").value;
  let updatedPriority = window.currentSelectedPriority || existingTask.priority || "";
  return { existingTask, updatedTitle, updatedDueDate, updatedDescription, updatedPriority };
}

function addTaskPopupBtn() {
  document.getElementById("bodyId").classList.add("overflow-hidden");
  let addNewTaskBtnDiv = document.getElementById("addNewTaskBtnDiv");
  addNewTaskBtnDiv.classList.remove("d-none");
  addNewTaskBtnDiv.innerHTML = renderAddTaskPoupBtn();
}

function addTaskPopupPlusToDoBtn() {
  document.getElementById("bodyId").classList.add("overflow-hidden");
  let openTaskPopupToDoDiv = document.getElementById("openTaskPopupToDoDiv");
  openTaskPopupToDoDiv.classList.remove("d-none");
  openTaskPopupToDoDiv.innerHTML = renderAddTaskPopupToDoPlus();
}

function addTaskPopupPlusInProgressBtn() {
  document.getElementById("bodyId").classList.add("overflow-hidden");
  let openTaskPopupInProgressDiv = document.getElementById(
    "openTaskPopupInProgressDiv"
  );
  openTaskPopupInProgressDiv.classList.remove("d-none");
  openTaskPopupInProgressDiv.innerHTML = renderAddTaskPopupInProgressPlus();
}

function addTaskPopupPlusAwaitFeedbackBtn() {
  document.getElementById("bodyId").classList.add("overflow-hidden");
  let openTaskPopupAwaitFeedbackDiv = document.getElementById(
    "openTaskPopupAwaitFeedbackDiv"
  );
  openTaskPopupAwaitFeedbackDiv.classList.remove("d-none");
  openTaskPopupAwaitFeedbackDiv.innerHTML =
    renderAddTaskPopupAwaitFeedbackPlus();
}

function closeAddTaskPopUp() {
  document.getElementById("bodyId").classList.remove("overflow-hidden");
  document.getElementById("addNewTaskBtnDiv").classList.add("d-none");
  document.getElementById("addTaskPopupDiv").classList.add("d-none");
  document.getElementById("openTaskPopupDiv").classList.add("d-none");
  location.reload();
}

function closeAddTaskPopUpToDo() {
  document.getElementById("bodyId").classList.remove("overflow-hidden");
  document.getElementById("openTaskPopupToDoDiv").classList.add("d-none");
  location.reload();
}

function closeAddTaskPopUpInProgress() {
  document.getElementById("bodyId").classList.remove("overflow-hidden");
  document.getElementById("openTaskPopupInProgressDiv").classList.add("d-none");
  location.reload();
}

function closeAddTaskPopUpAwaitFeedback() {
  document.getElementById("bodyId").classList.remove("overflow-hidden");
  document
    .getElementById("openTaskPopupAwaitFeedbackDiv")
    .classList.add("d-none");
    location.reload();
}

function closeTaskCardPopUp() {
  document.getElementById("bodyId").classList.remove("overflow-hidden");
  document.getElementById("openTaskPopupDiv").classList.add("d-none");
  location.reload();
}

function closeEditTaskCardPopUp() {
  document.getElementById("bodyId").classList.remove("overflow-hidden");
  document.getElementById("editTaskPopupDiv").classList.add("d-none");
  location.reload();
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
        </div>`;
    }).join("");
  contactList.classList.toggle("hidden");
  if (contactList.classList.contains("hidden")) {
    updateSelectedContactsDisplay();
  }
  openclassList();
}
