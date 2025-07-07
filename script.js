const BASE_URL = 'https://join-7f1d9-default-rtdb.europe-west1.firebasedatabase.app/';

let contacts = [];
let tasks = [];

const colorPalette = ['#E63946','#F4A261','#2A9D8F','#264653','#D62828','#F77F00','#3D348B','#E76F51','#8E44AD','#16A085','#D7263D',
  '#1B998B','#ECA400','#3A86FF','#8338EC','#06D6A0','#EF476F','#118AB2','#073B4C','#F25C54','#43AA8B','#FF5A5F','#5E548E','#9B5DE5',
  '#00BBF9','#FF006E','#8AC926','#6A0572','#A60303','#FF9F1C',];

/**
 * Asynchronously loads user data by fetching contact information.
 *
 * This function calls `loadContacts()` to retrieve and load contact data.
 * It uses `await` to ensure that the contacts are fully loaded before proceeding.
 *
 * @async
 * @function loadDataUsers
 * @returns {Promise<void>} A promise that resolves when the contacts have been loaded.
 */
async function loadDataUsers() {
  await loadContacts();
}

/**
 * Fetches data from a Firebase Realtime Database at the specified path.
 *
 * @async
 * @function
 * @param {string} [path=""] - The relative path in the Firebase database to fetch data from.
 * @returns {Promise<Object>} A promise that resolves to the JSON-parsed response from the Firebase database.
 * @throws {Error} Throws an error if the fetch request fails or the response cannot be parsed as JSON.
 */
async function getDataFromFirebase(path = '') {
  let response = await fetch(BASE_URL + path + '.json');
  return (responseToJson = await response.json());
}

/**
 * Sends data to a specified path in a Firebase Realtime Database.
 *
 * @async
 * @function postDataToFirebase
 * @param {string} [path=""] - The relative path in the Firebase database where the data will be stored.
 * @param {Object} [data={}] - The data object to be sent to the Firebase database.
 * @returns {Promise<void>} A promise that resolves when the data has been successfully sent.
 */
