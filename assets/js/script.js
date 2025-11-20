const hamburger = document.getElementById('hamburger');
const hamburgerMenu = document.getElementById('hamburgerMenu');

hamburger.addEventListener('click', () => {
    hamburgerMenu.classList.toggle('open');   // Menü öffnen/schließen
    hamburger.classList.toggle('active');     // Hamburger → X Animation
});

document.addEventListener('DOMContentLoaded', () => {
  // Wähle die Link-Selectoren, die du markieren willst
  const selectors = ['.hotbar-link', '.hotbar-link-join-us', '.hamburger-link', '.cosmical-logo-link'];
  const links = document.querySelectorAll(selectors.join(','));

  // Hilfsfunktion: normalisiere einen Pfad (kein trailing slash, index.html entfernt)
  function normalizePath(path) {
    try {
      // Falls path ist relativer Pfad wie "../assets", new URL braucht base; verwenden location.origin
      const url = new URL(path, location.origin);
      let p = url.pathname;

      // Wenn du GitHub Pages mit repo name hast, kannst du optional base entfernen:
      // const repoBase = '/Cosmical-Website'; p = p.replace(repoBase, '') 

      // Entferne /index.html am Ende
      p = p.replace(/\/index\.html$/i, '');
      // Entferne trailing slash (außer wenn root "/")
      if (p.length > 1) p = p.replace(/\/$/, '');
      return p;
    } catch (e) {
      return path; // fallback
    }
  }

  const current = normalizePath(location.pathname);

  links.forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;

    const normalizedHref = normalizePath(href);

    // Sonderfall: Logo-Link zur Root ("/" oder full URL)
    if (normalizedHref === '' || normalizedHref === '/') {
      if (current === '' || current === '/') {
        link.classList.add('active');
      }
      return;
    }

    // Wenn die Pfade genau übereinstimmen -> aktiv
    if (normalizedHref === current) {
      link.classList.add('active');
      return;
    }

    // Optional: Vergleiche nur letzte Segment (z.B. "/allies" vs "/somepath/allies")
    const curLast = current.split('/').filter(Boolean).pop() || '';
    const hrefLast = normalizedHref.split('/').filter(Boolean).pop() || '';
    if (curLast && hrefLast && curLast === hrefLast) {
      link.classList.add('active');
    }
  });
});

