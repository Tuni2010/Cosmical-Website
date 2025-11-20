
    const hamburger = document.getElementById("hamburger");
    const menu = document.getElementById("hamburgerMenu");
    const closeBtn = document.querySelector(".close-button");

    // Menü öffnen
    hamburger.addEventListener("click", () => {
        menu.classList.add("open");
    });

    // Menü schließen
    closeBtn.addEventListener("click", () => {
        menu.classList.remove("open");
    });


