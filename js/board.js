let todos = [
  {
    id: 1,
    'columnTitles': "To do",
    category: "User story",
    title: "Task 1",
    description: "Task 1 description",
    subtasks: [],
    users: [],
    prio: [],
  },
  {
    id: 2,
    'columnTitles': "In progress",
    category: "Technical task",
    title: "Task 2",
    description: "Task 2 description",
    subtasks: [],
    users: [],
    prio: [],
  },
  {
    id: 3,
    'columnTitles': "Await feedback",
    category: [],
    title: "Task 3",
    description: "Task 3 description",
    subtasks: [],
    users: [],
    prio: [],
  },
  {
    id: 4,
    'columnTitles': "Done",
    category: [],
    title: "Task 4",
    description: "Task 4 description",
    subtasks: [],
    users: [],
    prio: [],
  },
  {
  id: 5,
  'columnTitles': "In progress",
  category: "User story",
  title: "Task 5",
  description: "Task 5 description",
  subtasks: [],
  users: [],
  prio: [],
}
];

let currentDraggedElement;
let currentSelectedTask;
let currentSelectedColumn = "";


function initBord() {
  renderTasks();
  //updateTasks();
  //updateTasksTodo();
  //updateTasksProgress();
}

function renderTasks() {
  for (let index = 0; index < todos.length; index++) {
    const element = todos[index];

    if (element.columnTitles == "To do") {
      generateTaskCardTodo(element);
    }

    if (element.columnTitles == "In progress") {
      generateTaskCardProgress(element);
    }

    if (element.columnTitles == "Await feedback") {
      generateTaskCardAwaitFeedback(element);
    }

    if (element.columnTitles == "Done") {
      generateTaskCardDone(element);
    }
  }
}

/*async function updateTasks() {
  let toDo = todos.filter(t => t['columnTitles'] == "To do");
  let inProgress = todos.filter(t => t['columnTitles'] == "In progress");
  let awaitFeedback = todos.filter(t => t['columnTitles'] == "Await feedback");
  let done = todos.filter(t => t['columnTitles'] == "Done");
*/
  //document.getElementById("todo").innerHTML = '';
  //document.getElementById("inprogress").innerHTML = '';
  //document.getElementById("awaitfeedback").innerHTML = '';
  //document.getElementById("done").innerHTML = '';

  /*for (let index = 0; index < toDo.length; index++) {
    const element = toDo[index];
    document.getElementById('todo').innerHTML += generateTaskCardTodo(element);
  }

  for (let index = 0; index < inProgress.length; index++) {
    const element = inProgress[index];
    document.getElementById('inprogress').innerHTML += generateTaskCardProgress(element);
  }

  for (let index = 0; index < awaitFeedback.length; index++) {
    const element = awaitFeedback[index];
    document.getElementById('awaitfeedback').innerHTML += generateTaskCardAwaitFeedback(element);
  } 

  for (let index = 0; index < done.length; index++) {
    const element = done[index];
    document.getElementById('done').innerHTML += generateTaskCardDone(element);
  }*/

  /*for (let index = 0; index < todos.length; index++) {
    const element = todos[index];

    if (element['columnTitles'] == "To do") {
      document.getElementById('todo').innerHTML += generateTaskCardTodo(element);
    }

    if (element['columnTitles'] == "In progress") {
      document.getElementById('inprogress').innerHTML += generateTaskCardProgress(element);
    }

    if (element['columnTitles'] == "Await feedback") {
      document.getElementById('awaitfeedback').innerHTML += generateTaskCardAwaitFeedback(element);
    }

    if (element['columnTitles'] == "Done") {
      document.getElementById('done').innerHTML += generateTaskCardDone(element);
    }

  }*/
