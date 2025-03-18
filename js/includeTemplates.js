class IncludeHTML extends HTMLElement {
  async connectedCallback() {

    setTimeout(async () => {
    const file = this.getAttribute('src');
    try {
      const response = await fetch(file);
      if (!response.ok) throw new Error(`Failed to fetch ${file}: ${response.statusText}`);

      if (this.isConnected) {
        this.innerHTML = await response.text();
      }

      if (file.includes('sidebar') || file.includes('footerMobile')) {
        highlightNavItem();
      }

      if (file.includes('header')) {
        headerinitials();
      }

      if (file.includes('headerMobile')) {
        headerInitialsMobile();
      }

    } catch (error) {
      if (this.isConnected) {
        this.innerHTML = 'Page not found';
      }
      console.error(error);
    }
  }, 10);
  }
}

customElements.define('include-html', IncludeHTML);

// function headerinitials() {
//   const initials = sessionStorage.getItem("userInitials") || "";
//   document.getElementById("initials").textContent = initials;
// }
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

// function headerInitialsMobile() {
//   const initials = sessionStorage.getItem("userInitials") || "";
//   document.getElementById("initialsMobile").textContent = initials;
// }

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