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

// async function updateEditTask(taskId) {
//   let id = tasks.findIndex((task) => task.id == taskId);
//   // let currentSelectedTasks = currentSelectedTask.id;
//   let task = id;
//   let taskCard = document.getElementById(`task-${taskId}`);

//   let title = document.getElementById("titleInput").value;
//   let description = document.getElementById("descriptionTextarea").value;
//   let category = document.getElementById("category").value;
//   let dueDate = document.getElementById("date").value;
//   let priority = document.getElementById("prio").value;
//   let prioUrgentEdit = document.getElementById("prioUrgentEdit").value;
//   let prioMediumEdit = document.getElementById("prioMediumEdit").value;
//   let prioLowEdit = document.getElementById("prioLowEdit").value;
//   let subTask = document.getElementById("subTask").value;

//   let taskCardContent = {
//     title: title,
//     description: description,
//     category: category,
//     dueDate: dueDate,
//     priority: priority,
//     prioUrgentEdit: prioUrgentEdit,
//     prioMediumEdit: prioMediumEdit,
//     prioLowEdit: prioLowEdit,
//     subTask: subTask,
//   };


  
//   try {
//     await postDataToFirebase(`tasks/${taskId}`, taskCardContent);
//   } catch (error) {
//     console.error(error);
//   }

//   taskCard.innerHTML = renderAddTaskPoupBtn(task);
//   renderTasks();
// }
// async function updateEditTask(taskId) { 
//   let task = tasks.find(task => task.id === taskId);
  
//   if (!task) {
//     console.error(`Fehler: Task mit ID ${taskId} nicht gefunden!`);
//     return;
//   }

//   let taskCard = document.getElementById(`task-${task.id}`);

//   let title = document.getElementById("titleInput").value;
//   let description = document.getElementById("descriptionTextarea").value;
//   let dueDate = document.getElementById("dueDateInput").value;

//   // Priorität ermitteln
//   let priority = "";
//   if (document.getElementById("prioUrgentEditPopUp").classList.contains("prioUrgentRed")) {
//     priority = "urgent";
//   } else if (document.getElementById("prioMediumEditPopUp").classList.contains("prioMediumYellow")) {
//     priority = "medium";
//   } else if (document.getElementById("prioLowEditPopUp").classList.contains("prioLowGreen")) {
//     priority = "low";
//   }

//   // Alle gewählten Kontakte sammeln
//   let assignedContacts = [];
//   document.querySelectorAll("#selectedContactsDisplay .assignedShortcutName").forEach(contactEl => {
//     assignedContacts.push({
//       initials: contactEl.textContent.trim(),
//       color: contactEl.style.backgroundColor
//     });
//   });

//   // Alle Subtasks sammeln
//   let subTasks = [];
//   document.querySelectorAll("#subTaskList li").forEach(subTaskEl => {
//     subTasks.push(subTaskEl.textContent.trim());
//   });

//   // Aktualisiertes Task-Objekt für Firebase
//   let updatedTask = {
//     title: title,
//     description: description,
//     dueDate: dueDate,
//     priority: priority,
//     assignedContacts: assignedContacts,
//     subTasks: subTasks,
//     users: Array.from(selectedContacts) // falls selectedContacts ein Set ist
//   };

//   try {
//     await putDataToFirebase(`tasks/${taskId}`, updatedTask);
//     console.log(`Task ${taskId} erfolgreich aktualisiert`, updatedTask);
//   } catch (error) {
//     console.error("Fehler beim Aktualisieren der Task:", error);
//   }

//   taskCard.innerHTML = renderAddTaskPoupBtn(task);
//   renderTasks();
// }
// async function updateEditTask(taskId) { 
//   let tasktest1 = tasks.findIndex((task) => task.id == taskId);
//   let tasktest2 = tasks[taskId];
//   // Debugging: Überprüfen, ob taskId existiert
//   console.log("Aufruf von updateEditTask mit taskId:", taskId);

//   // Falls taskId nicht übergeben wurde, versuche es aus dem Popup zu holen
//   if (!taskId) {
//     let taskCard = document.querySelector(".taskCardEditPopup");
//     if (taskCard) {
//       taskId = taskCard.getAttribute("data-task-id");
//     }
//   }

//   // Falls immer noch keine taskId vorhanden ist, abbrechen
//   if (!taskId) {
//     console.error("Fehler: Keine gültige Task-ID gefunden!");
//     return;
//   }

