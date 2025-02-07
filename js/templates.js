function renderAddTaskPoup() {
  return /*html*/ `
<div class="add-edit-popup-task-div">
        <div class="addTaskContent">
        <button onclick="closeAddTaskPopUp()">
          <img src="/assets/icons/cancel.png" alt="">
          </button>
      <div class="headlineDiv"><h1>Add Task</h1></div>
      <form>
        <div class="formParts">
          <section class="formPartLeft">
            <label for="title">Title<span class="required">*</span> </label>
            <input id="titleInput" type="text" placeholder="Enter a title" />
            <br />
            <label for="description">Description</label>
            <textarea id="descriptionTextarea" rows="5" placeholder="Enter a Description"></textarea>
            <br />
            <label for="contactSelection">Assigned to</label>
            <select class="assignedTo" name="contactList" id="contactList">
              <!-- <option value disabled selected hidden>Select contacts to assign</option>
              <option value=""></option> -->
            </select>
          </section>
          <hr />
          <section class="formPartRight">
            <label for="dueDate">Due Date<span class="required">*</span> </label>
            <input type="date" id="date" />
            <br />
            <label for="prio">Prio</label>
            <section id="prio" class="prioContent">
              <button type="button" id="prioUrgentEdit" class="prioBtn" onclick="prioUrgent()">
                Urgent
                <img id="urgentImg" src="/assets/icons/urgentRed.png" alt="" />
              </button>
              <button type="button" id="prioMediumEdit" class="prioBtn" onclick="prioMedium()">
                Medium
                <img id="mediumImg" src="/assets/icons/mediumYellow.png" alt="" />
              </button>
              <button type="button" id="prioLowEdit" class="prioBtn" onclick="prioLow()">
                Low <img id="lowImg" src="/assets/icons/lowGreen.png" alt="" />
              </button>
            </section>
            <br />
            <label for="category">Category<span class="required">*</span> </label>
            <select id="category">
              <option value disabled selected hidden>Select Task Category</option>
              <option value="Technical Task">Technical Task</option>
              <option value="User Story">User Story</option>
            </select>
            <br />
            <label for="subtask">Subtasks</label>
            <div id="addSubTask">
              <input id="subTask" class="addSubTask" placeholder="Add new subtask" type="text" />
              <img onclick="addSubTask()" style="cursor: pointer" src="/assets/icons/Subtasks_plus.png" alt="" />
            </div>
            <ul id="subTaskList"></ul>
          </section>
        </div>
        <div class="taskFormButtons">
          <p>
            <span class="required">*</span>
            This field is required
          </p>
          <div class="btnSection">
            <button onclick="resetAddTask()" type="reset" class="clearBtn">
              Clear <img src="/assets/icons/cancel.png" alt="" />
            </button>
            <button onclick="createtTaskBtn()" class="button">Create Task <img src="/assets/icons/check.png" alt="" /></button>
          </div>
        </div>
      </form>
    </div>
        </div>
    `;
}
