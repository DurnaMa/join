document.addEventListener("click", function(event) {
    const mobileOptions = document.getElementById("mobileToggleOptions");
    const toggleButton = document.querySelector(".mobileOptionsButton img");
  
    if (!mobileOptions.classList.contains("hidden")) {
          if (!mobileOptions.contains(event.target) && event.target !== toggleButton) {
            mobileOptions.classList.add("hidden");
        }
    }});