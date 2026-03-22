/**
 * TELA DESIGN - Main Script (Light Theme Version)
 * Handles Scroll Animations and Header State
 */

document.addEventListener('DOMContentLoaded', () => {

    /* --------------------------------------------------------------------------
       SCROLL REVEAL ANIMATIONS
       -------------------------------------------------------------------------- */
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: Stop observing once revealed for one-time animation
                observer.unobserve(entry.target);
            }
        });
    };
    
    const revealOptions = {
        root: null,
        rootMargin: '0px 0px -100px 0px', // Trigger slightly before it comes into view
        threshold: 0.1
    };
    
    const revealObserver = new IntersectionObserver(revealCallback, revealOptions);
    
    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    /* --------------------------------------------------------------------------
       HEADER SCROLL EFFECT
       -------------------------------------------------------------------------- */
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });    /* --------------------------------------------------------------------------
       THEME SWITCHER
       -------------------------------------------------------------------------- */
    const themeSwitch = document.getElementById('theme-switch');
    if (themeSwitch) {
        const currentTheme = localStorage.getItem('theme');
        if (currentTheme) {
            document.documentElement.setAttribute('data-theme', currentTheme);
            if (currentTheme === 'dark') {
                themeSwitch.checked = true;
            }
        }

        themeSwitch.addEventListener('change', function(e) {
            if (e.target.checked) {
                document.documentElement.setAttribute('data-theme', 'dark');
                document.body.className = 'dark-theme';
                localStorage.setItem('theme', 'dark');
            } else {
                document.documentElement.setAttribute('data-theme', 'light');
                document.body.className = 'light-theme';
                localStorage.setItem('theme', 'light');
            }
        });
    }

});
