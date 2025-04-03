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
  
    let data = taskData(title, description, dueDate, priority, category);
    await tryAndCatchBlockPostAddTask(data, popup);
  }
  
  /**
   * Creates a task data object with the provided values and additional default properties.
   * 
   * This function generates a structured task object to be stored or sent to a database.
   * It includes metadata such as title, description, due date, priority, category, and selected users.
   * The `subTasks` array is also included, with each subtask containing a description and a `completed` status.
   * 
   * @function taskData
   * @param {string} title - The title of the task.
   * @param {string} description - A detailed description of the task.
   * @param {string} dueDate - The due date of the task (in `YYYY-MM-DD` format).
   * @param {string} priority - The priority level of the task (`urgent`, `medium`, or `low`).
   * @param {string} category - The task's category.
   * @returns {Object} A task object ready to be saved or transmitted.
   */
  function taskData(title, description, dueDate, priority, category) {
    return {
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
  
  /**
   * Toggles the visibility of category arrow icons.
   * 
   * This function switches the `d-none` class on the elements with IDs 
   * `categoryArrowUp` and `categoryArrowDown`, effectively toggling 
   * their visibility.
   * 
   * @function openCategoryList
   */
  function openCategoryList() {
    document.getElementById('categoryArrowUp').classList.toggle('d-none');
    document.getElementById('categoryArrowDown').classList.toggle('d-none');
  }
  
  /**
   * Clears the form inputs and resets related UI elements.
   * 
   * This function resets the following elements:
   * - Clears the title input (`#titleInput`), description textarea (`#descriptionTextarea`), and date input (`#date`).
   * - Resets the category dropdown (`#dropdownCategory`) to its default text ("Select Task Category").
   * - Clears the `subTasks` array and updates the subtask list UI (`#subTaskList`).
   * - Clears the selected contacts set and updates the display (`#selectedContactsDisplay`).
   * - Resets the task priority to "medium" by calling `prioMedium()`.
   * 
   * @function clearForm
   */
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
  
  /**
   * Handles clicks on the document to hide open contact and category lists when clicking outside of them.
   * 
   * This event listener listens for any click on the document and checks if the click occurs outside
   * the assigned contacts list (`#assignedContactsList`) or the category list (`#categoryList`).
   * If the click happens outside these elements, the corresponding list will be hidden by toggling 
   * the `hidden` and `d-flex` classes.
   * 
   * It checks for clicks outside of:
   * - The contact list (`#assignedContactsList`) and its container (`.assignedContainer`).
   * - The category list (`#categoryList`) and its container (`.categoryContainer`).
   * 
   * @function documentClickHandler
   * @listens document#click
   */
  document.addEventListener('click', function (event) { 
    let { contactContainer, contactList, categoryContainer, categoryList } = closeContentVariablen();
  
    if (contactContainer && contactList) {
        if (!contactContainer.contains(event.target) && !contactList.contains(event.target)) {
            contactList.classList.add('hidden');
            contactList.classList.remove('d-flex');
        }
    }
  
    if (categoryContainer && categoryList) {
        if (!categoryContainer.contains(event.target) && !categoryList.contains(event.target)) {
            categoryList.classList.add('hidden');
            categoryList.classList.remove('d-flex');
        }
    }
  });
  
  /**
   * Retrieves DOM elements related to contact and category UI components.
   * 
   * This function selects and returns the following elements:
   * - `#assignedContactsList`: The list element containing assigned contacts.
   * - `.assignedContainer`: The container for the assigned contacts.
   * - `#categoryList`: The list element containing categories.
   * - `.categoryContainer`: The container for the categories.
   * 
   * @function closeContentVariablen
   * @returns {Object} An object containing the selected DOM elements:
   * - `contactContainer` {Element|null}
   * - `contactList` {Element|null}
   * - `categoryContainer` {Element|null}
   * - `categoryList` {Element|null}
   */
  function closeContentVariablen() {
    let contactList = document.getElementById('assignedContactsList');
    let categoryList = document.getElementById('categoryList');
    let contactContainer = document.querySelector('.assignedContainer');
    let categoryContainer = document.querySelector('.categoryContainer');
    return { contactContainer, contactList, categoryContainer, categoryList };
  }