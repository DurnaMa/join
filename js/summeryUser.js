/**
 * Updates the inner HTML of the element with the ID "time" to display a greeting
 * based on the current time of day.
 *
 * - "Good Morning" for hours between 0 and 11 (inclusive).
 * - "Good Afternoon" for hours between 12 and 16 (inclusive).
 * - "Good Evening" for hours between 17 and 23 (inclusive).
 */
// function dailyTime() {
//   let currentTime = new Date();
//   let currentHours = currentTime.getHours();
//   let greeting = "";

//   if (currentHours >= 4 && currentHours < 6) {
//     greeting = "Early morning!";
//   } else if (currentHours >= 6 && currentHours < 10) {
//     greeting = "Good morning!";
//   } else if (currentHours >= 10 && currentHours < 12) {
//     greeting = "Good morning/Hello!";
//   } else if (currentHours >= 12 && currentHours < 13) {
//     greeting = "Hello!";
//   } else if (currentHours >= 13 && currentHours < 17) {
//     greeting = "Good afternoon!";
//   } else if (currentHours >= 17 && currentHours < 19) {
//     greeting = "Good evening/Hello!";
//   } else if (currentHours >= 19 && currentHours < 22) {
//     greeting = "Good evening!";
//   } else {
//     greeting = "Good night!";
//   }

//   document.getElementById("time").innerHTML = greeting;
// }

// function fullNameSummary() {
//   const fullName = sessionStorage.getItem("fullName") || "Guest";
//   document.getElementById("fullName").textContent = fullName;
//   daliyTime();
// }
