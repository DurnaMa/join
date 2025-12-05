/**
 * Renders the HTML structure for the "Add Task" popup button.
 *
 * This function returns a string containing the HTML markup for a popup form
 * that allows users to add a new task. The form includes fields for title,
 * description, assigned contacts, due date, priority, category, and subtasks.
 * It also provides buttons for clearing the form and creating a task.
 *
 * The popup includes the following features:
 * - Title input field (required)
 * - Description textarea
 * - Assigned contacts selection with dropdown
 * - Due date input field (required)
 * - Priority selection (Urgent, Medium, Low)
 * - Category selection with dropdown (required)
 * - Subtask input and list
 * - Responsive design with required field indicators
 *
 * @returns {string} The HTML string for the "Add Task" popup.
 */
function renderAddTaskPoupBtn() {
    return /*html*/ `
  <div class="shadow-div"></div>
  <div class="add-edit-popup-task-div">
    <div class="addTaskContent">
    <div class="addTaskClose"><img onclick="closeAddTaskPopUp()" src="../assets/icons/close.png" alt=""></div>
        <div class="headlineDiv"><h1>Add Task</h1></div>
        <form onsubmit="return false">
          <div class="formParts">
            <section class="formPartLeft">
              <label for="title">Title<span class="required">*</span> </label>
              <input id="titleInput" type="text" placeholder="Enter a title" />
              <span id="titleError" class="text-custom"></span>
              <br />
              <label for="description">Description</label>
              <textarea id="descriptionTextarea" rows="5" placeholder="Enter a Description"></textarea>
              <span id="descriptionTextareaError" class="text-custom"></span>
              <br />
              <label for="contactSelection">Assigned to</label>
              <div onclick="contactList()" class="assignedContainer">
                <span>Select contacts to assign</span>
                <img id="assignedArrowDown" src="../assets/icons/arrow_drop_down.png" alt="" />
                <img id="assignedArrowUp" class="d-none" src="../assets/icons/arrow_drop_up.png" alt="" />
              </div>
              <div id="assignedContactsList" class="hidden"></div>
              <div id="selectedContactsDisplay" class="selectedContactsContainer"></div>
            </section>
            <hr class="hrBoardPopUp" />
            <section class="formPartRight">
              <label for="dueDate">Due Date<span class="required">*</span> </label>
              <input type="date" id="date" onkeydown="return false;"/>
              <span id="dateError" class="text-custom"></span>
              <br />
              <label for="prio">Prio</label>
              <section id="prio" class="prioContent">
                <button type="button" id="prioUrgentEdit" class="prioBtn" onclick="prioUrgent()">
                  Urgent
                  <img id="urgentImg" src="../assets/icons/urgentRed.png" alt="" />
                </button>
                <button type="button" id="prioMediumEdit" class="prioBtn" onclick="prioMedium()">
                  Medium
                  <img id="mediumImg" src="../assets/icons/mediumYellow.png" alt="" />
                </button>
                <button type="button" id="prioLowEdit" class="prioBtn" onclick="prioLow()">
                  Low <img id="lowImg" src="../assets/icons/lowGreen.png" alt="" />
                </button>
              </section>
              <br />
              <label for="category">Category<span class="required">*</span> </label>
              <div onclick="categorytList()" class="categoryContainer" id="category">
                <span id="dropdownCategory" class="">Select Task Category</span>
                <img id="categoryArrowDown" src="../assets/icons/arrow_drop_down.png" alt="" />
                <img id="categoryArrowUp" class="d-none" src="../assets/icons/arrow_drop_up.png" alt="" />
                <div id="categoryList" class="hidden"></div>
              </div>
              <span id="categoryError" class="text-custom"></span>
              <br />
              <label for="subtask">Subtasks</label>
              <div id="addSubTask">
                <input id="subTaskPopUp" class="addSubTask" placeholder="Add new subtask" type="text"
                onkeydown="if(event.key === 'Enter') { event.preventDefault(); addSubTaskPopUp(); }">
                <img onclick="addSubTaskPopUp()" style="cursor: pointer" src="../assets/icons/Subtasks_plus.png" alt="" />
              </div>
              <ul id="subTaskList" class="subTaskList"></ul>
              <p class="requiredInfoResponsive">
              <span class="required">*</span>
              This field is required
            </p>
            </section>
          </div>
          <div class="taskFormButtons">
            <p class="requiredInfo">
              <span class="required">*</span>
              This field is required
            </p>
            <div class="btnSection">
              <button type="reset" class="clearBtn" onclick="clearForm()">Clear <img src="../assets/icons/cancel.png" alt="" /></button>
              <button type="button" onclick="createTaskBtn()" class="button">
                Create Task <img src="../assets/icons/check.png" alt="" />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
      `;
  }
  
  /**
   * Renders the HTML structure for the "Add Task" popup in the To-Do application.
   * This function returns a string containing the HTML markup for the popup,
   * which includes input fields for task details, priority selection, category selection,
   * and subtasks, along with buttons for clearing or creating the task.
   *
   * @returns {string} The HTML string for the "Add Task" popup.
   */
  function renderAddTaskPopupToDoPlus() {
    return /*html*/ `
  <div class="shadow-div"></div>
  <div class="add-edit-popup-task-div">
    <div class="addTaskContent">
    <div class="addTaskClose"><img onclick="closeAddTaskPopUpToDo()" src="../assets/icons/close.png" alt=""></div>
        <div class="headlineDiv"><h1>Add Task</h1></div>
        <form onsubmit="return false">
          <div class="formParts">
            <section class="formPartLeft">
              <label for="title">Title<span class="required">*</span> </label>
              <input id="titleInput" type="text" placeholder="Enter a title" />
              <span id="titleError" class="text-custom"></span>
              <br />
              <label for="description">Description</label>
              <textarea id="descriptionTextarea" rows="5" placeholder="Enter a Description"></textarea>
              <span id="descriptionTextareaError" class="text-custom"></span>
              <br />
              <label for="contactSelection">Assigned to</label>
              <div onclick="contactList()" class="assignedContainer">
                <span>Select contacts to assign</span>
                <img id="assignedArrowDown" src="../assets/icons/arrow_drop_down.png" alt="" />
                <img id="assignedArrowUp" class="d-none" src="../assets/icons/arrow_drop_up.png" alt="" />
              </div>
              <div id="assignedContactsList" class="hidden"></div>
              <div id="selectedContactsDisplay" class="selectedContactsContainer"></div>
            </section>
            <hr class="hrBoardPopUp" />
            <section class="formPartRight">
              <label for="dueDate">Due Date<span class="required">*</span> </label>
              <input type="date" id="date" onkeydown="return false;"/>
              <span id="dateError" class="text-custom"></span>
              <br />
              <label for="prio">Prio</label>
              <section id="prio" class="prioContent">
                <button type="button" id="prioUrgentEdit" class="prioBtn" onclick="prioUrgent()">
                  Urgent
                  <img id="urgentImg" src="../assets/icons/urgentRed.png" alt="" />
                </button>
                <button type="button" id="prioMediumEdit" class="prioBtn" onclick="prioMedium()">
                  Medium
                  <img id="mediumImg" src="../assets/icons/mediumYellow.png" alt="" />
                </button>
                <button type="button" id="prioLowEdit" class="prioBtn" onclick="prioLow()">
                  Low <img id="lowImg" src="../assets/icons/lowGreen.png" alt="" />
                </button>
              </section>
              <br />
              <label for="category">Category<span class="required">*</span> </label>
              <div onclick="categorytList()" class="categoryContainer" id="category">
                <span id="dropdownCategory" class="">Select Task Category</span>
                <img id="categoryArrowDown" src="../assets/icons/arrow_drop_down.png" alt="" />
                <img id="categoryArrowUp" class="d-none" src="../assets/icons/arrow_drop_up.png" alt="" />
                <div id="categoryList" class="hidden"></div>
              </div>
              <span id="categoryError" class="text-custom"></span>
              <br />
              <label for="subtask">Subtasks</label>
              <div id="addSubTask">
                <input id="subTaskPopUp" class="addSubTask" placeholder="Add new subtask" type="text"
                onkeydown="if(event.key === 'Enter') { event.preventDefault(); addSubTaskPopUp(); }">
                <img onclick="addSubTaskPopUp()" style="cursor: pointer" src="../assets/icons/Subtasks_plus.png" alt="" />
              </div>
              <ul id="subTaskList" class="subTaskList"></ul>
              <p class="requiredInfoResponsive">
              <span class="required">*</span>
              This field is required
            </p>
            </section>
          </div>
          <div class="taskFormButtons">
            <p class="requiredInfo">
              <span class="required">*</span>
              This field is required
            </p>
            <div class="btnSection">
              <button type="reset" class="clearBtn">Clear <img src="../assets/icons/cancel.png" alt="" /></button>
              <button type="button" onclick="createTaskPlusToDoBtn()" class="button">
                Create Task <img src="../assets/icons/check.png" alt="" />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
      `;
  }
  
  /**
   * Renders the HTML structure for the "Add Task" popup in the "In Progress" section.
   * This function returns a string containing the HTML markup for the popup,
   * which includes input fields for task details, priority selection, category selection,
   * and subtasks, as well as buttons for clearing the form or creating the task.
   *
   * @returns {string} The HTML string for the "Add Task" popup.
   */
  function renderAddTaskPopupInProgressPlus() {
    return /*html*/ `
  <div class="shadow-div"></div>
  <div class="add-edit-popup-task-div">
    <div class="addTaskContent">
    <div class="addTaskClose"><img onclick="closeAddTaskPopUpInProgress()" src="../assets/icons/close.png" alt=""></div>
        <div class="headlineDiv"><h1>Add Task</h1></div>
        <form onsubmit="return false">
          <div class="formParts">
            <section class="formPartLeft">
              <label for="title">Title<span class="required">*</span> </label>
              <input id="titleInput" type="text" placeholder="Enter a title" />
              <span id="titleError" class="text-custom"></span>
              <br />
              <label for="description">Description</label>
              <textarea id="descriptionTextarea" rows="5" placeholder="Enter a Description"></textarea>
              <span id="descriptionTextareaError" class="text-custom"></span>
              <br />
              <label for="contactSelection">Assigned to</label>
              <div onclick="contactList()" class="assignedContainer">
                <span>Select contacts to assign</span>
                <img id="assignedArrowDown" src="../assets/icons/arrow_drop_down.png" alt="" />
                <img id="assignedArrowUp" class="d-none" src="../assets/icons/arrow_drop_up.png" alt="" />
              </div>
              <div id="assignedContactsList" class="hidden"></div>
              <div id="selectedContactsDisplay" class="selectedContactsContainer"></div>
            </section>
            <hr class="hrBoardPopUp" />
            <section class="formPartRight">
              <label for="dueDate">Due Date<span class="required">*</span> </label>
              <input type="date" id="date" onkeydown="return false;"/>
              <span id="dateError" class="text-custom"></span>
              <br />
              <label for="prio">Prio</label>
              <section id="prio" class="prioContent">
                <button type="button" id="prioUrgentEdit" class="prioBtn" onclick="prioUrgent()">
                  Urgent
                  <img id="urgentImg" src="../assets/icons/urgentRed.png" alt="" />
                </button>
                <button type="button" id="prioMediumEdit" class="prioBtn" onclick="prioMedium()">
                  Medium
                  <img id="mediumImg" src="../assets/icons/mediumYellow.png" alt="" />
                </button>
                <button type="button" id="prioLowEdit" class="prioBtn" onclick="prioLow()">
                  Low <img id="lowImg" src="../assets/icons/lowGreen.png" alt="" />
                </button>
              </section>
              <br />
              <label for="category">Category<span class="required">*</span> </label>
              <div onclick="categorytList()" class="categoryContainer" id="category">
                <span id="dropdownCategory" class="">Select Task Category</span>
                <img id="categoryArrowDown" src="../assets/icons/arrow_drop_down.png" alt="" />
                <img id="categoryArrowUp" class="d-none" src="../assets/icons/arrow_drop_up.png" alt="" />
                <div id="categoryList" class="hidden"></div>
              </div>
              <span id="categoryError" class="text-custom"></span>
              <br />
              <label for="subtask">Subtasks</label>
              <div id="addSubTask">
                <input id="subTaskPopUp" class="addSubTask" placeholder="Add new subtask" type="text"
                onkeydown="if(event.key === 'Enter') { event.preventDefault(); addSubTaskPopUp(); }">
                <img onclick="addSubTaskPopUp()" style="cursor: pointer" src="../assets/icons/Subtasks_plus.png" alt="" />
              </div>
              <ul id="subTaskList" class="subTaskList"></ul>
              <p class="requiredInfoResponsive">
              <span class="required">*</span>
              This field is required
            </p>
            </section>
          </div>
          <div class="taskFormButtons">
            <p class="requiredInfo">
              <span class="required">*</span>
              This field is required
            </p>
            <div class="btnSection">
              <button type="reset" class="clearBtn">Clear <img src="../assets/icons/cancel.png" alt="" /></button>
              <button type="button" onclick="createTaskPlusInProgressBtn()" class="button">
                Create Task <img src="../assets/icons/check.png" alt="" />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
      `;
  }
  
  /**
   * Renders the HTML structure for the "Add Task" popup with Await Feedback functionality.
   *
   * This function returns a string containing the HTML markup for a popup form
   * that allows users to add a new task. The form includes fields for title, description,
   * assigned contacts, due date, priority, category, and subtasks. It also provides
   * buttons for clearing the form and creating the task.
   *
   * @returns {string} The HTML string for the "Add Task" popup.
   */
  function renderAddTaskPopupAwaitFeedbackPlus() {
    return /*html*/ `
  <div class="shadow-div"></div>
  <div class="add-edit-popup-task-div">
    <div class="addTaskContent">
    <div class="addTaskClose"><img onclick="closeAddTaskPopUpAwaitFeedback()" src="../assets/icons/close.png" alt=""></div>
        <div class="headlineDiv"><h1>Add Task</h1></div>
        <form onsubmit="return false">
          <div class="formParts">
            <section class="formPartLeft">
              <label for="title">Title<span class="required">*</span> </label>
              <input id="titleInput" type="text" placeholder="Enter a title" />
              <span id="titleError" class="text-custom"></span>
              <br />
              <label for="description">Description</label>
              <textarea id="descriptionTextarea" rows="5" placeholder="Enter a Description"></textarea>
              <span id="descriptionTextareaError" class="text-custom"></span>
              <br />
              <label for="contactSelection">Assigned to</label>
              <div onclick="contactList()" class="assignedContainer">
                <span>Select contacts to assign</span>
                <img id="assignedArrowDown" src="../assets/icons/arrow_drop_down.png" alt="" />
                <img id="assignedArrowUp" class="d-none" src="../assets/icons/arrow_drop_up.png" alt="" />
              </div>
              <div id="assignedContactsList" class="hidden"></div>
              <div id="selectedContactsDisplay" class="selectedContactsContainer"></div>
            </section>
            <hr class="hrBoardPopUp" />
            <section class="formPartRight">
              <label for="dueDate">Due Date<span class="required">*</span> </label>
              <input type="date" id="date" onkeydown="return false;"/>
              <span id="dateError" class="text-custom"></span>
              <br />
              <label for="prio">Prio</label>
              <section id="prio" class="prioContent">
                <button type="button" id="prioUrgentEdit" class="prioBtn" onclick="prioUrgent()">
                  Urgent
                  <img id="urgentImg" src="../assets/icons/urgentRed.png" alt="" />
                </button>
                <button type="button" id="prioMediumEdit" class="prioBtn" onclick="prioMedium()">
                  Medium
                  <img id="mediumImg" src="../assets/icons/mediumYellow.png" alt="" />
                </button>
                <button type="button" id="prioLowEdit" class="prioBtn" onclick="prioLow()">
                  Low <img id="lowImg" src="../assets/icons/lowGreen.png" alt="" />
                </button>
              </section>
              <br />
              <label for="category">Category<span class="required">*</span> </label>
              <div onclick="categorytList()" class="categoryContainer" id="category">
                <span id="dropdownCategory" class="">Select Task Category</span>
                <img id="categoryArrowDown" src="../assets/icons/arrow_drop_down.png" alt="" />
                <img id="categoryArrowUp" class="d-none" src="../assets/icons/arrow_drop_up.png" alt="" />
                <div id="categoryList" class="hidden"></div>
              </div>
              <span id="categoryError" class="text-custom"></span>
              <br />
              <label for="subtask">Subtasks</label>
              <div id="addSubTask">
                <input id="subTaskPopUp" class="addSubTask" placeholder="Add new subtask" type="text"
                onkeydown="if(event.key === 'Enter') { event.preventDefault(); addSubTaskPopUp(); }">
                <img onclick="addSubTaskPopUp()" style="cursor: pointer" src="../assets/icons/Subtasks_plus.png" alt="" />
              </div>
              <ul id="subTaskList" class="subTaskList"></ul>
              <p class="requiredInfoResponsive">
              <span class="required">*</span>
              This field is required
            </p>
            </section>
          </div>
          <div class="taskFormButtons">
            <p class="requiredInfo">
              <span class="required">*</span>
              This field is required
            </p>
            <div class="btnSection">
              <button type="reset" class="clearBtn">Clear <img src="../assets/icons/cancel.png" alt="" /></button>
              <button type="button" onclick="createTaskPlusAwaitFeedbackBtn()" class="button">
                Create Task <img src="../assets/icons/check.png" alt="" />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
      `;
  }