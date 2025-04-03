/**
 * Deletes a task by its ID, removes it from Firebase, reloads the tasks, 
 * and updates the UI accordingly.
 *
 * @async
 * @function deleteTask
 * @param {string} taskId - The unique identifier of the task to be deleted.
 * @returns {Promise<void>} - A promise that resolves when the task is deleted and the UI is updated.
 */
async function deleteTask(taskId) {
    let id = tasks.findIndex((task) => task.id == taskId);
    let path = `/tasks/${tasks[id].id}`;
    await deleteDataFromFirebase(path);
    await loadTasks();
    renderTasks();
    document.getElementById("openTaskPopupDiv").innerHTML = "";
    closeTaskCardPopUp();
  }
  
  /**
   * Updates the progress of a task's subtasks and reflects the changes in the UI.
   * 
   * This function updates the completion status of subtasks for a given task based on the state
   * of the corresponding checkboxes in the DOM. It also updates the progress bar, saves the task
   * to Firebase, and re-renders the tasks.
   * 
   * @async
   * @function
   * @param {string} taskId - The unique identifier of the task to update.
   * @returns {Promise<void>} Resolves when the task is successfully saved and the UI is updated.
   */
  async function updateSteps(taskId) {
    let task = tasks.find((t) => t.id === taskId);
    if (!task || !task.subTasks) {return;}
  
    const checkboxes = document.querySelectorAll(`#taskPopUp[data-task-id='${taskId}'] .step input[type='checkbox']`);
    if (!checkboxes.length) {return;}
    let checkedCount = 0;
    checkboxes.forEach((checkbox, index) => {
      if (task.subTasks[index]) {
        task.subTasks[index].completed = checkbox.checked;
        if (checkbox.checked) {
          checkedCount++;}}
        });
  
    const progressBar = document.getElementById(`progressBar-${taskId}`);
    progressBarStatus(progressBar, checkedCount, task, taskId);
    await saveTaskToFirebase(task);
    renderTasks();
  }
  
  /**
   * Updates the progress bar and the subtasks count display for a given task.
   *
   * @param {HTMLElement} progressBar - The progress bar element to update.
   * @param {number} checkedCount - The number of completed subtasks.
   * @param {Object} task - The task object containing subtasks.
   * @param {string} taskId - The unique identifier of the task.
   */
  function progressBarStatus(progressBar, checkedCount, task, taskId) {
    if (progressBar) {
      const progressPercentage = (checkedCount / task.subTasks.length) * 100;
      progressBar.style.width = `${progressPercentage}%`;
    }
    const subtasksAmount = document.getElementById(`subtasksAmount-${taskId}`);
    if (subtasksAmount) {
      subtasksAmount.textContent = `${checkedCount}/${task.subTasks.length} Subtasks`;
    }
  }
  
  /**
   * Saves a task object to Firebase Realtime Database.
   *
   * @async
   * @function saveTaskToFirebase
   * @param {Object} task - The task object to be saved.
   * @param {string} task.id - The unique identifier for the task.
   * @throws {Error} Throws an error if the request to Firebase fails.
   * @returns {Promise<void>} A promise that resolves when the task is successfully saved.
   */
  async function saveTaskToFirebase(task) {
    try {
      const response = await fetch(
        `https://join-7f1d9-default-rtdb.europe-west1.firebasedatabase.app/tasks/${task.id}.json`,
        {
          method: "PUT",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(task),
        }
      );
  
      if (!response.ok) throw new Error("Fehler beim Speichern in Firebase!");
    } catch (error) {
      console.error("Fehler:", error);
    }
  }
  
  /**
   * Moves a task to the next column based on the specified direction.
   *
   * @async
   * @function moveTaskToNextColumn
   * @param {string} taskId - The unique identifier of the task to be moved.
   * @param {number} direction - The direction to move the task. Use 1 for forward and -1 for backward.
   * @param {Event} event - The event object to stop propagation.
   * @returns {Promise<void>} Resolves when the task has been updated and the UI re-rendered.
   *
   * @description
   * This function updates the column and status of a task based on the direction provided.
   * It ensures the task remains within valid column boundaries and updates the data in Firebase.
   * After updating, it re-renders the tasks to reflect the changes in the UI.
   */
  async function moveTaskToNextColumn(taskId, direction, event) {
    event.stopPropagation();
  
    let task = tasks.find((t) => t.id === taskId);
    if (!task) return;
  
    let currentIndex = columnOrder.indexOf(task.columnTitles);
    let newIndex = currentIndex + direction;
    if (newIndex >= 0 && newIndex < columnOrder.length) {
      let newColumnTitle = columnOrder[newIndex];
      task.columnTitles = newColumnTitle;
      task.status = newColumnTitle;
      await patchDataToFirebase(`tasks/${taskId}`, {
        columnTitles: newColumnTitle,
        status: newColumnTitle,
      });
  
      renderTasks();
    }
  }
  
  /**
   * Asynchronously creates a new task by gathering input values from the DOM, 
   * constructing a task object, and sending it to Firebase. After the task is 
   * created, it reloads the tasks and resets the task creation popup.
   *
   * @async
   * @function createTaskBtn
   * @returns {Promise<void>} A promise that resolves when the task is created 
   * and the UI is updated.
   *
   * @throws {Error} If there is an issue with posting data to Firebase.
   *
   * @description
   * This function performs the following steps:
   * 1. Retrieves input values for the task (title, description, due date, category, etc.).
   * 2. Constructs a task object with the gathered data.
   * 3. Sends the task object to Firebase using the `postDataToFirebase` function.
   * 4. Reloads the tasks by calling `loadTasks`.
   * 5. Closes and resets the task creation popup.
   * 6. Reloads the page to reflect the changes.
   */
  async function createTaskBtn() {
    if (!validateForm()) {
      return; 
    }
    let title = document.getElementById("titleInput").value;
    let description = document.getElementById("descriptionTextarea").value;
    let dueDate = document.getElementById("date").value;
    let category = document.getElementById("dropdownCategory").innerText;
    selectedContacts = Array.from(selectedContacts);
    let priority = prioCategory();
  
    await creatingTaskBtn(title, description, dueDate, priority, category);
  
    await loadTasks();
    closeAddTaskPopUp();
    showAddTaskPopup();
    location.reload();
  }
  
