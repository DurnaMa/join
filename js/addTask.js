async function initAddTask() {
  await loadDataUsers();
  contactList();
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

function addSubTask() {
  if (subTask.value != "") {
    subTasks.push({
      description: subTask.value,
      completed: true,
    });
    renderSubTaskList();
    subTask.value = "";
  }
}

subTask.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    addSubTask();
  }
});

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

// function goBack() {
//   const referrer = document.referrer;
//   if (referrer) {
//     window.location.href = referrer;
//   } else {
//     window.location.href = "index.html";
//   }
// }
function toggleCheckbox(event) {
  if (event.target.type !== "checkbox") {
    let checkbox = event.currentTarget.querySelector('input[type="checkbox"]');
    if (checkbox) {
      checkbox.checked = !checkbox.checked;
      event.currentTarget.classList.toggle("selectedContact", checkbox.checked);
    }
  }
}

async function postAddTask() {
  let title = document.getElementById("titleInput").value;
  let description = document.getElementById("descriptionTextarea").value;
  let dueDate = document.getElementById("date").value;
  let priority = document.getElementById("prio").value;
  let assignedContacts = [].value;

  let data = {
    title,
    description,
    dueDate,
    priority,
    subTasks,
    assignedContacts,
  };

  try {
    await putDataToFirebase("/tasks", data);
  } catch (error) {}

  await postDataTask(data);
}
