let todos = [
  {
    id: 1,
    columnTitles: "To do",
    category: "User story",
    title: "Task 1",
    description: "Task 1 description",
    subtasks: [],
    users: [],
    prio: [],
  },
  {
    id: 2,
    columnTitles: "In progress",
    category: "Technical task",
    title: "Task 2",
    description: "Task 2 description",
    subtasks: [],
    users: [],
    prio: [],
  },
  {
    id: 3,
    columnTitles: "Await feedback",
    category: [],
    title: "Task 3",
    description: "Task 3 description",
    subtasks: [],
    users: [],
    prio: [],
  },
  {
    id: 4,
    columnTitles: "Done",
    category: [],
    title: "Task 4",
    description: "Task 4 description",
    subtasks: [],
    users: [],
    prio: [],
  },
];

async function initAddTask() {
  await loadDataUsers();
  contactList();
  showContent();
}

function showContent() {
  setTimeout(() => {
    document.getElementById("contact").classList.remove("d-none");
  }, 10);
}

let subTask = document.getElementById("subTask");
let subTasks = [];

function prioUrgent() {
  document.getElementById("prioUrgentEdit").classList.add("prioUrgentRed");
  document.getElementById("urgentImg").src = "/assets/icons/urgentWhite.png";
  document.getElementById("prioMediumEdit").classList.remove("prioMediumYellow");
  document.getElementById("prioLowEdit").classList.remove("prioLowGreen");
  document.getElementById("mediumImg").src = "/assets/icons/mediumYellow.png";
  document.getElementById("lowImg").src = "/assets/icons/lowGreen.png";
}
function prioMedium() {
  document.getElementById("prioMediumEdit").classList.add("prioMediumYellow");
  document.getElementById("mediumImg").src = "/assets/icons/mediumWhite.png";
  document.getElementById("prioLowEdit").classList.remove("prioLowGreen");
  document.getElementById("prioUrgentEdit").classList.remove("prioUrgentRed");
  document.getElementById("lowImg").src = "/assets/icons/lowGreen.png";
  document.getElementById("urgentImg").src = "/assets/icons/urgentRed.png";
}
function prioLow() {
  document.getElementById("prioLowEdit").classList.add("prioLowGreen");
  document.getElementById("lowImg").src = "/assets/icons/lowWhite.png";
  document.getElementById("prioMediumEdit").classList.remove("prioMediumYellow");
  document.getElementById("prioUrgentEdit").classList.remove("prioUrgentRed");
  document.getElementById("mediumImg").src = "/assets/icons/mediumYellow.png";
  document.getElementById("urgentImg").src = "/assets/icons/urgentRed.png";
}

function addSubtask() {
  if (subTask.value != "") {
    subTasks.push({
      description: subTask.value,
      completed: false,
    });
    renderSubTaskList();
    subTask.value = "";
  }
}

subTask.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    addSubtask();
  }
});

function renderSubTaskList() {
  let subTasksList = document.getElementById("subTaskList");

  subTasksList.innerHTML = "";

  for (let subTasksIndex = 0; subTasksIndex < subTasks.length; subTasksIndex++) {
    subTasksList.innerHTML += generateSubTaskList(subTasksIndex);
  }
}

function generateSubTaskList(subTasksIndex) {
  return `
    <li class="subTask" data-index="${subTasksIndex}">
      <input type="text" class="subTask-edit-input" value="${subTasks[i].description}" style="display: none;">
      <span class="subTask-text">${subTasks[subTasksIndex].description}</span>
      <div class="subTask-actions">
        <div class="icon-wrapper">
          <img src="/assets/icons/edit-icon.png" alt="Edit" onclick="editSubTask(${subTasksIndex})" class="action-icon edit-icon">
        </div>
        <div class="icon-wrapper">
          <img src="/assets/icons/delete-icon.png" alt="Delete" onclick="deleteSubTask(${subTasksIndex})" class="action-icon delete-icon">
        </div>
        <div class="separator"></div>
        <div class="icon-wrapper">
          <img src="/assets/icons/check.png" alt="Save" onclick="saveSubTask(${subTasksIndex})" class="action-icon save-icon" style="display: none;">
        </div>
      </div>
    </li>
  `;
}

function contactList() {
  console.log("triger");
  let contactList = document.getElementById("assignedContactsList");
  contactList.innerHTML = "";
  contacts.forEach((contact) => {
    const initials = generateInitials(contact.name);
    contactList.innerHTML += /*html*/ `
      <div class="assignedContactContent" onclick="toggleCheckbox(event)">
        <div class="assignedContacts">
          <span class="assignedShortcutName">${initials}</span>
          <span class="assignedName">${contact.name}</span>
        </div>
        <input type="checkbox" name="contact-${contact.id}" id="contact-${contact.id}">
      </div>
    `;
  });
  contactList.classList.toggle("hidden");
  contactList.classList.toggle("d-flex");
}

// window.onclick = function (event) {
//   if (!event.target.matches(".assignedTo")) {
//     let dropdowns = document.getElementsByClassName("selecassignedTot");
//     let assignedTOUsserIndex;
//     for (assignedTOUsserIndex = 0; assignedTOUsserIndex < dropdowns.length; assignedTOUsserIndex++) {
//       let openDropdown = dropdowns[assignedTOUsserIndex];
//       if (openDropdown.classList.contains("show")) {
//         openDropdown.classList.remove("show");
//       }
//     }
//   }
// };

// async function assignedTOUsser() {
//   let user = await loadDataUsers();
//   let assignedTo = document.getElementById("assignedContactsList").classList.toggle("show");
//   assignedTo.value = user.name;
//   assignedTo.disabled = true;
// }

function createtTaskBtn() {
  let title = document.getElementById("titleInput");
  let description = document.getElementById("descriptionTextarea");
  title = titleInput.value;
  description = descriptionTextarea.value;

  let newTask = {
    id: todos.length + 1,
    columnTitles: "To Do",
    category: [],
    title: title,
    description: description,
    //subtasks: [],
    users: [],
    prio: [],
  };
  todos.push(newTask);
  goBack();
}

function goBack() {
  const referrer = document.referrer;
  if (referrer) {
    window.location.href = referrer;
  } else {
    window.location.href = "index.html";
  }
}
function toggleCheckbox(event) {
  if (event.target.type !== "checkbox") {
    let checkbox = event.currentTarget.querySelector('input[type="checkbox"]');
    if (checkbox) {
      checkbox.checked = !checkbox.checked;
      event.currentTarget.classList.toggle("selectedContact", checkbox.checked);
    }
  }
}
