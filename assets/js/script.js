/**
 * Cosmical Clan Website - Main JavaScript
 * Handles navigation, hamburger menu, and active link highlighting
 */

'use strict';

// ============================================
// HAMBURGER MENU FUNCTIONALITY
// ============================================
function initHamburgerMenu() {
    const hamburger = document.getElementById('hamburger');
    const hamburgerMenu = document.getElementById('hamburgerMenu');
    
    if (!hamburger || !hamburgerMenu) {
        console.warn('Hamburger menu elements not found');
        return;
    }
    
    // Toggle menu on click
    hamburger.addEventListener('click', () => {
        const isOpen = hamburgerMenu.classList.toggle('open');
        hamburger.classList.toggle('active');
        
        // Update ARIA attributes for accessibility
        hamburger.setAttribute('aria-expanded', isOpen);
        hamburger.setAttribute('aria-label', isOpen ? 'Menü schließen' : 'Menü öffnen');
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = isOpen ? 'hidden' : '';
    });
    
    // Close menu when clicking on a link
    const menuLinks = hamburgerMenu.querySelectorAll('.hamburger-link');
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburgerMenu.classList.remove('open');
            hamburger.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
            hamburger.setAttribute('aria-label', 'Menü öffnen');
            document.body.style.overflow = '';
        });
    });
    
    // Close menu on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && hamburgerMenu.classList.contains('open')) {
            hamburgerMenu.classList.remove('open');
            hamburger.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
            hamburger.setAttribute('aria-label', 'Menü öffnen');
            document.body.style.overflow = '';
            hamburger.focus(); // Return focus to button
        }
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (hamburgerMenu.classList.contains('open') && 
            !hamburgerMenu.contains(e.target) && 
            !hamburger.contains(e.target)) {
            hamburgerMenu.classList.remove('open');
            hamburger.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
            hamburger.setAttribute('aria-label', 'Menü öffnen');
            document.body.style.overflow = '';
        }
    });
}

// ============================================
// ACTIVE LINK HIGHLIGHTING
// ============================================
function initActiveLinkHighlighting() {
    // Select all navigation links
    const selectors = [
        '.hotbar-link', 
        '.hamburger-link', 
        '.cosmical-logo-link'
    ];
    const links = document.querySelectorAll(selectors.join(','));
    
    if (links.length === 0) {
        console.warn('No navigation links found');
        return;
    }
    
    /**
     * Normalize URL path by removing trailing slashes and index.html
     * @param {string} path - URL path to normalize
     * @returns {string} Normalized path
     */
    function normalizePath(path) {
        try {
            // Create URL object with current origin as base
            const url = new URL(path, window.location.origin);
            let pathname = url.pathname;
            
            // Remove /index.html at the end
            pathname = pathname.replace(/\/index\.html$/i, '');
            
            // Remove trailing slash (except for root "/")
            if (pathname.length > 1) {
                pathname = pathname.replace(/\/$/, '');
            }
            
            return pathname;
        } catch (error) {
            console.error('Error normalizing path:', error);
            return path;
        }
    }
    
    // Get current normalized path
    const currentPath = normalizePath(window.location.pathname);
    
    // Check each link and add 'active' class if it matches
    links.forEach(link => {
        const href = link.getAttribute('href');
        if (!href) return;
        
        const normalizedHref = normalizePath(href);
        
        // Special case: Logo link to root
        if (normalizedHref === '' || normalizedHref === '/') {
            if (currentPath === '' || currentPath === '/') {
                link.classList.add('active');
                if (link.hasAttribute('aria-current')) {
                    link.setAttribute('aria-current', 'page');
                }
            }
            return;
        }
        
        // Exact path match
        if (normalizedHref === currentPath) {
            link.classList.add('active');
            if (link.hasAttribute('aria-current')) {
                link.setAttribute('aria-current', 'page');
            }
            return;
        }
        
        // Optional: Compare last segment for partial matching
        const currentSegment = currentPath.split('/').filter(Boolean).pop() || '';
        const hrefSegment = normalizedHref.split('/').filter(Boolean).pop() || '';
        
        if (currentSegment && hrefSegment && currentSegment === hrefSegment) {
            link.classList.add('active');
            if (link.hasAttribute('aria-current')) {
                link.setAttribute('aria-current', 'page');
            }
        }
    });
}



// ============================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#"
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Update URL without scrolling
                history.pushState(null, null, href);
                
                // Set focus for accessibility
                target.setAttribute('tabindex', '-1');
                target.focus();
            }
        });
    });
}

// ============================================
// LAZY LOADING FOR IMAGES
// ============================================
function initLazyLoading() {
    // Check if Intersection Observer is supported
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    
                    // Load the image
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    
                    // Add loaded class for animations
                    img.classList.add('loaded');
                    
                    // Stop observing this image
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px'
        });
        
        // Observe all images with data-src attribute
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    } else {
        // Fallback: load all images immediately
        document.querySelectorAll('img[data-src]').forEach(img => {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
        });
    }
}

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    try {
        initHamburgerMenu();
        initActiveLinkHighlighting();
        initSmoothScroll();
        initLazyLoading();
        
        console.log('✓ Cosmical Clan website initialized successfully');
    } catch (error) {
        console.error('Error initializing website:', error);
    }
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Page is hidden - close mobile menu if open
        const hamburgerMenu = document.getElementById('hamburgerMenu');
        const hamburger = document.getElementById('hamburger');
        
        if (hamburgerMenu && hamburgerMenu.classList.contains('open')) {
            hamburgerMenu.classList.remove('open');
            if (hamburger) {
                hamburger.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
            }
            document.body.style.overflow = '';
        }
    }
});

const triggers = document.querySelectorAll('.left-timeline-box, .right-timeline-box');
const targets = document.querySelectorAll('.timeline-image');

triggers.forEach((trigger, index) => {
  trigger.addEventListener('mouseenter', () => {
    targets[index].classList.add('active');
  });

  trigger.addEventListener('mouseleave', () => {
    targets[index].classList.remove('active');
  });
});