//   // Die richtige Task aus dem Array holen
//   let task = tasks.find(task => task.id === taskId);
//   if (!task) {
//     console.error(`Fehler: Task mit ID ${taskId} nicht gefunden!`);
//     return;
//   }

//   let taskCard = document.getElementById(`task-${task.id}`);

//   let title = document.getElementById("titleInput").value;
//   let description = document.getElementById("descriptionTextarea").value;
//   let dueDate = document.getElementById("dueDateInput").value;

//   // Priorität ermitteln
//   let priority = "";
//   if (document.getElementById("prioUrgentEditPopUp").classList.contains("prioUrgentRed")) {
//     priority = "urgent";
//   } else if (document.getElementById("prioMediumEditPopUp").classList.contains("prioMediumYellow")) {
//     priority = "medium";
//   } else if (document.getElementById("prioLowEditPopUp").classList.contains("prioLowGreen")) {
//     priority = "low";
//   }

//   // Alle gewählten Kontakte sammeln
//   let assignedContacts = [];
//   document.querySelectorAll("#selectedContactsDisplay .assignedShortcutName").forEach(contactEl => {
//     assignedContacts.push({
//       initials: contactEl.textContent.trim(),
//       color: contactEl.style.backgroundColor
//     });
//   });

//   // Alle Subtasks sammeln
//   let subTasks = [];
//   document.querySelectorAll("#subTaskList li").forEach(subTaskEl => {
//     subTasks.push(subTaskEl.textContent.trim());
//   });

//   // Aktualisiertes Task-Objekt für Firebase
//   let updatedTask = {
//     title: title,
//     description: description,
//     dueDate: dueDate,
//     priority: priority,
//     assignedContacts: assignedContacts,
//     subTasks: subTasks,
//     users: Array.from(selectedContacts) // falls selectedContacts ein Set ist
//   };

//   try {
//     await putDataToFirebase(`tasks/${taskId}`, updatedTask);
//     console.log(`Task ${taskId} erfolgreich aktualisiert`, updatedTask);
//   } catch (error) {
//     console.error("Fehler beim Aktualisieren der Task:", error);
//   }

//   renderTasks();
// }
// async function updateEditTask(taskId) {
//   // Werte aus den Eingabefeldern abrufen
//   let updatedTitle = document.getElementById("titleInput").value.trim();
//   let updatedDescription = document.getElementById("descriptionTextarea").value.trim();
//   let updatedDueDate = document.getElementById("dueDateInput").value;
  
//   // Priorität bestimmen
//   let priority = document.querySelector(".prioEditBtn.active");
//   let updatedPriority = priority ? priority.getAttribute("data-priority") : "Medium";
  
//   // Ausgewählte Kontakte abrufen
//   let updatedContacts = Array.from(selectedContacts).map(name => {
//     return allContacts.find(contact => contact.name === name);
//   }).filter(contact => contact);
  
//   // Subtasks abrufen
//   let updatedSubtasks = Array.from(document.querySelectorAll("#subTaskList li")).map(li => ({
//     text: li.innerText,
//     completed: li.classList.contains("completed")
//   }));
  
//   // Sicherstellen, dass alle Felder ausgefüllt sind
//   if (!updatedTitle || !updatedDueDate) {
//     alert("Bitte fülle alle Pflichtfelder aus.");
//     return;
//   }
  
//   // Das Task-Objekt aktualisieren
//   let updatedTask = {
//     title: updatedTitle,
//     description: updatedDescription,
//     dueDate: updatedDueDate,
//     priority: updatedPriority,
//     users: updatedContacts,
//     subtasks: updatedSubtasks
//   };
  
//   try {
//     await putDataToFirebase("tasks/", updatedTask, taskId);
//     console.log(taskId);
//     console.log("editTask erfolgreich");
//     closeEditTaskCardPopUp(); // Popup schließen
//     renderTasks(); // Tasks neu rendern
//   } catch (error) {
//     console.error("Fehler beim Bearbeiten der Aufgabe:", error);
//   }
// }
// async function updateEditTask(event) {
//   event.preventDefault(); // Verhindert das Neuladen der Seite
  
//   let taskId = event.target.getAttribute("data-task-id");
//   if (!taskId) {
//     console.error("Task ID fehlt");
//     return;
//   }

