let todos = [
  {
    id: 1,
    title: "Task 1",
    category: "To do",
  },
  {
    id: 2,
    title: "Task 2",
    category: "In progress",
  },
  {
    id: 3,
    title: "Task 3",
    category: "Await feedback",
  },
  {
    id: 4,
    title: "Task 4",
    category: "Done",
  },
];


let currentDraggedElement;
let currentSelectedTask;

function updateHTML() {
  let categories = todos.filter(
    (c) =>
      c["category"] == "To do" ||
      c["category"] == "In progress" ||
      c["category"] == "Await feedback" ||
      c["category"] == "Done"
  );

  document.getElementById("columnContainer").innerHTML = "";

  for (let index = 0; index < categories.length; index++) {
    const element = categories[index];
    document.getElementById("columnContainer").innerHTML += renderTaskContainer(
      //element,
      element["category"]
    );
  }
}

function startDragging(id) {
  currentDraggedElement = id;
}

function renderTaskContainer(element) {
  return /*html*/ `
    <div class="column">
        <h2 class="column-titles-h2">${element}<button class="add-column"><img src="/assets/icons/plusblack.png" alt=""></button></h2>
        <div class="task-card" id="${element}" draggable="true" ondragstart="startDragging(${element["id"]})">
        <div class="task-content">
            <div class="task-card-title">${element["title"]}</div>
            <h3 class="task-title">${element.title}</h3>
            <p class="task-description">${element.description}</p>
        </div>
    </div>
  `;
}

function allowDrop(ev) {
  ev.preventDefault();
}

function moveTo(category) {
  todos[currentDraggedElement]["category"] = category;
  updateHTML();
}


/*function updateHTML() {
  let todo = todos.filter((c) => c["category"] == "To do");

  document.getElementById("columnContainer").innerHTML = "";

  for (let index = 0; index < todo.length; index++) {
    const element = todo[index];
    document.getElementById("columnContainer").innerHTML += renderTaskContainer(element);
  }

  let inProgress = todos.filter((c) => c["category"] == "In progress");

  document.getElementById("columnContainer").innerHTML = "";

  for (let index = 0; index < inProgress.length; index++) {
    const element = inProgress[index];
    document.getElementById("columnContainer").innerHTML += renderTaskContainer(element);
  }

  let awaitFeedback = todos.filter((c) => c["category"] == "Await feedback");

  document.getElementById("columnContainer").innerHTML = "";

  for (let index = 0; index < awaitFeedback.length; index++) {
    const element = awaitFeedback[index];
    document.getElementById("columnContainer").innerHTML += renderTaskContainer(element);
  }

  let done = todos.filter((c) => c["category"] == "Done");

  document.getElementById("columnContainer").innerHTML = "";

  for (let index = 0; index < done.length; index++) {
    const element = done[index];
    document.getElementById("columnContainer").innerHTML += renderTaskContainer(element);
  }
}*/