//}

  /*function updateTasksTodo() {
    let toDo = todos.filter(t => t['columnTitles'] == "To do");
  
    //document.getElementById("todo").innerHTML = '';
  
    for (let index = 0; index < toDo.length; index++) {
      const element = toDo[index];
      document.getElementById('todo').innerHTML += generateTaskCardTodo(element);
    }
  }

  function updateTasksProgress() {
    let inProgress = todos.filter(t => t['columnTitles'] == "In progress");
  
    //document.getElementById("inprogress").innerHTML = '';
  
    for (let index = 0; index < inProgress.length; index++) {
      const element = inProgress[index];
      document.getElementById('inprogress').innerHTML += generateTaskCardProgress(element);
    }
  }*/

  function generateTaskCardTodo(element) {
    let taskCardDiv = document.getElementById("todo");
    //columnContainer.innerHTML = "";

    let column = document.createElement("div");
    column.classList.add("column");
    //column.id = element.columnTitles;
    column.innerHTML = /*html*/ `
      <div class="task-card" id="${element.id}" draggable="true" ondragstart="drag(element) startDragging(${element['id']})">
        <h3>${element.title}</h3>
        <p>${element.description}</p>
      </div>
    `;
    taskCardDiv.appendChild(column);
  }

  function generateTaskCardProgress(element) {
    let taskCardDiv = document.getElementById("inprogress");
    //columnContainer.innerHTML = "";

    let column = document.createElement("div");
    column.classList.add("column");
    column.id = element.columnTitles;
    column.innerHTML = /*html*/ `
      <div class="task-card" id="${element.id}" draggable="true" ondragstart="drag(element) startDragging(${element['id']})">
        <h3>${element.title}</h3>
        <p>${element.description}</p>
      </div>
    `;
    taskCardDiv.appendChild(column);

    /*todos.forEach((todo) => {
      let column = document.createElement("div");
      column.classList.add("column");
      column.id = todo.columnTitles;
      column.innerHTML = /*html*/ /*`
        <div class="task-card" id="${todo.id}" draggable="true" ondragstart="startDragging(event)" ondragover="allowDrop(event)" ondrop="moveTo(event)">
          <h3>${todo.title}</h3>
          <p>${todo.description}</p>
        </div>
      `;
      taskCardDiv.appendChild(column);
    });*/
  }

  function generateTaskCardAwaitFeedback(element) {
    let taskCardDiv = document.getElementById("awaitfeedback");
    //columnContainer.innerHTML = "";

    let column = document.createElement("div");
    column.classList.add("column");
    column.id = element.columnTitles;
    column.innerHTML = /*html*/ `
      <div class="task-card" id="${element.id}" draggable="true" ondragstart="drag(element) startDragging(${element['id']})">
        <h3>${element.title}</h3>
        <p>${element.description}</p>
      </div>
    `;
    taskCardDiv.appendChild(column);
  }

  function generateTaskCardDone(element) {
    let taskCardDiv = document.getElementById("done");
    //columnContainer.innerHTML = "";

    let column = document.createElement("div");
    column.classList.add("column");
    column.id = element.columnTitles;
    column.innerHTML = /*html*/ `
      <div class="task-card" id="${element.id}" draggable="true" ondragstart="drag(element) startDragging(${element['id']})">
        <h3>${element.title}</h3>
        <p>${element.description}</p>
      </div>
    `;
    taskCardDiv.appendChild(column);
  }

