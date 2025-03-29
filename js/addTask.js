let subTasks = [];
let selectedContacts = new Set();

async function initAddTask() {
  await loadDataUsers();
}

let subTask = document.getElementById('subTask');
let chooseContacts = [];
let category = ['Technical Task', 'User Story'];
let selectedCategory = '';

/**
 * Updates the priority styling and icons for a task based on the selected priority.
 *
 * This function modifies the CSS classes and image sources of priority elements
 * to visually represent the selected priority level. It also calls the `btnPriority`
 * function to handle additional logic for the selected priority.
 *
 * @param {string} priority - The selected priority level. Expected values are:
 *                            "urgent", "medium", or "low".
 */
function setPriority(priority) {
  const prioUrgentEdit = document.getElementById('prioUrgentEdit');
  const prioMediumEdit = document.getElementById('prioMediumEdit');
  const prioLowEdit = document.getElementById('prioLowEdit');
  const urgentImg = document.getElementById('urgentImg');
  const mediumImg = document.getElementById('mediumImg');
  const lowImg = document.getElementById('lowImg');

  prioUrgentEdit.classList.remove('prioUrgentRed');
  prioMediumEdit.classList.remove('prioMediumYellow');
  prioLowEdit.classList.remove('prioLowGreen');
  urgentImg.src = '/assets/icons/urgentRed.png';
  mediumImg.src = '/assets/icons/mediumYellow.png';
  lowImg.src = '/assets/icons/lowGreen.png';

  btnPriority(priority);
}

function btnPriority(priority) {
  if (priority === 'urgent') {
    prioUrgentEdit.classList.add('prioUrgentRed');
    urgentImg.src = '/assets/icons/urgentWhite.png';
  } else if (priority === 'medium') {
    prioMediumEdit.classList.add('prioMediumYellow');
    mediumImg.src = '/assets/icons/mediumWhite.png';
  } else if (priority === 'low') {
    prioLowEdit.classList.add('prioLowGreen');
    lowImg.src = '/assets/icons/lowWhite.png';
  }
}

function prioUrgent() {
  setPriority('urgent');
}

function prioMedium() {
  setPriority('medium');
}

function prioLow() {
  setPriority('low');
}

/**
 * Adds a new subtask to the `subTasks` array if the input field `subTask` is not empty.
 * After adding the subtask, it re-renders the subtask list and clears the input field.
 */
function addSubTask() {
  if (subTask.value != '') {
    subTasks.push({
      description: subTask.value,
    });
    renderSubTaskList();
    subTask.value = '';
  }
}

/**
 * Renders the list of subtasks by updating the inner HTML of the element
 * with the ID "subTaskList". Iterates through the `subTasks` array and
 * appends each subtask to the list using the `generateSubTaskList` function.
 *
 * @function
 */
function renderSubTaskList() {
  let subTasksList = document.getElementById('subTaskList');
  subTasksList.innerHTML = '';

  subTasks.forEach((subTask, i) => {
    subTasksList.innerHTML += generateSubTaskList(i);
  });
}

/**
 * Toggles the visibility of elements related to editing a subtask and updates the currently selected subtask index.
 *
 * @param {number} index - The index of the subtask to be edited.
 *
 * The function performs the following actions:
 * - Toggles the "d-none" class on the input field, span, and edit/check icons for the specified subtask.
 * - Updates the global variable `currentSelectedSubTask` to the provided index.
 */
