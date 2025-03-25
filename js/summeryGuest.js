async function initSummary() {
  await loadSummaryData();
}

/**
 * Updates the greeting message on the webpage based on the current time of day.
 * Retrieves the current time, determines the appropriate greeting, and updates
 * the inner HTML of elements with IDs "time" and "timeMobil".
 *
 * @function
 */
function dailyTime() {
  let currentTime = new Date();
  let currentHours = currentTime.getHours();
  let greeting = "";

  greeting = getDayTime(currentHours, greeting);

  document.getElementById("time").innerHTML = greeting;
  document.getElementById("timeMobil").innerHTML = greeting;
}

/**
 * Determines the appropriate greeting based on the current hour of the day.
 *
 * @param {number} currentHours - The current hour in 24-hour format (0-23).
 * @param {string} greeting - A placeholder for the greeting message.
 * @returns {string} The greeting message corresponding to the time of day.
 */
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

/**
 * Fetches data from a Firebase database at the specified path.
 *
 * @async
 * @function
 * @param {string} [path=""] - The relative path in the Firebase database to fetch data from. Defaults to an empty string.
 * @returns {Promise<Object>} A promise that resolves to the JSON-parsed response from the Firebase database.
 */
async function getDataFromFirebase(path = "") {
  let response = await fetch(BASE_URL + path + ".json");
  return await response.json();
}

/**
 * Updates the text content of elements with IDs "fullName" and "fullNameMobil"
 * to display the full name stored in sessionStorage. If no full name is found,
 * it defaults to "Guest".
 *
 * Retrieves the full name from sessionStorage using the key "fullName".
 * If the value is null or undefined, it falls back to "Guest".
 *
 * @function fullNameSummary
 * @returns {void} This function does not return a value.
 */
function fullNameSummary() {
  const fullName = sessionStorage.getItem("fullName") || "Guest";
  document.getElementById("fullName").textContent = fullName;
  document.getElementById("fullNameMobil").textContent = fullName;
}