/*function updateTasks() {
  let toDo = todos.filter(t => t['columnTitles'] == "To do");
  let inProgress = todos.filter(t => t['columnTitles'] == "In progress");
  let awaitFeedback = todos.filter(t => t['columnTitles'] == "Await feedback");
  let done = todos.filter(t => t['columnTitles'] == "Done");

  //document.getElementById("toDo").innerHTML = '';
  //document.getElementById("inProgress").innerHTML = '';
  //document.getElementById("awaitFeedback").innerHTML = '';
  //document.getElementById("done").innerHTML = '';

  for (let i = 0; i < toDo.length; i++) {
    let element = toDo[i];
    document.getElementById("toDo").innerHTML += generateTaskCardTodo(element);
  }

  for (let i = 0; i < inProgress.length; i++) {
    let element = inProgress[i];
    document.getElementById("inProgress").innerHTML += generateTaskCard(element);
  }

  for (let i = 0; i < awaitFeedback.length; i++) {
    let element = awaitFeedback[i];
    document.getElementById("awaitFeedback").innerHTML += generateTaskCard(element);
  }

  for (let i = 0; i < done.length; i++) {
    let element = done[i];
    document.getElementById("done").innerHTML += generateTaskCard(element);
  }
}
*/
/*function generateTaskCard(element) {
  let taskCardTodo = document.getElementById('todo');
  taskCardTodo.innerHTML = '';
 
  let taskCardTodoDiv = document.createElement("div");
  taskCardTodoDiv.classList.add("task");
  taskCardTodoDiv.id = element.columnTitles;
  taskCardTodoDiv.innerHTML = /*html*/ /*`
    <div class="task-card" id="${element.id}" draggable="true" ondragstart="drag(element)">
      <h3>${element.title}</h3>
      <p>${element.description}</p>
    </div>
  `;
  taskCardTodoDiv.appendChild(taskCardTodo);
}*/


function allowDrop(element) {
  element.preventDefault();
}

function drag(element) {
  element.dataTransfer.setData("text", element.target.id);
}

function drop(element) {
  element.preventDefault();
  let data = element.dataTransfer.getData("text");
  //let task = document.getElementById(data);
  //element.target.appendChild(task);
}

function highlight(id) {
  document.getElementById(id).classList.add('drag-area-highlight');
}

function removeHighlight(id) {
  document.getElementById(id).classList.remove('drag-area-highlight');
}


function startDragging(id) {
  currentDraggedElement = id;
}


function moveTo(columnTitles) {
  todos[currentDraggedElement]['columnTitles'] = columnTitles;
  updateTasks();
}

function createtTaskPlusTodo() {
  let title = document.getElementById("titleInput");
  let description = document.getElementById("descriptionTextarea");
  let columnTitles = document.getElementById("toDoId");
  title = titleInput.value;
  description = descriptionTextarea.value;
  columnTitles = columnTitles;


  let newTask = {
    id: todos.length + 1,
    columnTitles: columnTitles,
    category: [],
    title: title,
    description: description,
    subtasks: [],
    users: [],
    prio: [],
  };
  todos.push(newTask);
  updateTasks();
}

function createtTaskPlusProgress() {
  let title = document.getElementById("titleInput");
  let description = document.getElementById("descriptionTextarea");
  let columnTitles = document.getElementById("inProgressId");
  title = titleInput.value;
  description = descriptionTextarea.value;
  columnTitles = columnTitles;


  let newTask = {
    id: todos.length + 1,
    columnTitles: columnTitles,
    category: [],
    title: title,
    description: description,
    subtasks: [],
    users: [],
    prio: [],
  };
  todos.push(newTask);
  updateTasks();
}

function createtTaskPlusFeedback() {
  let title = document.getElementById("titleInput");
  let description = document.getElementById("descriptionTextarea");
  let columnTitles = document.getElementById("awaitFeedbackId");
  title = titleInput.value;
  description = descriptionTextarea.value;
  columnTitles = columnTitles;


  let newTask = {
    id: todos.length + 1,
    columnTitles: columnTitles,
    category: [],
    title: title,
    description: description,
    subtasks: [],
    users: [],
    prio: [],
  };
  todos.push(newTask);
  updateTasks();
}
/*
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
    subtasks: [],
    users: [],
    prio: [],
  };
  todos.push(newTask);
  closeAddTaskPopUp()
  renderTasks();
}

function startDragging(event) {
  currentDraggedElement = event.target;
}

function allowDrop(event) {
  event.preventDefault();
}

function moveTo(event) {
  event.preventDefault();
  event.target.appendChild(currentDraggedElement);  
}

function addTaskPopup() {
  let addNewTaskDiv = document.getElementById("addNewTaskDiv");
  addNewTaskDiv.classList.remove("d-none");
  addNewTaskDiv.innerHTML = renderAddTaskPoup();
}

*/
function addTaskPopupPlusTodo() {
  
  let addNewTaskDiv = document.getElementById("addNewTaskDiv");
  addNewTaskDiv.classList.remove("d-none");
  addNewTaskDiv.innerHTML = renderAddTaskPoupPlusTodo();
}