async function postDataToFirebase(path = '', data = {}) {
  await fetch(BASE_URL + path + '.json', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
}

/**
 * Sends a POST request to a Firebase Realtime Database to store data at the specified path.
 *
 * @param {string} [path=""] - The relative path in the Firebase database where the data will be stored.
 * @param {Object} [data={}] - The data object to be sent and stored in the database.
 * @returns {Promise<void>} A promise that resolves when the request is complete.
 */
async function postTaskDataToFirebase(path = '', data = {}) {
  await fetch(BASE_URL + path + '.json', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
}

/**
 * Redirects the user to the board page.
 *
 * This function changes the current window location to `/pages/board.html`,
 * navigating the user to the board page.
 *
 * @function redirectToBoardPage
 */
function redirectToBoardPage() {
  window.location.href = '/pages/board.html';
}

/**
 * Deletes data from a specified path in a Firebase Realtime Database.
 *
 * @async
 * @function deleteDataFromFirebase
 * @param {string} [path=""] - The relative path in the Firebase database to delete data from. Defaults to an empty string.
 * @returns {Promise<void>} A promise that resolves when the data is successfully deleted.
 */
async function deleteDataFromFirebase(path = '') {
  await fetch(BASE_URL + path + '.json', {
    method: 'DELETE',
  });
}

/**
 * Sends a PATCH request to update data at the specified path in a Firebase Realtime Database.
 *
 * @async
 * @function
 * @param {string} [path=""] - The relative path in the Firebase database where the data should be updated.
 * @param {Object} [data={}] - The data to be updated at the specified path.
 * @returns {Promise<void>} A promise that resolves when the request is complete.
 */
async function patchDataToFirebase(path = '', data = {}) {
  await fetch(BASE_URL + path + '.json', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
}

/**
 * Asynchronously loads contact data from Firebase and populates the `contacts` array.
 * Each contact is structured with an `id`, `name`, `email`, `password`, `phone`, and `color`.
 *
 * @async
 * @function
 * @returns {Promise<void>} A promise that resolves when the contacts are successfully loaded.
 */
async function loadContacts() {
  contacts = [];
  let contactsData = await getDataFromFirebase('contacts');

  for (const key in contactsData) {
    const SINGLE_CONTACT = contactsData[key];
    let contact = {
      id: key,
      name: SINGLE_CONTACT.name,
      email: SINGLE_CONTACT.email,
      password: SINGLE_CONTACT.password,
      phone: SINGLE_CONTACT.phone,
      color: SINGLE_CONTACT.color,
    };
    contacts.push(contact);
  }
}

/**
 * Asynchronously loads tasks from a Firebase database, processes the data,
 * and updates the global `tasks` array with structured task objects.
 * Each task includes details such as title, description, due date, priority,
 * subtasks, status, category, and assigned users.
 * After processing, the tasks are rendered on the UI.
 *
 * @async
 * @function
 * @returns {Promise<void>} Resolves when tasks are successfully loaded and rendered.
 */
async function loadTasks() {
  tasks = [];
  let tasksData = await getDataFromFirebase('tasks');
  for (const key in tasksData) {
    const SINGLE_TASK = tasksData[key];
    let task = {
      id: key,
      columnTitles: SINGLE_TASK.columnTitles,
      title: SINGLE_TASK.title,
      description: SINGLE_TASK.description,
      dueDate: SINGLE_TASK.dueDate,
      priority: SINGLE_TASK.priority,
      subTasks: SINGLE_TASK.subTasks
        ? SINGLE_TASK.subTasks.map((subTask) => ({description: subTask.description,completed: subTask.completed ?? false,})): [],
      status: SINGLE_TASK.status,
      category: SINGLE_TASK.category,
      users: SINGLE_TASK.users
        ? SINGLE_TASK.users.map((user) => {let userName = typeof user === 'string' ? user : user.name;let contact = contacts.find((c) => c.name === userName);
            return {
              name: userName,
              initials: generateInitials(userName),
              color: contact ? contact.color : '#FF0000',
            };
          })
        : [],
    };
    tasks.push(task);
  }
  renderTasks();
}

/**
 * Loads task data from Firebase and updates the summary section of the application.
 *
 * This asynchronous function:
 * - Retrieves all tasks from the `'tasks'` collection in Firebase.
 * - If no data is found, logs an error and stops execution.
 * - Calculates summary statistics using `summaryVariable()`, including:
 *   - Total tasks
 *   - Counts for specific statuses (To Do, In Progress, Await Feedback, Done)
 *   - Count of urgent tasks
 *   - Nearest upcoming deadline
 * - Updates the DOM with the computed summary values via `summaryIDs()`.
 * - If an upcoming deadline exists, it's displayed in the element with ID `date`.
 * - Additionally calls `dailyTime()` and `fullNameSummary()` to complete summary rendering.
 *
 * @async
 * @function loadSummaryData
 * @returns {Promise<void>} A promise that resolves when the summary data has been loaded and rendered.
 */
async function loadSummaryData() {
  let tasksData = await getDataFromFirebase('tasks');

  if (!tasksData) {
    console.error('Keine Daten gefunden!');
    return;
  }
  let { totalTasks, toDoCount, inProgressCount, awaitFeedbackCount, doneCount, urgentCount, upcomingDeadline } = summaryVariable(tasksData);
  summaryIDs(totalTasks, toDoCount, inProgressCount, awaitFeedbackCount, doneCount, urgentCount);
  if (upcomingDeadline) {
    document.getElementById('date').innerText = upcomingDeadline.toDateString();
  }
  dailyTime();
  fullNameSummary();
}


function summaryIDs(totalTasks, toDoCount, inProgressCount, awaitFeedbackCount, doneCount, urgentCount) {
  document.getElementById('totalTaskCount').innerText = totalTasks;
  document.getElementById('toDoCount').innerText = toDoCount;
  document.getElementById('inProgressCount').innerText = inProgressCount;
  document.getElementById('awaitFeedbackCount').innerText = awaitFeedbackCount;
  document.getElementById('doneCount').innerText = doneCount;
  document.getElementById('urgentCount').innerText = urgentCount;
}


function summaryVariable(tasksData) {
  let tasks = Object.values(tasksData);
  let totalTasks = tasks.length;
  let toDoCount = tasks.filter((task) => task.columnTitles === 'To Do' || task.columnTitles === 'todo').length;
  let inProgressCount = tasks.filter(
    (task) => task.columnTitles === 'In Progress' || task.columnTitles === 'inprogress').length;
  let awaitFeedbackCount = tasks.filter(
    (task) => task.columnTitles === 'Await Feedback' || task.columnTitles === 'awaitfeedback').length;
  let doneCount = tasks.filter((task) => task.columnTitles === 'Done' || task.columnTitles === 'done').length;
  let urgentTasks = tasks.filter((task) => task.priority === 'Urgent');
  let urgentCount = urgentTasks.length;
  let upcomingDeadline = urgentTasks.map((task) => new Date(task.dueDate)).sort((a, b) => a - b)[0];
  return { totalTasks, toDoCount, inProgressCount, awaitFeedbackCount, doneCount, urgentCount, upcomingDeadline };
}

/**
 * Navigates the user back to the referring page if available.
 * If no referrer is present, redirects the user to the "index.html" page.
 */
function goBack() {
  const referrer = document.referrer;
  if (referrer) {
    window.location.href = referrer;
  } else {
    window.location.href = 'index.html';
  }
}

/**
 * Sends data to a specified Firebase Realtime Database path using the HTTP PUT method.
 *
 * @async
 * @function putDataToFirebase
 * @param {string} path - The relative path in the Firebase database where the data will be stored.
 * @param {Object} [data={}] - The data to be sent to Firebase. Defaults to an empty object.
 * @param {string} key - The unique key to identify the data entry in the specified path.
 * @returns {Promise<void>} A promise that resolves when the data is successfully sent.
 */
async function putDataToFirebase(path, data = {}, key) {
  await fetch(BASE_URL + path + key + '.json', {
  method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
}

/**
 * Toggles the visibility of the password input field in a login form.
 * If the input field's type is "password", it changes it to "text" to show the password.
 * If the input field's type is "text", it changes it back to "password" to hide the password.
 */
function showLoginPassword() {
  let change = document.getElementById('loginPassword');

  if (change.type === 'password') {
    change.type = 'text';
  } else {
    change.type = 'password';
  }
}

/**
 * Toggles the visibility of the password input field in the signup form.
 * If the input type is "password", it changes it to "text" to show the password.
 * If the input type is "text", it changes it back to "password" to hide the password.
 */
function showSignupPassword() {
  let change = document.getElementById('signupPassword');

  if (change.type === 'password') {
    change.type = 'text';
  } else {
    change.type = 'password';
  }
}

/**
 * Toggles the visibility of the password input field with the ID "confirmPassword".
 * If the input field's type is "password", it changes it to "text" to show the password.
 * If the input field's type is "text", it changes it back to "password" to hide the password.
 */
function showConfirmPassword() {
  let change = document.getElementById('confirmPassword');

  if (change.type === 'password') {
    change.type = 'text';
  } else {
    change.type = 'password';
  }
}

/**
 * Highlights the navigation item corresponding to the current page by adding
 * or removing the "active" class based on the "data-page" attribute.
 *
 * This function retrieves the current page identifier using `getCurrentPage()`
 * and iterates through all navigation items in the sidebar, policy and notice
 * section, and mobile sidebar. It toggles the "active" class on each item
 * depending on whether its "data-page" attribute matches the current page.
 *
 * @function
 * @returns {void}
 */
function highlightNavItem() {
  const currentPage = getCurrentPage();

  const navItems = Array.from(document.querySelectorAll('.sideBarList a, .policyAndNotice a, .mobileSideBar a'));

  navItems.forEach((item) => {
    const isActive = item.getAttribute('data-page') === currentPage;
    item.classList.toggle('active', isActive);
  });
}

/**
 * Retrieves the name of the current page by extracting the file name from the URL path.
 *
 * @returns {string} The name of the current page without the ".html" extension.
 */
function getCurrentPage() {
  const path = window.location.pathname;
  const fileName = path.substring(path.lastIndexOf('/') + 1);
  return fileName.replace('.html', '');
}

document.addEventListener('DOMContentLoaded', highlightNavItem);

/**
 * Toggles the visibility of the menu elements by adding or removing the "hidden" class.
 * This function targets two elements with IDs "subMenu" and "subMenuMobile".
 */
function toggleMenu() {
  document.getElementById('subMenu').classList.toggle('hidden');
  document.getElementById('subMenuMobile').classList.toggle('hidden');
}

/**
 * Hides the sub-menu on specific restricted pages.
 *
 * This function checks the current page's pathname and hides the sub-menu elements
 * if the user is on a restricted page. It targets both the desktop and mobile sub-menu elements.
 *
 * Restricted pages:
 * - `/pages/legale-notice-Nouser.html`
 * - `/pages/data-protection-Nouser.html`
 *
 * Affected elements:
 * - `#subMenu` (Desktop sub-menu)
 * - `#subMenuMobile` (Mobile sub-menu)
 */
function hideSubMenuOnRestrictedPages() {
  const restrictedPages = ['/pages/legale-notice-Nouser.html', '/pages/data-protection-Nouser.html'];
  const currentPath = window.location.pathname;

  if (restrictedPages.includes(currentPath)) {
    const subMenu = document.getElementById('subMenu');
    const subMenuMobile = document.getElementById('subMenuMobile');

    if (subMenu) subMenu.style.display = 'none';
    if (subMenuMobile) subMenuMobile.style.display = 'none';
  }
}

/**
 * Sets a minimum date restriction on the date input field.
 *
 * This function ensures that the date input (`#date`) cannot be set to a past date.
 * It updates the `min` attribute of the input field to today's date.
 * Additionally, it re-applies the minimum date restriction each time the input field is focused.
 *
 * If the element is not found, an error is logged to the console.
 *
 * @function datelimit
 */
function datelimit() {
  let editDateInput = document.getElementById('date');

  function setMinDate() {
      if (editDateInput) {
          let today = new Date().toISOString().split('T')[0];
          editDateInput.setAttribute('min', today);
      } else {
          console.error("Element mit ID 'dueDateInput' nicht gefunden.");
      }
  }

  setMinDate();
  if (editDateInput) {
      editDateInput.addEventListener('focus', setMinDate);
  }
}
