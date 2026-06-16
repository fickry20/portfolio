/*==================== MENU SHOW Y HIDDEN ====================*/
const navMenu = document.getElementById('nav-menu'),
    navToggle = document.getElementById('nav-toggle'),
    navLinks = document.querySelectorAll('.nav__link')

/*===== MENU SHOW =====*/
/* Validate if constant exists */
if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('show-menu')
    })
}

/*===== REMOVE MENU MOBILE =====*/
function linkAction() {
    if (navMenu) {
        navMenu.classList.remove('show-menu')
    }
}
navLinks.forEach(n => n.addEventListener('click', linkAction))

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

function scrollActive() {
    const scrollY = window.pageYOffset

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 58
        const sectionId = current.getAttribute('id')
        const navLinkElement = document.querySelector('.nav__menu a[href*=' + sectionId + ']')

        if (navLinkElement) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinkElement.classList.add('active-link')
            } else {
                navLinkElement.classList.remove('active-link')
            }
        }
    })
}
window.addEventListener('scroll', scrollActive)

/*==================== DARK LIGHT THEME ====================*/
const themeButton = document.getElementById('theme-button')
const lightTheme = 'light-theme'
const iconTheme = 'bx-moon'

// Previously selected theme (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// We obtain the current theme that the interface has by validating the light-theme class
const getCurrentTheme = () => document.body.classList.contains(lightTheme) ? 'light' : 'dark'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'bx-moon' : 'bx-sun'

// We validate if the user previously chose a theme
if (selectedTheme) {
    // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the light theme
    document.body.classList[selectedTheme === 'light' ? 'add' : 'remove'](lightTheme)
    themeButton.classList[selectedIcon === 'bx-moon' ? 'add' : 'remove'](iconTheme)
    if (selectedTheme === 'light') {
        themeButton.classList.remove('bx-sun')
    } else {
        themeButton.classList.add('bx-sun')
    }
}

// Activate / deactivate the theme manually with the button
if (themeButton) {
    themeButton.addEventListener('click', () => {
        // Add or remove the light / icon theme
        document.body.classList.toggle(lightTheme)
        themeButton.classList.toggle(iconTheme)
        themeButton.classList.toggle('bx-sun')
        // We save the theme and the current icon that the user chose
        localStorage.setItem('selected-theme', getCurrentTheme())
        localStorage.setItem('selected-icon', getCurrentIcon())
    })
}

/*==================== TYPING EFFECT ====================*/
const words = ["Logistics Specialist", "IT Student"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typedTextElement = document.getElementById("typed-text");

function typeEffect() {
    if (!typedTextElement) return;
    const currentWord = words[wordIndex];

    if (isDeleting) {
        typedTextElement.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typedTextElement.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }

    let typingSpeed = 100;
    if (isDeleting) {
        typingSpeed /= 2; // Delete faster
    }

    if (!isDeleting && charIndex === currentWord.length) {
        typingSpeed = 2000; // Pause at full word
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typingSpeed = 500; // Pause before typing next word
    }

    setTimeout(typeEffect, typingSpeed);
}
document.addEventListener("DOMContentLoaded", typeEffect);


/*==================== CERTIFICATE LIGHTBOX MODAL ====================*/
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');
const lightboxClose = document.getElementById('lightbox-close');
const certCards = document.querySelectorAll('.certificate__card');

certCards.forEach(card => {
    card.addEventListener('click', () => {
        const img = card.querySelector('.certificate__img-box img');
        const name = card.querySelector('.certificate__name');

        if (img && lightbox && lightboxImg && lightboxCaption) {
            lightboxImg.src = img.src;
            lightboxCaption.textContent = name.textContent;
            lightbox.classList.add('active');
        }
    });
});

if (lightboxClose) {
    lightboxClose.addEventListener('click', () => {
        lightbox.classList.remove('active');
    });
}

if (lightbox) {
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
        }
    });
}

// Close lightbox on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox && lightbox.classList.contains('active')) {
        lightbox.classList.remove('active');
    }
});

/*==================== SCROLL REVEAL ANIMATION ====================*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 1800,
    delay: 150,
    reset: false
});

sr.reveal('.home__data, .about__img-box, .section-title, .contact__info-box', {});
sr.reveal('.home__img-wrapper, .about__data, .contact__form-box', { delay: 300 });
sr.reveal('.timeline', { delay: 200, interval: 100 });
sr.reveal('.skills__categories, .certificates__filters', { delay: 100 });
sr.reveal('.skills__item, .project__card, .certificate__card', { interval: 80 });