function addTaskPopupPlusProgress() {
  
  let addNewTaskDiv = document.getElementById("addNewTaskDiv");
  addNewTaskDiv.classList.remove("d-none");
  addNewTaskDiv.innerHTML = renderAddTaskPoupPlusProgress();
}

function addTaskPopupPlusFeedback() {
  
  let addNewTaskDiv = document.getElementById("addNewTaskDiv");
  addNewTaskDiv.classList.remove("d-none");
  addNewTaskDiv.innerHTML = renderAddTaskPoupPlusFeedback();
}


  //let currentSelectedColumn = document.getElementById("columnTitlesId");
  //currentSelectedColumn = currentSelectedColumn.value;

  //let currentSelectedColumn = document.getElementById("columnTitles");
  //currentSelectedColumn.innerHTML = "";

  /*if (currentSelectedColumn === "In Progress") {
    currentSelectedColumn = "In progress";
  } else if (currentSelectedColumn === "Await Feedback") {
    currentSelectedColumn = "Await feedback";    
  } else {
    currentSelectedColumn = "To do";
  }*/


  //let todo = todos;
  //let columnTitles = "";
  
  /*let ToDoId = document.getElementById("ToDoId");
  let InProgressId = document.getElementById("InProgressId");
  let AwaitFeedbackId = document.getElementById("AwaitFeedbackId");
  let addNewTaskDiv = document.getElementById("addNewTaskDiv");
  addNewTaskDiv.classList.remove("d-none");
  addNewTaskDiv.innerHTML = renderAddTaskPoup(event);*/

  /*if (ToDoId) {
    columnTitles = "To do";
    addNewTaskDiv.innerHTML = renderAddTaskPoup();
  } else if (InProgressId) {
    columnTitles = "In progress";
    addNewTaskDiv.innerHTML = renderAddTaskPoup();
  } else if (AwaitFeedbackId) {
    columnTitles = "Await feedback";
    addNewTaskDiv.innerHTML = renderAddTaskPoup();
  }*/

  /*if (id === ToDoId) {
    columnTitles = "To do";
    addNewTaskDiv.innerHTML = renderAddTaskPoup();
  } else if (id === InProgressId) {
    columnTitles = "In progress";
    addNewTaskDiv.innerHTML = renderAddTaskPoup();
  } else if (id === AwaitFeedbackId) {
    columnTitles = "Await feedback";
    addNewTaskDiv.innerHTML = renderAddTaskPoup();
  } */

  /*ToDoId.addEventListener("click", () => {
    addNewTaskDiv.innerHTML = renderAddTaskPoup();
  });
  InProgressId.addEventListener("click", () => {
    addNewTaskDiv.innerHTML = renderAddTaskPoup();
  });
  AwaitFeedbackId.addEventListener("click", () => {
    addNewTaskDiv.innerHTML = renderAddTaskPoup();
  });*/

  //createtTaskPlus();


//}