function editSubTask(index) {
  let subInputEdit = document.getElementById(`subInputEdit-${index}`);
  let subEditSpan = document.getElementById(`subEditSpan-${index}`);
  let subEditImgPen = document.getElementById(`subEditImgPen-${index}`);
  let subEditImgCheck = document.getElementById(`subEditImgCheck-${index}`);

  subInputEdit.classList.toggle('d-none');
  subEditSpan.classList.toggle('d-none');
  subEditImgPen.classList.toggle('d-none');
  subEditImgCheck.classList.toggle('d-none');

  currentSelectedSubTask = index;
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

/**
 * Updates the description of a subtask at the specified index and re-renders the subtask list.
 *
 * @param {number} index - The index of the subtask to update.
 * @throws {Error} Logs a warning if the subtask with the given index is not found.
 *
 * The function retrieves the value from the input field associated with the given index,
 * trims any leading or trailing whitespace, and updates the corresponding subtask's
 * description. If the subtask does not exist, a warning is logged to the console.
 * After updating, the subtask list is re-rendered.
 */
// function saveSubTask(index) {
//   let subInputEdit = document.getElementById(`subInputEdit-${index}`).value.trim();
//   // console.log("Vorher:", subTasks);
//   if (subTasks[index]) {
//     subTasks[index].description = subInputEdit;
//   } else {
//     console.warn(`Subtask mit Index ${index} nicht gefunden.`);
//   }
//   // console.log("Nachher:", subTasks);
//   renderSubTaskList();
// }

function saveSubTask(index) {
  let subInputEdit = document.getElementById(`subInputEdit-${index}`).value.trim();
  if (subInputEdit === "") {
      alert("Das Feld darf nicht leer sein!");
      return;
  }
  if (subTasks[index]) {
      subTasks[index].description = subInputEdit;
  } else {
      console.warn(`Subtask ${index} nicht gefunden.`);
  }
  renderSubTaskList();
}


function deleteSubTask(index) {
  // console.log("Vorher:", subTasks);
  subTasks.splice(index, 1);
  // console.log("Nachher:", subTasks);
  renderSubTaskList();
}

/**
 * Toggles the visibility of the contact list dropdown, populates it with contacts,
 * and updates the display of selected contacts.
 *
 * This function clears the current content of the contact list element, iterates
 * through the `contacts` array to generate and append HTML for each contact, and
 * toggles the visibility of the contact list. If the contact list is hidden after
 * toggling, it updates the display of selected contacts.
 *
 * Dependencies:
 * - `contacts`: An array of contact objects, each containing at least a `name` property.
 * - `selectedContacts`: A Set containing the names of selected contacts.
 * - `generateInitials(name)`: A function that generates initials from a contact's name.
 * - `generateInitialsColor(contact, initials, isChecked)`: A function that generates
 *   the HTML for a contact, including their initials and selection state.
 * - `updateSelectedContactsDisplay()`: A function that updates the display of selected contacts.
 * - `openclassList()`: A function that performs additional operations when the contact list is toggled.
 *
 * Side Effects:
 * - Modifies the inner HTML of the element with ID "assignedContactsList".
 * - Toggles the CSS classes "hidden" and "d-flex" on the contact list element.
 */
function contactList() {
  let contactList = document.getElementById('assignedContactsList');

  contactList.innerHTML = '';

  contacts.forEach((contact) => {
    const initials = generateInitials(contact.name);
    const isChecked = selectedContacts.has(contact.name) ? 'checked' : '';

    contactList.innerHTML += generateInitialsColor(contact, initials, isChecked);
  });

  contactList.classList.toggle('hidden');
  contactList.classList.toggle('d-flex');

  if (contactList.classList.contains('hidden')) {
    updateSelectedContactsDisplay();
  }
  openclassList();
}

// function generateInitialsColor(contact, initials, isChecked) {
//   return /*html*/`
//       <div class="assignedContactContent" onclick="toggleCheckbox(event, '${contact.name}')">
//         <div class="assignedContacts">
//           <span class="assignedShortcutName" style="background-color: ${contact.color};">${initials}</span>
//           <span class="assignedName">${contact.name}</span>
//         </div>
//         <input type="checkbox" name="contact-${contact.name}" id="contact-${contact.name}" ${isChecked} onclick="toggleCheckbox(event, '${contact.name}')">
//       </div>
//     `;
// }
// Test!!!!
function generateInitialsColor(contact, initials, isChecked) {
  const isActive = selectedContacts.has(contact.name) ? 'active' : '';

  return /*html*/ `
      <div class="assignedContactContent ${isActive}" onclick="toggleCheckbox(event, '${contact.name}')">
        <div class="assignedContacts">
          <span class="assignedShortcutName" style="background-color: ${contact.color};">${initials}</span>
          <span class="assignedName">${contact.name}</span>
        </div>
        <input type="checkbox" name="contact-${contact.name}" id="contact-${contact.name}" ${isChecked} onclick="toggleCheckbox(event, '${contact.name}')">
      </div>
    `;
}

function openclassList() {
  document.getElementById('assignedArrowUp').classList.toggle('d-none');
  document.getElementById('assignedArrowDown').classList.toggle('d-none');
}

/**
 * Updates the display of selected contacts in the UI.
 * Clears the current content of the "selectedContactsDisplay" container
 * and populates it with the initials of the selected contacts, styled with
 * their respective background colors.
 *
 * @function
 * @global
 * @returns {void}
 */
function updateSelectedContactsDisplay() {
  let selectedContainer = document.getElementById('selectedContactsDisplay');
  selectedContainer.innerHTML = '';
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

/**
 * Toggles the state of a checkbox and updates the associated contact selection.
 *
 * @param {Event} event - The event object triggered by the user interaction.
 * @param {string} contactName - The name of the contact associated with the checkbox.
 *
 * The function determines the checkbox element based on the event target. If the checkbox
 * is checked, it adds the contact name to the `selectedContacts` set and applies the
 * "selectedContact" CSS class to the parent element. If unchecked, it removes the contact
 * name from the set and removes the CSS class. Finally, it updates the display of selected
 * contacts.
 */
// function toggleCheckbox(event, contactName) {
//   let checkbox =
//     event.target.type === "checkbox"
//       ? event.target
//       : event.currentTarget.querySelector('input[type="checkbox"]');
//   if (checkbox) {
//     checkbox.checked = !checkbox.checked;
//     event.currentTarget.classList.toggle("selectedContact", checkbox.checked);

//     if (checkbox.checked) {
//       selectedContacts.add(contactName);
//     } else {
//       selectedContacts.delete(contactName);
//     }
//     updateSelectedContactsDisplay();
//   }
// }
function toggleCheckbox(event, contactName) {
  let checkbox =
    event.target.type === 'checkbox' ? event.target : event.currentTarget.querySelector('input[type="checkbox"]');

  if (checkbox) {
    checkbox.checked = !checkbox.checked;
    event.currentTarget.classList.toggle('selectedContact', checkbox.checked);

    if (checkbox.checked) {
      selectedContacts.add(contactName);
      event.currentTarget.classList.add('active');
    } else {
      selectedContacts.delete(contactName);
      event.currentTarget.classList.remove('active');
    }

    updateSelectedContactsDisplay();
  }
}

/**
 * Asynchronously posts a new task to the server with the provided details.
 *
 * This function gathers task-related data, processes it, and sends it to the server.
 * It also handles error scenarios using a try-catch block.
 *
 * @async
 * @function
 * @returns {Promise<void>} A promise that resolves when the task is successfully posted.
 *
 * @throws {Error} Throws an error if the task posting fails.
 *
 * @description
 * The function performs the following steps:
 * 1. Extracts task-related variables using `variablenPostAddTask`.
 * 2. Determines the task priority using `ifConditionPostAddTask`.
 * 3. Constructs a task data object, including title, description, due date, priority, sub-tasks, category, and assigned users.
 * 4. Ensures sub-tasks have a `completed` property, defaulting to `false` if not provided.
 * 5. Sends the task data to the server using `tryAndCatchBlockPostAddTask`.
 */

async function postAddTask() {
  if (!validateForm()) {
    return; 
  }

  let { prioUrgentEdit, priority, prioMediumEdit, prioLowEdit, title, description, dueDate, category, popup } =
    variablenPostAddTask();

  priority = ifConditionPostAddTask(prioUrgentEdit, priority, prioMediumEdit, prioLowEdit);

  let data = {
    columnTitles: 'To Do',
    title,
    description,
    dueDate,
    priority,
    subTasks,
    subTasks: subTasks.map((subTask) => ({
      description: subTask.description,
      completed: subTask.completed ?? false,
    })),
    category,
    users: selectedContacts,
  };

  await tryAndCatchBlockPostAddTask(data, popup);
}


/**
 * Handles the process of posting task data to Firebase and managing UI updates.
 *
 * This function attempts to post the provided task data to a Firebase database.
 * If successful, it optionally displays a popup element and redirects the user
 * to the board page after a short delay. If an error occurs during the process,
 * it logs the error to the console.
 *
 * @async
 * @function tryAndCatchBlockPostAddTask
 * @param {Object} data - The task data to be posted to Firebase.
 * @param {HTMLElement} [popup] - An optional popup element to display upon success.
 * @throws {Error} Logs any errors encountered during the posting process.
 */
async function tryAndCatchBlockPostAddTask(data, popup) {
  try {
    await postTaskDataToFirebase('tasks/', data);
    if (popup) {
      popup.classList.remove('d-none');
    }
    setTimeout(() => {
      window.location.href = '/pages/board.html';
    }, 2000);
  } catch (error) {
    console.error(error);
  }
}

/**
 * Determines the priority level based on the CSS class of the provided elements.
 *
 * @param {HTMLElement} prioUrgentEdit - The HTML element representing the "Urgent" priority.
 * @param {string} priority - The current priority value to be updated.
 * @param {HTMLElement} prioMediumEdit - The HTML element representing the "Medium" priority.
 * @param {HTMLElement} prioLowEdit - The HTML element representing the "Low" priority.
 * @returns {string} The updated priority value ("Urgent", "Medium", or "Low").
 */
function ifConditionPostAddTask(prioUrgentEdit, priority, prioMediumEdit, prioLowEdit) {
  if (prioUrgentEdit.classList.contains('prioUrgentRed')) {
    priority = 'Urgent';
  } else if (prioMediumEdit.classList.contains('prioMediumYellow')) {
    priority = 'Medium';
  } else if (prioLowEdit.classList.contains('prioLowGreen')) {
    priority = 'Low';
  }
  return priority;
}

/**
 * Collects and returns various task-related variables from the DOM.
 *
 * @returns {Object} An object containing the following properties:
 * - {HTMLElement} prioUrgentEdit - The DOM element for the "Urgent" priority button in edit mode.
 * - {string} priority - The priority level of the task (currently an empty string).
 * - {HTMLElement} prioMediumEdit - The DOM element for the "Medium" priority button in edit mode.
 * - {HTMLElement} prioLowEdit - The DOM element for the "Low" priority button in edit mode.
 * - {string} title - The value of the task title input field.
 * - {string} description - The value of the task description textarea.
 * - {string} dueDate - The value of the task due date input field.
 * - {string} category - The inner text of the category dropdown element.
 * - {HTMLElement} popup - The DOM element for the popup.
 */
function variablenPostAddTask() {
  let title = document.getElementById('titleInput').value;
  let description = document.getElementById('descriptionTextarea').value;
  let dueDate = document.getElementById('date').value;
  let category = document.getElementById('dropdownCategory').innerText;

  selectedContacts = Array.from(selectedContacts);

  let prioUrgentEdit = document.getElementById('prioUrgentEdit');
  let prioMediumEdit = document.getElementById('prioMediumEdit');
  let prioLowEdit = document.getElementById('prioLowEdit');
  let popup = document.getElementById('popup');

  let priority = 'Medium';
  return { prioUrgentEdit, priority, prioMediumEdit, prioLowEdit, title, description, dueDate, category, popup };
}

/**
 * Toggles the visibility of the category list and populates it with predefined categories.
 * This function dynamically updates the HTML content of the category list element,
 * toggles its visibility classes, and calls the `openCategoryList` function.
 *
 * Categories added:
 * - Technical Task
 * - User Story
 *
 * @function
 * @returns {void}
 */
function categorytList() {
  let categoryList = document.getElementById('categoryList');
  categoryList.innerHTML = '';
  categoryList.innerHTML += /*html*/ `
    <div id="technicalTask" onclick="chooseCategory(0)" class="categoryTechnicalTask">Technical Task</div>
    <div id="userStory" onclick="chooseCategory(1)" class="categoryUserStory">User Story</div>`;

  categoryList.classList.toggle('hidden');
  categoryList.classList.toggle('d-flex');

  openCategoryList();
}

/**
 * Handles the selection of a category from a dropdown menu.
 *
 * @param {number} categoryIndex - The index of the selected category in the `category` array.
 *
 * @description
 * This function updates the dropdown menu to display the selected category,
 * toggles the visibility of the category list, and adjusts the styles of
 * related elements. If the required DOM elements are not found, an error
 * is logged to the console.
 *
 * @throws Will log an error to the console if `categoryList` or `dropdownCategory` is not defined.
 */
function chooseCategory(categoryIndex) {
  const categoryList = document.getElementById('categoryList');
  const dropdownCategory = document.getElementById('dropdownCategory');

  if (!categoryList || !dropdownCategory) {
    console.error('categoryList oder dropdownCategory ist nicht definiert.');
    return;
  }

  selectedCategory = category[categoryIndex];
  dropdownCategory.innerHTML = selectedCategory;

  categoryList.classList.toggle('hidden');
  dropdownCategory.classList.remove('invalid');
  document.getElementById('categoryArrowUp').classList.add('d-none');
  document.getElementById('categoryArrowDown').classList.remove('d-none');
}

function openCategoryList() {
  document.getElementById('categoryArrowUp').classList.toggle('d-none');
  document.getElementById('categoryArrowDown').classList.toggle('d-none');
}


function clearForm() {
  document.getElementById('titleInput').value = ''; 
  document.getElementById('descriptionTextarea').value = ''; 
  document.getElementById('date').value = ''; 
  document.getElementById('dropdownCategory').innerText = 'Select Task Category'; 
  
  subTasks = [];
  document.getElementById('subTaskList').innerHTML = '';

  selectedContacts.clear();
  document.getElementById('selectedContactsDisplay').innerHTML = '';

  prioMedium();
}

document.addEventListener('click', function (event) {
  let contactList = document.getElementById('assignedContactsList');
  let categoryList = document.getElementById('categoryList');
  let contactContainer = document.querySelector('.assignedContainer');
  let categoryContainer = document.querySelector('.categoryContainer');

  if (!contactContainer.contains(event.target) && !contactList.contains(event.target)) {
      contactList.classList.add('hidden');
      contactList.classList.remove('d-flex');
  }
  if (!categoryContainer.contains(event.target) && !categoryList.contains(event.target)) {
      categoryList.classList.add('hidden');
      categoryList.classList.remove('d-flex');
  }
});

document.addEventListener('DOMContentLoaded', function () {
  let dateInput = document.getElementById('date');
  function setMinDate() {
      let today = new Date().toISOString().split('T')[0];
      dateInput.setAttribute('min', today);
  }
  setMinDate();
  dateInput.addEventListener('focus', setMinDate);
});
