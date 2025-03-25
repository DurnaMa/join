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

// alter Conde!!!!!!!!!!

// async function updateEditTask(event) {
//   event.preventDefault();

//   let taskId = event.target.getAttribute("data-task-id");
//   if (!taskId) {
//     console.error("Task ID fehlt");
//     return;
//   }

//   let taskRef = await getDataFromFirebase(`tasks/${taskId}`);
//   let existingTask = taskRef || {};

//   let updatedTitle = document.getElementById("titleInput").value.trim();
//   let updatedDescription = document
//     .getElementById("descriptionTextarea")
//     .value.trim();
//   let updatedDueDate = document.getElementById("dueDateInput").value;

//   let priority = document.querySelector(".prioEditBtn.active");
//   let updatedPriority = priority
//     ? priority.getAttribute("data-priority")
//     : existingTask.priority || "";

//   let updatedContacts = {};
//   Array.from(selectedContacts).forEach((name, index) => {
//     updatedContacts[index] = name;
//   });

//   let existingSubtasks = existingTask.subTasks || [];

//   let newSubtasks = Array.from(
//     document.querySelectorAll("#subTaskList li")
//   ).map((li) => ({
//     id: li.getAttribute("data-id") || crypto.randomUUID(),
//     description: li.innerText.trim(),
//   }));

// auskommentiert von hier !!!!!!!!!

  // let combinedSubtasks = [...existingSubtasks];

  // newSubtasks.forEach((newSub) => {
  //   let exists = combinedSubtasks.some(
  //     (existingSub) => existingSub.id === newSub.id
  //   );
  //   if (!exists) {
  //     combinedSubtasks.push(newSub);
  //   } else {
  //     combinedSubtasks = combinedSubtasks.map((sub) =>
  //       sub.id === newSub.id ? newSub : sub
  //     );
  //   }
  // });

// bis hier!!!!!!!!

//   let combinedSubtasks = newSubtasks; 


//   if (!updatedTitle || !updatedDueDate) {
//     alert("Bitte fülle alle Pflichtfelder aus.");
//     return;
//   }

//   let updatedTask = {
//     ...existingTask,
//     title: updatedTitle,
//     description: updatedDescription,
//     dueDate: updatedDueDate,
//     priority: updatedPriority,
//     users: updatedContacts,
//     subTasks: combinedSubtasks,
//     category: existingTask.category || "",
//   };

//   try {
//     await patchDataToFirebase(`tasks/${taskId}`, updatedTask);
//     console.log("Task erfolgreich bearbeitet:", taskId);
//     closeEditTaskCardPopUp();
//     renderTasks();
//   } catch (error) {
//     console.error("Fehler beim Bearbeiten der Aufgabe:", error);
//   }
//   await loadTasks();
// }

// alter code ende!!!!!!!!

// Test anfang!!!!!!!!!!


// async function updateEditTask(event) {
//   event.preventDefault();

//   let taskId = event.target.getAttribute("data-task-id");
//   if (!taskId) {
//     console.error("Task ID fehlt");
//     return;
//   }

//   let taskRef = await getDataFromFirebase(`tasks/${taskId}`);
//   let existingTask = taskRef || {};

//   let updatedTitle = document.getElementById("titleInput").value.trim();
//   let updatedDescription = document.getElementById("descriptionTextarea").value.trim();
//   let updatedDueDate = document.getElementById("dueDateInput").value;

//   let updatedPriority = window.currentSelectedPriority || existingTask.priority || "";

//   let updatedTask = {
//     ...existingTask,
//     title: updatedTitle,
//     description: updatedDescription,
//     dueDate: updatedDueDate,
//     priority: updatedPriority,
//   };

//   try {
//     await patchDataToFirebase(`tasks/${taskId}`, updatedTask);
//     console.log("Task erfolgreich bearbeitet:", taskId);
//     closeEditTaskCardPopUp();
//     renderTasks();
//   } catch (error) {
//     console.error("Fehler beim Bearbeiten der Aufgabe:", error);
//   }
//   await loadTasks();
// }
// async function updateEditTask(event) {
//   event.preventDefault();

