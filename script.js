const BASE_URL = "https://join-7f1d9-default-rtdb.europe-west1.firebasedatabase.app/";

let contacts = [];
let tasks = [];

function init() {
  
}

const colorPalette = [
  "#E63946", "#F4A261", "#2A9D8F", "#264653", "#D62828",
  "#F77F00", "#3D348B", "#E76F51", "#8E44AD", "#16A085",
  "#D7263D", "#1B998B", "#ECA400", "#3A86FF", "#8338EC",
  "#06D6A0", "#EF476F", "#118AB2", "#073B4C", "#F25C54",
  "#43AA8B", "#FF5A5F", "#5E548E", "#9B5DE5", "#00BBF9",
  "#FF006E", "#8AC926", "#6A0572", "#A60303", "#FF9F1C"
];

// Code von Oliver(Mentor)

async function loadDataUsers() {
  await loadContacts();
  //   renderContacts();
}

async function getDataFromFirebase(path = "") {
  let response = await fetch(BASE_URL + path + ".json");
  return (responseToJson = await response.json());
}

async function postDataToFirebase(path = "", data = {}) {
  await fetch(BASE_URL + path + ".json", {
    method: "POST",
    header: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

async function deleteDataFromFirebase(path = "") {
  await fetch(BASE_URL + path + ".json", {
    method: "DELETE",
  });
}

async function loadContacts() {
  contacts = [];
  let contactsData = await getDataFromFirebase("contacts");

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

async function loadTasks() {
  tasks = [];
  let tasksData = await getDataFromFirebase("tasks");

  for (const key in tasksData) {
    const SINGLE_TASK = tasksData[key];

    let task = {
      id: key,
      columnTitles: SINGLE_TASK.columnTitles,
      title: SINGLE_TASK.title,
      description: SINGLE_TASK.description,
      dueDate: SINGLE_TASK.dueDate,
      priority: SINGLE_TASK.priority,
      subTasks: SINGLE_TASK.subTasks,
      status: SINGLE_TASK.status,
      category: SINGLE_TASK.category,
      users: SINGLE_TASK.users 
        ? SINGLE_TASK.users.map(name => generateInitials(name)) // Umwandlung in Initialen
        : [],
    };    

    tasks.push(task);
  }
  
  renderTasks();
}
// async function loadTasks() {
//   tasks = [];
//   let tasksData = await getDataFromFirebase("tasks");

//   for (const key in tasksData) {
//     const SINGLE_TASK = tasksData[key];

//     let task = {
//       id: key,
//       columnTitles: SINGLE_TASK.columnTitles,
//       title: SINGLE_TASK.title,
//       description: SINGLE_TASK.description,
//       dueDate: SINGLE_TASK.dueDate,
//       priority: SINGLE_TASK.priority,
//       subTasks: SINGLE_TASK.subTasks || [], // Falls undefined, setzen wir ein leeres Array
//       status: SINGLE_TASK.status,
//       category: SINGLE_TASK.category,
//       users: SINGLE_TASK.users 
//         ? SINGLE_TASK.users.map(name => generateInitials(name)) 
//         : [], // Falls undefined, setzen wir ein leeres Array
//     };    

//     tasks.push(task);
//   }
  
//   renderTasks();
// }








// Code ende von Oliver(Mentor)

function goBack() {
  const referrer = document.referrer;
  if (referrer) {
    window.location.href = referrer;
  } else {
    window.location.href = "index.html";
  }
}

async function putDataToFirebase(path, data = {}, key) {
  await fetch(BASE_URL + path + key + ".json", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

function showLoginPassword() {
  let change = document.getElementById("loginPassword");

  if (change.type === "password") {
    change.type = "text";
  } else {
    change.type = "password";
  }
}
function showSignupPassword() {
  let change = document.getElementById("signupPassword");

  if (change.type === "password") {
    change.type = "text";
  } else {
    change.type = "password";
  }
}
function showConfirmPassword() {
  let change = document.getElementById("confirmPassword");

  if (change.type === "password") {
    change.type = "text";
  } else {
    change.type = "password";
  }
}