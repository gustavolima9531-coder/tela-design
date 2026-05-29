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
        rootMargin: '0px 0px -50px 0px', // Trigger slightly before it comes into view
        threshold: 0.05
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

    /* --------------------------------------------------------------------------
       PORTFOLIO 3D SLIDER LOGIC
       -------------------------------------------------------------------------- */
    const items = document.querySelectorAll('.portfolio-item');
    const nextBtn = document.querySelector('.next-btn');
    const prevBtn = document.querySelector('.prev-btn');
    let currentIndex = 0;

    function updateSlider() {
        items.forEach((item, index) => {
            item.className = 'portfolio-item'; // Reset classes
            
            if (index === currentIndex) {
                item.classList.add('active');
            } else if (index === (currentIndex + 1) % items.length) {
                item.classList.add('next');
            } else if (index === (currentIndex - 1 + items.length) % items.length) {
                item.classList.add('prev');
            } else if (index > currentIndex) {
                item.classList.add('next-hidden');
            } else {
                item.classList.add('prev-hidden');
            }
        });
    }

    if (nextBtn && prevBtn) {
        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % items.length;
            updateSlider();
        });

        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + items.length) % items.length;
            updateSlider();
        });
    }

    // Inicializa o estado dos cards
    updateSlider();

    /* --------------------------------------------------------------------------
       PORTFOLIO SLIDER DRAG/SWIPE LOGIC
       -------------------------------------------------------------------------- */
    let startX = 0;
    let isDragging = false;
    const portfolioContainer = document.querySelector('.portfolio-slider-container');

    if (portfolioContainer) {
        // Iniciar Arraste (Mouse)
        portfolioContainer.addEventListener('mousedown', (e) => {
            startX = e.pageX;
            isDragging = true;
            portfolioContainer.style.cursor = 'grabbing';
        });

        // Iniciar Arraste (Touch Mobile)
        portfolioContainer.addEventListener('touchstart', (e) => {
            startX = e.touches[0].pageX;
            isDragging = true;
        }, { passive: true });

        // Finalizar Arraste (Global)
        const endDrag = (endX) => {
            if (!isDragging) return;
            const diff = startX - endX;
            const threshold = 50; // Sensibilidade do arraste

            if (Math.abs(diff) > threshold) {
                if (diff > 0) {
                    currentIndex = (currentIndex + 1) % items.length;
                } else {
                    currentIndex = (currentIndex - 1 + items.length) % items.length;
                }
                updateSlider();
            }
            
            isDragging = false;
            portfolioContainer.style.cursor = 'grab';
        };

        window.addEventListener('mouseup', (e) => {
            if (isDragging) endDrag(e.pageX);
        });

        portfolioContainer.addEventListener('touchend', (e) => {
            if (isDragging) endDrag(e.changedTouches[0].pageX);
        }, { passive: true });

        // Prevenir comportamento padrão de arraste de imagem
        portfolioContainer.addEventListener('dragstart', (e) => e.preventDefault());
        portfolioContainer.style.cursor = 'grab';
    }
    /* --------------------------------------------------------------------------
       VIDEO AUTO-PLAY ON SCROLL
       -------------------------------------------------------------------------- */
    const focusVideo = document.getElementById('focus-video');
    if (focusVideo) {
        const videoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    focusVideo.play().catch(error => {
                        console.log("Autoplay was prevented:", error);
                    });
                } else {
                    focusVideo.pause();
                }
            });
        }, { threshold: 0.5 }); // Inicia quando 50% do vídeo está visível

        videoObserver.observe(focusVideo);
    }

});
