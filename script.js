// Preloader
document.addEventListener('DOMContentLoaded', function() {
    const preloader = document.querySelector('.preloader');
    const progress = document.querySelector('.progress');
    const percentage = document.querySelector('.percentage');
    let width = 0;
    
    // Simulate loading progress
    const interval = setInterval(() => {
        if (width >= 100) {
            clearInterval(interval);
            // Add fade-out class to preloader
            preloader.classList.add('fade-out');
            // Remove preloader from DOM after animation
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        } else {
            width += 1;
            progress.style.width = width + '%';
            percentage.textContent = width + '%';
        }
    }, 20);
});

// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

// hamburger.addEventListener('click', () => {
//     navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
// });

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Form Validation
const contactForm = document.querySelector('.contact-form');
const newsletterForm = document.querySelector('.newsletter-form');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Show confirmation message
        contactForm.classList.add('show-confirmation');
        
        // Reset form
        contactForm.reset();
        
        // Hide confirmation message after 3 seconds and show form again
        setTimeout(() => {
            contactForm.classList.remove('show-confirmation');
        }, 3000);
    });
}

if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = this.querySelector('input[type="email"]').value;
        
        if (!email) {
            alert('Please enter your email address');
            return;
        }
        
        // Here you would typically send the email to your server
        alert('Thank you for subscribing to our newsletter!');
        this.reset();
    });
}

// Scroll Animation
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.service-card, .about-content, .contact-form').forEach(element => {
    observer.observe(element);
});

// Sticky Navigation
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.classList.remove('scroll-up');
        return;
    }
})
//     if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
//         // Scroll Down
//         navbar.classList.remove('scroll-up');
//         navbar.classList.add('scroll-down');
//     } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
//         // Scroll Up
//         navbar.classList.remove('scroll-down');
//         navbar.classList.add('scroll-up');
//     }
//     lastScroll = currentScroll;
// });); 

document.addEventListener('DOMContentLoaded', function() {
    const menuIcon = document.querySelector('.menu-icon');
    const nav = document.querySelector('.nav');
    const body = document.body;
    const menuLabel = document.querySelector('label[for="menu-icon"]');

    // Toggle menu when clicking the menu icon or label
    function toggleMenu() {
        menuIcon.checked = !menuIcon.checked;
        if (menuIcon.checked) {
            nav.classList.add('active');
            body.style.overflow = 'hidden';
        } else {
            nav.classList.remove('active');
            body.style.overflow = '';
        }
    }

    menuLabel.addEventListener('click', function(e) {
        e.preventDefault();
        toggleMenu();
    });

    // Close menu when clicking on a nav link
    const navLinks = document.querySelectorAll('.nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            menuIcon.checked = false;
            nav.classList.remove('active');
            body.style.overflow = '';
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!nav.contains(event.target) && 
            !menuIcon.contains(event.target) && 
            !menuLabel.contains(event.target) && 
            menuIcon.checked) {
            menuIcon.checked = false;
            nav.classList.remove('active');
            body.style.overflow = '';
        }
    });
});

// Counter Animation
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const start = 0;
    const increment = target / (duration / 16); // 60fps
    let current = start;

    const updateCounter = () => {
        current += increment;
        if (current < target) {
            // Check if this is the support counter (24)
            if (target === 24) {
                element.textContent = Math.floor(current) + '/7';
            } else {
                element.textContent = Math.floor(current) + '+';
            }
            requestAnimationFrame(updateCounter);
        } else {
            // Check if this is the support counter (24)
            if (target === 24) {
                element.textContent = target + '/7';
            } else {
                element.textContent = target + '+';
            }
        }
    };

    updateCounter();
}

// Intersection Observer for counter animation
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            animateCounter(counter);
            counterObserver.unobserve(counter);
        }
    });
}, {
    threshold: 0.5
});

// Observe all counter elements
document.querySelectorAll('.counter').forEach(counter => {
    counterObserver.observe(counter);
});

// Back to Top Button
const backToTopButton = document.getElementById('backToTop');

// Show/hide button based on scroll position
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.classList.add('visible');
    } else {
        backToTopButton.classList.remove('visible');
    }
});

// Smooth scroll to top when clicked
backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Lightning Cursor
const cursor = document.querySelector('.lightning-cursor');
let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateCursor() {
    const dx = mouseX - cursorX;
    const dy = mouseY - cursorY;
    
    cursorX += dx * 0.1;
    cursorY += dy * 0.1;
    
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';
    
    requestAnimationFrame(animateCursor);
}

animateCursor();

// Update copyright year
document.getElementById('current-year').textContent = new Date().getFullYear();


