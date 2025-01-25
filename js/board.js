let todos = [
  {
    id: 1,
    title: 'Task 1',
    category: 'To do',
  },
  {
    id: 2,
    title: 'Task 2',
    category: 'In progress',
  },
  {
    id: 3,
    title: 'Task 3',
    category: 'Await feedback',
  },
  {
    id: 4,
    title: 'Task 4',
    category: 'Done',
  },
];

let currentDraggedElement;
let currentSelectedTask;


function updateHTML() {
  let categories = todos.filter(c => c['category'] == 'To do' || c['category'] == 'In progress' || c['category'] == 'Await feedback' || c['category'] == 'Done');

  document.getElementById('columnContainer').innerHTML = '';

  for (let index = 0; index < categories.length; index++) {
    const element = categories[index];
    document.getElementById('columnContainer').innerHTML += renderTaskContainer(element['category']);
  }
}

function startDragging(id) {
  currentDraggedElement = id;
}

function renderTaskContainer(element) {
  return /*html*/ `
    <div class="column">
        <h2 class="column-titles-h2">${element}<button class="add-column"><img src="/assets/icons/plusblack.png" alt=""></button></h2>
        <div class="column-content" ondragstart="startDragging(${element['id']})">${element['title']}</div>
    </div>
  `;
}

function allowDrop(ev) {
  ev.preventDefault();
}

function moveTo(category) {
  todos[currentDraggedElement]['category'] = category;
  updateHTML();
}





