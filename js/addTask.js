let subTask = document.getElementById("subTask");
let subTasks = [];

function prioUrgent() {
  document.getElementById("prioUrgentEdit").classList.add("prioUrgentRed");
  document.getElementById("urgentImg").src = "/assets/icons/urgentWhite.png";
  document
    .getElementById("prioMediumEdit")
    .classList.remove("prioMediumYellow");
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
  document
    .getElementById("prioMediumEdit")
    .classList.remove("prioMediumYellow");
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

  for (let i = 0; i < subTasks.length; i++) {
    subTasksList.innerHTML += generateSubTaskList(i);
  }
}

function generateSubTaskList(i) {
  return `
    <li class="subTask" data-index="${i}">
      <input type="text" class="subTask-edit-input" value="${subTasks[i].description}" style="display: none;">
      <span class="subTask-text">${subTasks[i].description}</span>
      <div class="subTask-actions">
        <div class="icon-wrapper">
          <img src="/assets/icons/edit-icon.png" alt="Edit" onclick="editSubTask(${i})" class="action-icon edit-icon">
        </div>
        <div class="icon-wrapper">
          <img src="/assets/icons/delete-icon.png" alt="Delete" onclick="deleteSubTask(${i})" class="action-icon delete-icon">
        </div>
        <div class="separator"></div>
        <div class="icon-wrapper">
          <img src="/assets/icons/check.png" alt="Save" onclick="saveSubTask(${i})" class="action-icon save-icon" style="display: none;">
        </div>
      </div>
    </li>
  `;
}