//   // Werte aus den Eingabefeldern abrufen
//   let updatedTitle = document.getElementById("titleInput").value.trim();
//   let updatedDescription = document.getElementById("descriptionTextarea").value.trim();
//   let updatedDueDate = document.getElementById("dueDateInput").value;
  
//   // Priorität bestimmen
//   let priority = document.querySelector(".prioEditBtn.active");
//   let updatedPriority = priority ? priority.getAttribute("data-priority") : "Medium";
  
//   // Ausgewählte Kontakte abrufen
//   let updatedContacts = Array.from(selectedContacts).map(name => {
//     return contacts.find(users => users.name === name);
//   }).filter(name => name);
  
//   // Subtasks abrufen
//   let updatedSubtasks = Array.from(document.querySelectorAll("#subTaskList li")).map(li => ({
//     text: li.innerText,
//     completed: li.classList.contains("completed")
//   }));
  
//   // Sicherstellen, dass alle Felder ausgefüllt sind
//   if (!updatedTitle || !updatedDueDate) {
//     alert("Bitte fülle alle Pflichtfelder aus.");
//     return;
//   }

//   // Das Task-Objekt aktualisieren
//   let updatedTask = {
//     title: updatedTitle,
//     description: updatedDescription,
//     dueDate: updatedDueDate,
//     priority: updatedPriority,
//     users: updatedContacts,
//     subtasks: updatedSubtasks
//   };
  
//   try {
//     await putDataToFirebase("tasks/", updatedTask, taskId);
//     console.log(taskId);
//     console.log("editTask erfolgreich");
//     closeEditTaskCardPopUp(); // Popup schließen
//     renderTasks(); // Tasks neu rendern
//   } catch (error) {
//     console.error("Fehler beim Bearbeiten der Aufgabe:", error);
//   }
// }
// async function updateEditTask(event) {
//   event.preventDefault(); // Verhindert das Neuladen der Seite
  
//   let taskId = event.target.getAttribute("data-task-id");
//   if (!taskId) {
//     console.error("Task ID fehlt");
//     return;
//   }

//   // Werte aus den Eingabefeldern abrufen
//   let updatedTitle = document.getElementById("titleInput").value.trim();
//   let updatedDescription = document.getElementById("descriptionTextarea").value.trim();
//   let updatedDueDate = document.getElementById("dueDateInput").value;
  
//   // Priorität bestimmen
//   let priority = document.querySelector(".prioEditBtn.active");
//   let updatedPriority = priority ? priority.getAttribute("data-priority") : "Medium";
  
//   // Nur die Namen der ausgewählten Kontakte extrahieren
//   let updatedContacts = {};
//   Array.from(selectedContacts).forEach((name, index) => {
//     updatedContacts[index] = name;
//   });
  
//   // Subtasks abrufen
//   let updatedSubtasks = Array.from(document.querySelectorAll("#subTaskList li")).map(li => ({
//     text: li.innerText,
//     completed: li.classList.contains("completed")
//   }));
  
//   // Sicherstellen, dass alle Felder ausgefüllt sind
//   if (!updatedTitle || !updatedDueDate) {
//     alert("Bitte fülle alle Pflichtfelder aus.");
//     return;
//   }
  
//   // Das Task-Objekt aktualisieren
//   let updatedTask = {
//     title: updatedTitle,
//     description: updatedDescription,
//     dueDate: updatedDueDate,
//     priority: updatedPriority,
//     users: updatedContacts,
//     subtasks: updatedSubtasks
//   };
  
//   try {
//     await putDataToFirebase("tasks/", updatedTask, taskId);
//     console.log(taskId);
//     console.log("editTask erfolgreich");
//     closeEditTaskCardPopUp(); // Popup schließen
//     renderTasks(); // Tasks neu rendern
//   } catch (error) {
//     console.error("Fehler beim Bearbeiten der Aufgabe:", error);
//   }
// }
// async function updateEditTask(event) {
//   event.preventDefault(); // Verhindert das Neuladen der Seite
  
//   let taskId = event.target.getAttribute("data-task-id");
//   if (!taskId) {
//     console.error("Task ID fehlt");
//     return;
//   }

//   // Werte aus den Eingabefeldern abrufen
//   let updatedTitle = document.getElementById("titleInput").value.trim();
//   let updatedDescription = document.getElementById("descriptionTextarea").value.trim();
//   let updatedDueDate = document.getElementById("dueDateInput").value;
  
