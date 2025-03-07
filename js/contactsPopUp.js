document.addEventListener("click", function(event) {
    const mobileOptions = document.getElementById("mobileToggleOptions");
    const toggleButton = document.querySelector(".mobileOptionsButton img");
  
    // Prüfen, ob mobileOptions sichtbar ist
    if (!mobileOptions.classList.contains("hidden")) {
        // Prüfen, ob der Klick außerhalb des Menüs und außerhalb des Buttons erfolgt ist
        if (!mobileOptions.contains(event.target) && event.target !== toggleButton) {
            mobileOptions.classList.add("hidden"); // Menü schließen
        }
    }});