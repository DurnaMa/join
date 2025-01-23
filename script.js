const BASE_URL = "https://join-7f1d9-default-rtdb.europe-west1.firebasedatabase.app/";

let contacts = [];

function init() {
  includeHTML();
  
}


function goBack() {
  const referrer = document.referrer;
  if (referrer) {
    window.location.href = referrer;
  } else {
    window.location.href = "index.html";
  }
}