//   // Priorität bestimmen
//   let priority = document.querySelector(".prioEditBtn.active");
//   let updatedPriority = priority ? priority.getAttribute("data-priority") : "Medium";
  
//   // Nur die Namen der ausgewählten Kontakte extrahieren
//   let updatedContacts = {};
//   Array.from(selectedContacts).forEach((name, index) => {
//     updatedContacts[index] = name;
//   });
  
//   let updatedSubtaskstest = {};
//   Array.from(document.querySelectorAll("#subTaskList li")).forEach((name, index) => {
//     updatedContacts[index] = name;
//   });

//   // Subtasks abrufen und Format anpassen
//   let updatedSubtasks = Array.from(document.querySelectorAll("#subTaskList li")).map(li => ({
//     description: li.innerText
//   }));
  
//   // Sicherstellen, dass alle Felder ausgefüllt sind
//   if (!updatedTitle || !updatedDueDate) {
//     alert("Bitte fülle alle Pflichtfelder aus.");
//     return;
//   }
  
//   // Bestehende Daten aus Firebase abrufen und nur geänderte Werte aktualisieren
//   let taskRef = await getDataFromFirebase(`tasks/${taskId}`);
//   let existingTask = taskRef || {};

//   let updatedTask = {
//     ...existingTask, // Bestehende Daten beibehalten
//     title: updatedTitle,
//     description: updatedDescription,
//     dueDate: updatedDueDate,
//     priority: updatedPriority,
//     users: updatedContacts,
//     subTasks: updatedSubtasks,
//     category: existingTask.category || "" // Falls keine Kategorie existiert, leer lassen
//   };
  
//   try {
//     await putDataToFirebase("tasks/", updatedTask, taskId);
//     console.log(taskId);
//     console.log("editTask erfolgreich");
//     closeEditTaskCardPopUp(); // Popup schließen
//     renderTasks(); // Tasks neu rendern
//   } catch (error) {
//     console.error("Fehler beim Bearbeiten der Aufgabe:", error);
//   }
//   await loadTasks();
// }
async function updateEditTask(event) {
  event.preventDefault(); // Verhindert das Neuladen der Seite

  let taskId = event.target.getAttribute("data-task-id");
  if (!taskId) {
    console.error("Task ID fehlt");
    return;
  }

  // Bestehende Daten aus Firebase abrufen
  let taskRef = await getDataFromFirebase(`tasks/${taskId}`);
  let existingTask = taskRef || {};

  // Werte aus den Eingabefeldern abrufen
  let updatedTitle = document.getElementById("titleInput").value.trim();
  let updatedDescription = document.getElementById("descriptionTextarea").value.trim();
  let updatedDueDate = document.getElementById("dueDateInput").value;

  // Priority bestimmen: Wenn keine neue Auswahl, dann alte beibehalten
  let priority = document.querySelector(".prioEditBtn.active");
  let updatedPriority = priority ? priority.getAttribute("data-priority") : existingTask.priority || "";

  // Nur die Namen der ausgewählten Kontakte extrahieren
  let updatedContacts = {};
  Array.from(selectedContacts).forEach((name, index) => {
    updatedContacts[index] = name;
  });

  // Subtasks abrufen und Format anpassen
  let updatedSubtasks = Array.from(document.querySelectorAll("#subTaskList li")).map(li => ({
    description: li.innerText,
  }));

  // Sicherstellen, dass alle Pflichtfelder ausgefüllt sind
  if (!updatedTitle || !updatedDueDate) {
    alert("Bitte fülle alle Pflichtfelder aus.");
    return;
  }

  let updatedTask = {
    ...existingTask, // Bestehende Daten beibehalten
    title: updatedTitle,
    description: updatedDescription,
    dueDate: updatedDueDate,
    priority: updatedPriority, // Falls keine neue Auswahl, bleibt die alte
    users: updatedContacts,
    subTasks: updatedSubtasks,
    category: existingTask.category || "" // Falls keine Kategorie existiert, leer lassen
  };

  try {
    await putDataToFirebase("tasks/", updatedTask, taskId);
    console.log(taskId);
    console.log("editTask erfolgreich");
    closeEditTaskCardPopUp(); // Popup schließen
    renderTasks(); // Tasks neu rendern
  } catch (error) {
    console.error("Fehler beim Bearbeiten der Aufgabe:", error);
  }
  await loadTasks();
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
