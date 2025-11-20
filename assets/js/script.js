const hamburger = document.getElementById('hamburger');
const hamburgerMenu = document.getElementById('hamburgerMenu');

hamburger.addEventListener('click', () => {
    hamburgerMenu.classList.toggle('open');   // Menü öffnen/schließen
    hamburger.classList.toggle('active');     // Hamburger → X Animation
});

const links = document.querySelectorAll('.hamburger-link');
const currentPage = window.location.pathname.split('/').pop(); 

links.forEach(link => {
    if (link.getAttribute('href') === currentPage) {
        link.classList.add('active');
    }
});
