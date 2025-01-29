let todos = [
  {
    id: 1,
    columnTitles: "To do",
    category: "User story",
    title: "Task 1",
    description: "Task 1 description",
    subtasks: [],
    users: [],
    prio: []
  },
  {
    id: 2,
    columnTitles: "In progress",
    category: "Technical task",
    title: "Task 2",
    description: "Task 2 description",
    subtasks: [],
    users: [],
    prio: []
  },
  {
    id: 3,
    columnTitles: "Await feedback",
    category: [],
    title: "Task 3",
    description: "Task 3 description",
    subtasks: [],
    users: [],
    prio: []
  },
  {
    id: 4,
    columnTitles: "Done",
    category: [],
    title: "Task 4",
    description: "Task 4 description",
    subtasks: [],
    users: [],
    prio: []
  },
];


let currentDraggedElement;
let currentSelectedTask;

function updateHTML() {
  let columnTitle = todos.filter(
    (c) =>
      c["columnTitles"] == "To do" ||
      c["columnTitles"] == "In progress" ||
      c["columnTitles"] == "Await feedback" ||
      c["columnTitles"] == "Done"
  );

  document.getElementById("columnContainer").innerHTML = '';

  for (let index = 0; index < columnTitle.length; index++) {
    const element = columnTitle[index];
    document.getElementById("columnContainer").innerHTML += renderTaskContainer(
      element,
      index,
      element["columnTitles"]
    );
  }
}

function startDragging(index) {
  currentDraggedElement = index;
}

function renderTaskContainer(element, index) {
  return /*html*/ `
    <div class="column">
        <h2 class="column-titles-h2">${element["columnTitles"]}<button class="add-column"><img src="/assets/icons/plusblack.png" alt=""></button></h2>
        <div class="task-card" id="${index}" draggable="true" ondragstart="startDragging(${element['id']})" ondrop="moveTo('${element['columnTitles']}')" ondragover="allowDrop(event)" >
        <div class="task-content">
            <div class="task-card-title">${element["category"]}</div>
            <h3 class="task-title">${element.title}</h3>
            <p class="task-description">${element.description}</p>
        </div>
    </div>
  `;
}

function allowDrop(ev) {
  ev.preventDefault();
}

function moveTo(columnTitles) {
  todos[currentDraggedElement]["columnTitles"] = columnTitles;
  updateHTML();
}

