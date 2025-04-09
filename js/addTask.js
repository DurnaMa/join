let subTasks = [];
let selectedContacts = new Set();

/**
 * Initializes the "Add Task" functionality.
 * 
 * This asynchronous function:
 * - Loads user data by calling `loadDataUsers()`.
 * - Sets the minimum date restriction for the date input using `datelimit()`.
 * 
 * @async
 * @function initAddTask
 * @returns {Promise<void>} A promise that resolves when the initialization is complete.
 */
async function initAddTask() {
  await loadDataUsers();
  datelimit();
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

/**
 * Updates the priority button styling based on the selected priority.
 * 
 * This function applies a specific CSS class and changes the corresponding priority 
 * icon based on the given `priority` value.
 * 
 * Priority options:
 * - `'urgent'`: Adds the class `prioUrgentRed` and updates the icon to `urgentWhite.png`.
 * - `'medium'`: Adds the class `prioMediumYellow` and updates the icon to `mediumWhite.png`.
 * - `'low'`: Adds the class `prioLowGreen` and updates the icon to `lowWhite.png`.
 * 
 * @function btnPriority
 * @param {string} priority - The selected priority level (`'urgent'`, `'medium'`, or `'low'`).
 */
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

/**
 * Sets the task priority to "urgent".
 * 
 * Calls `setPriority('urgent')` to update the priority setting.
 * 
 * @function prioUrgent
 */
function prioUrgent() {
  setPriority('urgent');
}

/**
 * Sets the task priority to "medium".
 * 
 * Calls `setPriority('medium')` to update the priority setting.
 * 
 * @function prioMedium
 */
function prioMedium() {
  setPriority('medium');
}

/**
 * Sets the task priority to "low".
 * 
 * Calls `setPriority('low')` to update the priority setting.
 * 
 * @function prioLow
 */
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

/**
 * Generates an HTML list item for a subtask.
 * 
 * This function creates an HTML string representing a subtask item, including:
 * - A text display (`<span>`) and an editable input field (`<input>`).
 * - Action buttons for editing, deleting, and saving the subtask.
 * - A unique `data-index` attribute for tracking the subtask.
 * 
 * The function uses the global `subTasks` array to retrieve the subtask description.
 * 
 * @function generateSubTaskList
 * @param {number} i - The index of the subtask in the `subTasks` array.
 * @returns {string} An HTML string representing the subtask list item.
 */
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
function saveSubTask(index) {
  let subInputEdit = document.getElementById(`subInputEdit-${index}`);
  let inputValue = subInputEdit.value.trim();

  if (inputValue === "") {
    subInputEdit.placeholder = "Bitte fülle dieses Feld aus!";
    return;
  }
  if (subTasks[index]) {
    subTasks[index].description = inputValue;
  } else {
    console.warn(`Subtask ${index} nicht gefunden.`);
  }
  renderSubTaskList();
}

/**
 * Deletes a subtask from the subTasks array and updates the UI.
 * 
 * This function removes the subtask at the specified index from the global `subTasks` array 
 * and then calls `renderSubTaskList()` to refresh the displayed list of subtasks.
 * 
 * @function deleteSubTask
 * @param {number} index - The index of the subtask to be deleted.
 */
function deleteSubTask(index) {
  subTasks.splice(index, 1);
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

/**
 * Generates an HTML representation of a contact with initials and a checkbox.
 * 
 * This function creates a selectable contact element displaying:
 * - The contact's initials with a background color.
 * - The contact's full name.
 * - A checkbox indicating whether the contact is selected.
 * 
 * The function checks if the contact is currently selected (`selectedContacts` set)
 * and applies the `active` class accordingly.
 * 
 * @function generateInitialsColor
 * @param {Object} contact - The contact object containing name and color properties.
 * @param {string} initials - The initials of the contact.
 * @param {string} isChecked - The `checked` attribute value (`'checked'` or an empty string).
 * @returns {string} An HTML string representing the contact element.
 */
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

/**
 * Toggles the visibility of assigned arrow icons.
 * 
 * This function switches the `d-none` class on the elements with IDs 
 * `assignedArrowUp` and `assignedArrowDown`, effectively toggling 
 * their visibility.
 * 
 * @function openclassList
 */
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
function toggleCheckbox(event, contactName) {
  let checkbox = event.target.type === 'checkbox' ? event.target : event.currentTarget.querySelector('input[type="checkbox"]');
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
