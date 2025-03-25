document.addEventListener("click", function(event) {
    const mobileOptions = document.getElementById("mobileToggleOptions");
    /**
     * A reference to the image element inside the button with the class "mobileOptionsButton".
     * This element is used to toggle mobile options in the UI.
     * 
     * @type {HTMLImageElement | null}
     */
    const toggleButton = document.querySelector(".mobileOptionsButton img");
  
    if (!mobileOptions.classList.contains("hidden")) {
          if (!mobileOptions.contains(event.target) && event.target !== toggleButton) {
            mobileOptions.classList.add("hidden");
        }
    }});