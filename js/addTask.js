async function initAddTask() {
  await loadDataUsers();
}

let subTask = document.getElementById("subTask");
let subTasks = [];
let chooseContacts = [];

let selectedContacts = new Set();

function setPriority(priority) {
  const prioUrgentEdit = document.getElementById("prioUrgentEdit");
  const prioMediumEdit = document.getElementById("prioMediumEdit");
  const prioLowEdit = document.getElementById("prioLowEdit");
  const urgentImg = document.getElementById("urgentImg");
  const mediumImg = document.getElementById("mediumImg");
  const lowImg = document.getElementById("lowImg");

  prioUrgentEdit.classList.remove("prioUrgentRed");
  prioMediumEdit.classList.remove("prioMediumYellow");
  prioLowEdit.classList.remove("prioLowGreen");
  urgentImg.src = "/assets/icons/urgentRed.png";
  mediumImg.src = "/assets/icons/mediumYellow.png";
  lowImg.src = "/assets/icons/lowGreen.png";

  if (priority === "urgent") {
    prioUrgentEdit.classList.add("prioUrgentRed");
    urgentImg.src = "/assets/icons/urgentWhite.png";
  } else if (priority === "medium") {
    prioMediumEdit.classList.add("prioMediumYellow");
    mediumImg.src = "/assets/icons/mediumWhite.png";
  } else if (priority === "low") {
    prioLowEdit.classList.add("prioLowGreen");
    lowImg.src = "/assets/icons/lowWhite.png";
  }
}

function prioUrgent() {
  setPriority("urgent");
}

function prioMedium() {
  setPriority("medium");
}

function prioLow() {
  setPriority("low");
}

function addSubTask() {
  if (subTask.value != "") {
    subTasks.push({
      description: subTask.value,
    });
    renderSubTaskList();
    subTask.value = "";
  }
}

// subTask.addEventListener("keydown", function (event) {
//   if (event.key === "Enter") {
//     event.preventDefault();
//     addSubTask();
//   }
// });

function renderSubTaskList() {
  let subTasksList = document.getElementById("subTaskList");

  subTasksList.innerHTML = "";

  for (let i = 0; i < subTasks.length; i++) {
    subTasksList.innerHTML += generateSubTaskList(i);
  }
}

function generateSubTaskList(i) {
  return /*html*/ `
    <li class="subTask" data-index="${i}">
      <input id="subInputEdit-${i}" type="text" class="subTask-edit-input d-none" value="${subTasks[i].description}">
      <span id="subEditSpan-${i}" class="subTask-text">${subTasks[i].description}</span>
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
  `;
}

function editSubTask(index) {
  let subInputEdit = document.getElementById(`subInputEdit-${index}`);
  let subEditSpan = document.getElementById(`subEditSpan-${index}`);
  let subEditImgPen = document.getElementById(`subEditImgPen-${index}`);
  let subEditImgCheck = document.getElementById(`subEditImgCheck-${index}`);

  subInputEdit.classList.toggle("d-none");
  subEditSpan.classList.toggle("d-none");
  subEditImgPen.classList.toggle("d-none");
  subEditImgCheck.classList.toggle("d-none");

  currentSelectedSubTask = index;
}

function saveSubTask(index) {
  let subInputEdit = document.getElementById(`subInputEdit-${index}`).value;
  subTasks[index].description = subInputEdit;

  let subEditSpan = document.getElementById(`subEditSpan-${index}`);
  let subEditImgPen = document.getElementById(`subEditImgPen-${index}`);
  let subEditImgCheck = document.getElementById(`subEditImgCheck-${index}`);

  subEditSpan.textContent = subInputEdit;

  document.getElementById(`subInputEdit-${index}`).classList.toggle("d-none");
  subEditSpan.classList.toggle("d-none");
  subEditImgPen.classList.toggle("d-none");
  subEditImgCheck.classList.toggle("d-none");

  renderSubTaskList();
}

function deleteSubTask(index) {
  let subInputEdit = document.getElementById(`subInputEdit-${index}`);
  subTasks[index].description = subInputEdit;
  subTasks.splice(index, 1);

  renderSubTaskList();
}

function contactList() {
  let contactList = document.getElementById("assignedContactsList");

  contactList.innerHTML = "";

  contacts.forEach((contact) => {
    const initials = generateInitials(contact.name);
    const isChecked = selectedContacts.has(contact.name) ? "checked" : "";

    contactList.innerHTML += /*html*/ `
      <div class="assignedContactContent" onclick="toggleCheckbox(event, '${contact.name}')">
        <div class="assignedContacts">
          <span class="assignedShortcutName" style="background-color: ${contact.color};">${initials}</span>
          <span class="assignedName">${contact.name}</span>
        </div>
        <input type="checkbox" name="contact-${contact.name}" id="contact-${contact.name}" ${isChecked} onclick="toggleCheckbox(event, '${contact.name}')">
      </div>
    `;
  });

  contactList.classList.toggle("hidden");
  contactList.classList.toggle("d-flex");

  if (contactList.classList.contains("hidden")) {
    updateSelectedContactsDisplay();
  }
  openclassList();
}

function openclassList() {
  document.getElementById("assignedArrowUp").classList.toggle("d-none");
  document.getElementById("assignedArrowDown").classList.toggle("d-none");
}

function updateSelectedContactsDisplay() {
  let selectedContainer = document.getElementById("selectedContactsDisplay");
  selectedContainer.innerHTML = "";
  selectedContacts.forEach((contactName) => {
    let contact = contacts.find((c) => c.name === contactName);
    if (contact) {
      selectedContainer.innerHTML += /*html*/ `
        <span class="assignedShortcutName" style="background-color: ${contact.color};">${generateInitials(
        contact.name
      )}</span>
      `;
    }
  });
}

function toggleCheckbox(event, contactName) {
  let checkbox =
    event.target.type === "checkbox" ? event.target : event.currentTarget.querySelector('input[type="checkbox"]');
  if (checkbox) {
    checkbox.checked = !checkbox.checked;
    event.currentTarget.classList.toggle("selectedContact", checkbox.checked);

    if (checkbox.checked) {
      selectedContacts.add(contactName);
    } else {
      selectedContacts.delete(contactName);
    }
    updateSelectedContactsDisplay();
  }
}

async function postAddTask() {
  let title = document.getElementById("titleInput").value;
  let description = document.getElementById("descriptionTextarea").value;
  let dueDate = document.getElementById("date").value;
  let category = document.getElementById("category").value;
  
  selectedContacts = Array.from(selectedContacts);

  let prioUrgentEdit = document.getElementById("prioUrgentEdit");
  let prioMediumEdit = document.getElementById("prioMediumEdit");
  let prioLowEdit = document.getElementById("prioLowEdit");

  let priority = "";

  if (prioUrgentEdit.classList.contains("prioUrgentRed")) {
    priority = "urgent";
  } else if (prioMediumEdit.classList.contains("prioMediumYellow")) {
    priority = "medium";
  } else if (prioLowEdit.classList.contains("prioLowGreen")) {
    priority = "low";
  }

  let data = {
    //id: todos.length + 1,
    columnTitles: "To Do",
    title,
    description,
    dueDate,
    priority,
    subTasks,
    category,
    users: selectedContacts,
  };

  try {
    await postDataToFirebase("tasks/", data);
  } catch (error) {
    console.error(error);
  }
}
