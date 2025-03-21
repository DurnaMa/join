async function initSummary() {
  //daliyTime();
  //await loadTasks();
  //updateTaskSummary();
  //updateSummaryPage();
  await loadSummaryData();
}

//let tasks = loadTasks();

// function daliyTime() {
//     let currentTime = new Date();
//     currentTime.getHours();
//     let currenthours = currentTime.getHours();
//     switch (true) {
//         case (currenthours >= 0 && currenthours < 12):
//             document.getElementById("time").innerHTML = "Good Morning";
//             break;
//         case (currenthours >= 12 && currenthours < 17):
//             document.getElementById("time").innerHTML = "Good Afternoon";
//             break;
//         case (currenthours >= 17 && currenthours < 24):
//             document.getElementById("time").innerHTML = "Good Evening";
//             break;
//     }
// }

function dailyTime() {
  let currentTime = new Date();
  let currentHours = currentTime.getHours();
  let greeting = "";

  if (currentHours >= 4 && currentHours < 6) {
    greeting = "Early morning!";
  } else if (currentHours >= 6 && currentHours < 10) {
    greeting = "Good morning!";
  } else if (currentHours >= 10 && currentHours < 12) {
    greeting = "Good morning/Hello!";
  } else if (currentHours >= 12 && currentHours < 13) {
    greeting = "Hello!";
  } else if (currentHours >= 13 && currentHours < 17) {
    greeting = "Good afternoon!";
  } else if (currentHours >= 17 && currentHours < 19) {
    greeting = "Good evening/Hello!";
  } else if (currentHours >= 19 && currentHours < 22) {
    greeting = "Good evening!";
  } else {
    greeting = "Good night!";
  }

  document.getElementById("time").innerHTML = greeting;
}

async function getDataFromFirebase(path = "") {
  let response = await fetch(BASE_URL + path + ".json");
  return await response.json();
}

function fullNameSummary() {
  const fullName = sessionStorage.getItem("fullName") || "Guest";
  document.getElementById("fullName").textContent = fullName;
  daliyTime();
}

// habe bisschen vorprogrammiert und in template ist auch HTML Code und
// unten werden die benötigten infos gefiltert dann darauf zugegrifen dann
// die mit urgent markiert sind angezeigt dann deadline...!

// function updateSummaryPage(tasks) {
//     firebase.firestore().collection('tasks').get().then(querySnapshot => {
//         const tasks = querySnapshot.docs.map(doc => doc.data());

//         document.getElementById('toDoCount').innerHTML = tasks.filter(task => task.status === 'to-do').length;
//         document.getElementById('doneCount').innerHTML = tasks.filter(task => task.status === 'done').length;
//         document.getElementById('urgentCount').innerHTML = tasks.filter(task => task.priority === 'urgent').length;
//         document.getElementById('totalTaskCount').innerHTML = tasks.length;
//         document.getElementById('inProgressCount').innerHTML = tasks.filter(task => task.status === 'in-progress').length;
//         document.getElementById('awaitFeedbackCount').innerHTML = tasks.filter(task => task.status === 'awaiting-feedback').length;
//       });
// }

// function renderSummery() {
//     let mainContentSummery = document.getElementById("mainContentSummery");
//     mainContentSummery.innerHTML = "";
//     mainContentSummery.innerHTML = summeryTemplate(tasks);
// }

// document.addEventListener("DOMContentLoaded", () => {
//     loadTasks();
// });

// function updateTaskSummary(tasks) {
//     const toDoCount = tasks.filter(task => task.status === "To Do").length;
//     const inProgressCount = tasks.filter(task => task.status === "In Progress").length;
//     const awaitFeedbackCount = tasks.filter(task => task.status === "Await Feedback").length;
//     const doneCount = tasks.filter(task => task.status === "Done").length;
//     const urgentTasks = tasks.filter(task => task.priority === "Urgent");
//     const totalTaskCount = tasks.length;

//     document.getElementById("toDoCount").textContent = toDoCount;
//     document.getElementById("inProgressCount").textContent = inProgressCount;
//     document.getElementById("awaitFeedbackCount").textContent = awaitFeedbackCount;
//     document.getElementById("doneCount").textContent = doneCount;
//     document.getElementById("totalTaskCount").textContent = totalTaskCount;
//     document.getElementById("urgentCount").textContent = urgentTasks.length;

//     if (urgentTasks.length > 0) {
//         const nextDeadline = urgentTasks.map(task => new Date(task.deadline))
//             .sort((a, b) => a - b)[0];
//         document.getElementById("date").textContent = nextDeadline.toDateString();
//     } else {
//         document.getElementById("date").textContent = "No upcoming deadlines";
//     }
// }
