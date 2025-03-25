async function initSummary() {
  await loadSummaryData();
}

function dailyTime() {
  let currentTime = new Date();
  let currentHours = currentTime.getHours();
  let greeting = "";

  greeting = getDayTime(currentHours, greeting);

  document.getElementById("time").innerHTML = greeting;
  document.getElementById("timeMobil").innerHTML = greeting;
}

function getDayTime(currentHours, greeting) {
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
  return greeting;
}

async function getDataFromFirebase(path = "") {
  let response = await fetch(BASE_URL + path + ".json");
  return await response.json();
}

function fullNameSummary() {
  const fullName = sessionStorage.getItem("fullName") || "Guest";
  document.getElementById("fullName").textContent = fullName;
  document.getElementById("fullNameMobil").textContent = fullName;
}
