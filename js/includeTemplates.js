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

      headerinitials();

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

function headerinitials() {
  const initials = sessionStorage.getItem("userInitials") || "";
  document.getElementById("initials").textContent = initials;
}