async function creatingTaskBtn(title, description, dueDate, priority, category) {
  let data = {
    columnTitles: "To Do", title, description, dueDate, priority, subTasks,
    subTasks: subTasks.map((subTask) => ({ description: subTask.description, completed: subTask.completed ?? false, })),
    category, users: selectedContacts,
  };

  try {
    await postDataToFirebase("tasks/", data);
  } catch (error) {
    console.error(error);
  }
}

  /**
   * Determines the priority category based on the CSS class of the priority elements.
   *
   * @returns {string} The priority category as a string: "Urgent", "Medium", or "Low".
   */
  function prioCategory() {
    if (!validateForm()) {
      return; 
    }
    let prioUrgentEdit = document.getElementById("prioUrgentEdit");
    let prioMediumEdit = document.getElementById("prioMediumEdit");
    let prioLowEdit = document.getElementById("prioLowEdit");
  
    let priority = "";
  
    priority = checkPrioStatus(prioUrgentEdit, priority, prioMediumEdit, prioLowEdit);
    return priority;
  }
  
function checkPrioStatus(prioUrgentEdit, priority, prioMediumEdit, prioLowEdit) {
  if (prioUrgentEdit.classList.contains("prioUrgentRed")) {
    priority = "Urgent";
  } else if (prioMediumEdit.classList.contains("prioMediumYellow")) {
    priority = "Medium";
  } else if (prioLowEdit.classList.contains("prioLowGreen")) {
    priority = "Low";
  }
  return priority;
}

  /**
   * Asynchronously creates a new task and assigns it to the "To Do" column.
   * 
   * This function gathers input values from the DOM, constructs a task object,
   * and sends it to Firebase. It also reloads tasks and refreshes the page
   * after the task is created.
   * 
   * @async
   * @function
   * @throws {Error} If there is an issue with posting data to Firebase.
   */
  async function createTaskPlusToDoBtn() {
    if (!validateForm()) {
      return; 
    }
    let title = document.getElementById("titleInput").value;
    let description = document.getElementById("descriptionTextarea").value;
    let dueDate = document.getElementById("date").value;
    let category = document.getElementById("dropdownCategory").innerText;
    selectedContacts = Array.from(selectedContacts);
    let priority = prioCategory();
  
    await creatingTaskToDo(title, description, dueDate, priority, category);
  
    await loadTasks();
    closeAddTaskPopUpToDo();
    location.reload();
  }
  
async function creatingTaskToDo(title, description, dueDate, priority, category) {
  let data = {
    columnTitles: "To Do", title, description, dueDate, priority, subTasks,
    subTasks: subTasks.map((subTask) => ({ description: subTask.description, completed: subTask.completed ?? false, })),
    category, users: selectedContacts,
  };

  try {
    await postDataToFirebase("tasks/", data);
  } catch (error) {
    console.error(error);
  }
}

  /**
   * Asynchronously creates a new task with the "In Progress" status and posts it to Firebase.
   * The task details are retrieved from the DOM elements, including title, description, due date,
   * category, priority, and selected contacts. Subtasks are also included in the task data.
   * After successfully posting the task, the function reloads the tasks, closes the "Add Task" popup,
   * and refreshes the page.
   *
   * @async
   * @function
   * @throws {Error} Logs an error to the console if the Firebase post operation fails.
   */
  async function createTaskPlusInProgressBtn() {
    if (!validateForm()) {
      return; 
    }
    let title = document.getElementById("titleInput").value;
    let description = document.getElementById("descriptionTextarea").value;
    let dueDate = document.getElementById("date").value;
    let category = document.getElementById("dropdownCategory").innerText;
    selectedContacts = Array.from(selectedContacts);
    let priority = prioCategory();
  
    await creatingTaskProgress(title, description, dueDate, priority, category);
  
    await loadTasks();
    closeAddTaskPopUpInProgress();
    location.reload();
  }
  
