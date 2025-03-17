/**
 * Updates the inner HTML of the element with the ID "time" to display a greeting
 * based on the current time of day.
 *
 * - "Good Morning" for hours between 0 and 11 (inclusive).
 * - "Good Afternoon" for hours between 12 and 16 (inclusive).
 * - "Good Evening" for hours between 17 and 23 (inclusive).
 */
function daliyTime() {
  let currentTime = new Date();
  currentTime.getHours();
  let currenthours = currentTime.getHours();
  switch (true) {
    case currenthours >= 0 && currenthours < 12:
      document.getElementById("time").innerHTML = "Good Morning";
      break;
    case currenthours >= 12 && currenthours < 17:
      document.getElementById("time").innerHTML = "Good Afternoon";
      break;
    case currenthours >= 17 && currenthours < 24:
      document.getElementById("time").innerHTML = "Good Evening";
      break;
  }
}

function fullNameSummary() {
  const fullName = sessionStorage.getItem("fullName") || "Guest";
  document.getElementById("fullName").textContent = fullName;
  daliyTime();
}
