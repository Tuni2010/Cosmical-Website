
const links = document.querySelectorAll('.hotbar-link');
links.forEach(link => {
    if (link.href === window.location.href) {
        link.classList.add('active');
    }
});