async function creatingTaskProgress(title, description, dueDate, priority, category) {
  let data = {
    columnTitles: "In Progress", title, description, dueDate, priority, subTasks,
    subTasks: subTasks.map((subTask) => ({ description: subTask.description, completed: subTask.completed ?? false, })),
    category, users: selectedContacts,
  };

  try {
    await postDataToFirebase("tasks/", data);
  } catch (error) {
    console.error(error);
  }
}

  /**
   * Asynchronously creates a new task with the "Await Feedback" column title and saves it to Firebase.
   * The task includes details such as title, description, due date, category, priority, subtasks, and assigned users.
   * After saving, it reloads the tasks, closes the "Add Task" popup, and refreshes the page.
   *
   * @async
   * @function createTaskPlusAwaitFeedbackBtn
   * @returns {Promise<void>} Resolves when the task is successfully created and the UI is updated.
   * @throws {Error} Logs an error to the console if the Firebase operation fails.
   */
  async function createTaskPlusAwaitFeedbackBtn() {
    if (!validateForm()) {
      return; 
    }
    let title = document.getElementById("titleInput").value;
    let description = document.getElementById("descriptionTextarea").value;
    let dueDate = document.getElementById("date").value;
    let category = document.getElementById("dropdownCategory").innerText;
    selectedContacts = Array.from(selectedContacts);
    let priority = prioCategory();
  
    await creatingTaskFeedback(title, description, dueDate, priority, category);
  
    await loadTasks();
    closeAddTaskPopUpAwaitFeedback();
    location.reload();
  }
  
async function creatingTaskFeedback(title, description, dueDate, priority, category) {
  let data = {
    columnTitles: "Await Feedback", title, description, dueDate, priority, subTasks,
    subTasks: subTasks.map((subTask) => ({ description: subTask.description, completed: subTask.completed ?? false, })),
    category, users: selectedContacts,
  };

  try {
    await postDataToFirebase("tasks/", data);
  } catch (error) {
    console.error(error);
  }
}

  /**
   * Handles the addition of a new subtask through a popup input field.
   * 
   * This function retrieves the value from the input field with the ID "subTaskPopUp",
   * validates it to ensure it is not empty, and creates a new subtask object with a 
   * unique ID and trimmed description. If the subtask description does not already 
   * exist in the `subTasks` array, it adds the new subtask to the array. Afterward, 
   * it re-renders the subtask list and clears the input field.
   * 
   * @function
   * @returns {void}
   */
  function addSubTaskPopUp() {
    let subTaskInput = document.getElementById("subTaskPopUp");
  
    if (subTaskInput.value.trim() !== "") {
      let newSubtask = {
        id: crypto.randomUUID(),
        description: subTaskInput.value.trim(),
      };
      if (!subTasks.some((sub) => sub.description === newSubtask.description)) {
        subTasks.push(newSubtask);
      }
      
      renderSubTaskList();
      subTaskInput.value = "";
    }
  }
  
  /**
   * Displays a popup element with the ID "AddTaskPopupDiv" by removing the "d-none" class,
   * making it visible. The popup will automatically hide after 1.5 seconds by re-adding
   * the "d-none" class. If the element is not found, an error is logged to the console.
   */
  function showAddTaskPopup() {
      const addTaskPopup = document.getElementById("AddTaskPopupDiv");
  
      if (addTaskPopup) {
        addTaskPopup.classList.remove("d-none")
        setTimeout(() => {
          addTaskPopup.classList.add("d-none");
        }, 1500);
      } else {
        console.error(
          "Das Element mit der ID 'addTaskPopup' wurde nicht gefunden!"
        );
      }
  }
  
  /**
   * Hides the contact list popup when clicking outside of it.
   * 
   * This function checks if the click event occurred outside the contact list popup 
   * and its container. If so, it hides the contact list by adding the `hidden` class 
   * and removing the `d-flex` class. If the required elements do not exist, the function 
   * exits early.
   * 
   * @function hideContactList
   * @param {Event} event - The click event that triggers the function.
   */
  function hideContactList(event) {
    let contactList = document.getElementById('assignedContactsListPopUp');
    let contactContainer = document.querySelector('.assignedContainer');
  
    if (!contactList || !contactContainer) return;
  
    if (!contactContainer.contains(event.target) && !contactList.contains(event.target)) {
        contactList.classList.add('hidden');
        contactList.classList.remove('d-flex');
    }
  }
  
  document.addEventListener('click', hideContactList);  