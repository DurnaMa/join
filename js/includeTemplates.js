async function includeHTML() {
  let includeElements = document.querySelectorAll("[w3-include-html]");
  for (let i = 0; i < includeElements.length; i++) {
    const element = includeElements[i];
    file = element.getAttribute("w3-include-html"); // "includes/header.html"
    let resp = await fetch(file);
    if (resp.ok) {
      element.innerHTML = await resp.text();
    } else {
      element.innerHTML = "Page not found";
    }
  }
  headerinitials();
  headerInitialsMobile();
  highlightNavItem();
}

function headerinitials() {
  const initials = sessionStorage.getItem("userInitials") || "";
  setTimeout(() => {
    const initialsElement = document.getElementById("initials");
    if (initialsElement) {
      initialsElement.textContent = initials;
    } else {
      console.error("Fehler.");
    }
  }, 50);
}

function headerInitialsMobile() {
  const initials = sessionStorage.getItem("userInitials") || "";
  setTimeout(() => {
    const initialsElement = document.getElementById("initialsMobile");
    if (initialsElement) {
      initialsElement.textContent = initials;
    } else {
      console.error("Fehler.");
    }
  }, 50);
}