function renderAddTaskPoupPlusTodo() {
  return /*html*/ `
    <div class="addNewTaskDiv" id="addNewTaskDiv">
      <div class="addNewTaskDivHeader">
        <h2 class="addNewTaskDivHeaderH2">Add new task</h2>
        <button type="button" class="btn-close" aria-label="Close" onclick="closeAddTaskPopUp()">Schliessen</button>
      </div>
      <div class="addNewTaskDivContent">
        <div class="addNewTaskDivContentLeft">
          <label for="titleInput" class="addNewTaskDivContentLeftLabel">Title</label>
          <input type="text" id="titleInput" class="addNewTaskDivContentLeftInput">
          <label for="descriptionTextarea" class="addNewTaskDivContentLeftLabel">Description</label>
          <textarea id="descriptionTextarea" class="addNewTaskDivContentLeftInput"></textarea>
        </div>
        <div class="addNewTaskDivContentRight">
          <label for="columnTitlesId" class="addNewTaskDivContentRightLabel">Column</label>
          <select id="columnTitlesId" class="addNewTaskDivContentRightSelect">
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Await Feedback">Await Feedback</option>                                                            
          </select>
        </div>
      </div>
      <div class="addNewTaskDivFooter">
        <button type="button" class="addNewTaskDivFooterBtn" onclick="createtTaskPlusTodo()">Create task</button>
      </div>
    </div>
  `;
}

function renderAddTaskPoupPlusProgress() {
  return /*html*/ `
    <div class="addNewTaskDiv" id="addNewTaskDiv">
      <div class="addNewTaskDivHeader">
        <h2 class="addNewTaskDivHeaderH2">Add new task</h2>
        <button type="button" class="btn-close" aria-label="Close" onclick="closeAddTaskPopUp()">Schliessen</button>
      </div>
      <div class="addNewTaskDivContent">
        <div class="addNewTaskDivContentLeft">
          <label for="titleInput" class="addNewTaskDivContentLeftLabel">Title</label>
          <input type="text" id="titleInput" class="addNewTaskDivContentLeftInput">
          <label for="descriptionTextarea" class="addNewTaskDivContentLeftLabel">Description</label>
          <textarea id="descriptionTextarea" class="addNewTaskDivContentLeftInput"></textarea>
        </div>
        <div class="addNewTaskDivContentRight">
          <label for="columnTitlesId" class="addNewTaskDivContentRightLabel">Column</label>
          <select id="columnTitlesId" class="addNewTaskDivContentRightSelect">
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Await Feedback">Await Feedback</option>                                                            
          </select>
        </div>
      </div>
      <div class="addNewTaskDivFooter">
        <button type="button" class="addNewTaskDivFooterBtn" onclick="createtTaskPlusProgress()">Create task</button>
      </div>
    </div>
  `;
}

function renderAddTaskPoupPlusFeedback() {
  return /*html*/ `
    <div class="addNewTaskDiv" id="addNewTaskDiv">
      <div class="addNewTaskDivHeader">
        <h2 class="addNewTaskDivHeaderH2">Add new task</h2>
        <button type="button" class="btn-close" aria-label="Close" onclick="closeAddTaskPopUp()">Schliessen</button>
      </div>
      <div class="addNewTaskDivContent">
        <div class="addNewTaskDivContentLeft">
          <label for="titleInput" class="addNewTaskDivContentLeftLabel">Title</label>
          <input type="text" id="titleInput" class="addNewTaskDivContentLeftInput">
          <label for="descriptionTextarea" class="addNewTaskDivContentLeftLabel">Description</label>
          <textarea id="descriptionTextarea" class="addNewTaskDivContentLeftInput"></textarea>
        </div>
        <div class="addNewTaskDivContentRight">
          <label for="columnTitlesId" class="addNewTaskDivContentRightLabel">Column</label>
          <select id="columnTitlesId" class="addNewTaskDivContentRightSelect">
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Await Feedback">Await Feedback</option>                                                            
          </select>
        </div>
      </div>
      <div class="addNewTaskDivFooter">
        <button type="button" class="addNewTaskDivFooterBtn" onclick="createtTaskPlusFeedback()">Create task</button>
      </div>
    </div>
  `;
}

function closeAddTaskPopUp() {
  document.getElementById("addNewTaskDiv").classList.add("d-none");
}