//   let taskId = event.target.getAttribute("data-task-id");
//   if (!taskId) {
//     console.error("Task ID fehlt");
//     return;
//   }

//   let taskRef = await getDataFromFirebase(`tasks/${taskId}`);
//   let existingTask = taskRef || {};

//   let updatedTitle = document.getElementById("titleInput").value.trim();
//   let updatedDescription = document.getElementById("descriptionTextarea").value.trim();
//   let updatedDueDate = document.getElementById("dueDateInput").value;

//   let updatedPriority = window.currentSelectedPriority || existingTask.priority || "";

//   // 🔹 **Assigned Users aktualisieren**
//   let updatedContacts = {};
//   Array.from(selectedContacts).forEach((name, index) => {
//     updatedContacts[index] = name;
//   });

//   // 🔹 **Subtasks aktualisieren**
//   let newSubtasks = Array.from(document.querySelectorAll("#subTaskList li")).map((li) => ({
//     id: li.getAttribute("data-id") || crypto.randomUUID(),
//     description: li.querySelector(".subTask-text") ? li.querySelector(".subTask-text").innerText.trim() : "",
//   }));

//   if (!updatedTitle || !updatedDueDate) {
//     alert("Bitte fülle alle Pflichtfelder aus.");
//     return;
//   }

//   // 🔹 **Alle Änderungen in Firebase speichern**
//   let updatedTask = {
//     ...existingTask,
//     title: updatedTitle,
//     description: updatedDescription,
//     dueDate: updatedDueDate,
//     priority: updatedPriority,
//     users: updatedContacts, // Assigned Users speichern
//     subTasks: newSubtasks, // Subtasks speichern
//     category: existingTask.category || "",
//   };

//   try {
//     await patchDataToFirebase(`tasks/${taskId}`, updatedTask);
//     console.log("Task erfolgreich bearbeitet:", updatedTask);
//     closeEditTaskCardPopUp();
//     renderTasks();
//   } catch (error) {
//     console.error("Fehler beim Bearbeiten der Aufgabe:", error);
//   }

//   await loadTasks();
// }
async function updateEditTask(event) {
  event.preventDefault();

  let taskId = event.target.getAttribute("data-task-id");
  if (!taskId) {
    console.error("Task ID fehlt");
    return;
  }

  let taskRef = await getDataFromFirebase(`tasks/${taskId}`);
  let existingTask = taskRef || {};

  let updatedTitle = document.getElementById("titleInput").value.trim();
  let updatedDescription = document.getElementById("descriptionTextarea").value.trim();
  let updatedDueDate = document.getElementById("dueDateInput").value;

  let updatedPriority = window.currentSelectedPriority || existingTask.priority || "";

  // 🔹 **Assigned Users aktualisieren**
  let updatedContacts = {};
  Array.from(selectedContacts).forEach((name, index) => {
    updatedContacts[index] = name;
  });

  // 🔹 **Subtasks aktualisieren und den completed-Status beibehalten**
  let newSubtasks = Array.from(document.querySelectorAll("#subTaskList li")).map((li, i) => {
    let subTaskTextElement = li.querySelector(".subTask-text");
    let subTaskDescription = subTaskTextElement ? subTaskTextElement.innerText.trim() : "";
    let subTaskId = li.getAttribute("data-id") || crypto.randomUUID();
    
    return {
      id: subTaskId,
      description: subTaskDescription,
      completed: existingTask.subTasks?.[i]?.completed ?? false, // Behalte den Status aus Firebase
    };
  });

  if (!updatedTitle || !updatedDueDate) {
    alert("Bitte fülle alle Pflichtfelder aus.");
    return;
  }

  // 🔹 **Alle Änderungen in Firebase speichern**
  let updatedTask = {
    ...existingTask,
    title: updatedTitle,
    description: updatedDescription,
    dueDate: updatedDueDate,
    priority: updatedPriority,
    users: updatedContacts, // Assigned Users speichern
    subTasks: newSubtasks, // Subtasks speichern inkl. completed-Status
    category: existingTask.category || "",
  };

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



// Test ende!!!!!!!!!!!!!!!!!



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
