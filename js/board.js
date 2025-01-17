let todos = [
  {
    id: 1,
    title: 'Task 1',
    status: 'To do',
    priority: 'Low',
    category: 'To do',
  },
  {
    id: 2,
    title: 'Task 2',
    status: 'In progress',
    priority: 'Low',
    category: 'In progress',
  },
  {
    id: 3,
    title: 'Task 3',
    status: 'To do',
    priority: 'Low',
    category: 'Await feedback',
  },
  {
    id: 4,
    title: 'Task 4',
    status: 'To do',
    priority: 'Low',
    category: 'Done',
  },
];

let currentDraggedElement;
let currentSelectedTask;

function renderTaskContainer() {
  //let categories = todos.filter(c => c['category'] == 'To do', 'In progress', 'Await feedback', 'Done');
  //let categories = document.getElementById('taskContainer');
  //document.getElementById('taskContainer').innerHTML = '';

  //let currentDraggedElement = categories;

  let categories = todos.map((c) => c['category']);
  let uniqueCategories = [...new Set(categories)];

  for (let index = 0; index < uniqueCategories.length; index++) {
    const element = uniqueCategories[index];
    document.getElementById('taskContainer').innerHTML += /*html*/ `
        <div class="column" id="${element}">
            <h2 class="column-titles-h2">${element}<button class="add-column"><img src="/assets/icons/plusblack.png" alt=""></button></h2>
        <div class="task-card" id="taskCardToDo${element.category}" draggable="true" ondragstart="startDragging('taskCardToDo${element.category}')" ondragend="removeHighlight('To do')" ondrop=" moveTo('To do') moveTo('In progress') moveTo('Await feedback') moveTo('Done')" ondragleave="removeHighlight('To do') removeHighlight('In progress') removeHighlight('Await feedback') removeHighlight('Done')" ondragover="allowDrop(event); highlight('In progress')">
            <div class="task-content">
                <div class="task-card-title">${element.title}</div>
                <h3 class="task-title">${element.title}</h3>
                <p class="task-description">${element.description}</p>
            </div>
            <div class="task-status">
                <div class="progress">
                    <div class="progress-bar" id="progressbar" style="width: 0%"></div>
                    <span>0/2 Subtasks</span>
                </div>
                <div class="task-footer">    
                    <div class="task-users">
                        <div class="tasks-user1 tasks-user">HA</div>
                        <div class="tasks-user2 tasks-user">MD</div>
                        <div class="tasks-user3 tasks-user">DL</div>
                    </div>
                    <div>
                        <img src="/assets/icons/priom.png" alt="">
                    </div>
                </div>
            </div>
        </div>
        </div>
        `;
  }
}

function startDragging(category) {
  currentDraggedElement = category;
}

function allowDrop(ev) {
  ev.preventDefault();
}

function moveTo(category) {
  todos[currentDraggedElement]['category'] = category;
  renderTaskContainer();
}

function highlight(category) {
  document.getElementById(category).classList.add('drag-area-highlight');
}

function removeHighlight(category) {
  document.getElementById(category).classList.remove('drag-area-highlight');
}

function updateProgressBar() {
  let update = (currentSelectedTask + 1) / todos.length;

  update = Math.round(update * 100);
  document.getElementById('progressbar').innerHTML = `${update}%`;
  document.getElementById('progressbar').style = `width: ${update}%;`;
}
