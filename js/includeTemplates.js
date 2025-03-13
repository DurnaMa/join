class IncludeHTML extends HTMLElement {
  async connectedCallback() {
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
    } catch (error) {
      if (this.isConnected) {
        this.innerHTML = 'Page not found';
      }
      console.error(error);
    }
  }
}

customElements.define('include-html', IncludeHTML);
