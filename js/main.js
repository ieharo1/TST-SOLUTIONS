// Splash Screen
(function() {
    const splashScreen = document.getElementById('splashScreen');
    const splashText = document.getElementById('splashText');
    const splashParticles = document.getElementById('splashParticles');
    const hasSeenSplash = localStorage.getItem('tst_splash_seen');

    if (!hasSeenSplash) {
        document.body.classList.add('splash-active');
        
        // Create particles
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 3 + 's';
            particle.style.animationDuration = (2 + Math.random() * 2) + 's';
            splashParticles.appendChild(particle);
        }

        // Animate text letter by letter
        const text = 'TST SOLUTIONS';
        let delay = 0;
        text.split('').forEach((letter, index) => {
            const span = document.createElement('span');
            span.textContent = letter;
            span.style.animationDelay = (0.1 + delay) + 's';
            if (letter === ' ') span.style.width = '15px';
            splashText.appendChild(span);
            delay += 0.08;
        });

        // Hide splash after animation
        setTimeout(() => {
            splashScreen.classList.add('hidden');
            document.body.classList.remove('splash-active');
            localStorage.setItem('tst_splash_seen', 'true');
        }, 5000);
    } else {
        splashScreen.classList.add('hidden');
    }
})();

// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileNav = document.getElementById('mobileNav');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-links a');

mobileMenuBtn.addEventListener('click', () => {
    mobileNav.classList.toggle('active');
    mobileMenuBtn.innerHTML = mobileNav.classList.contains('active')
        ? '<i class="fas fa-times"></i>'
        : '<i class="fas fa-bars"></i>';
});

mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileNav.classList.remove('active');
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// Header scroll effect
const header = document.getElementById('header');
const scrollProgress = document.getElementById('scrollProgress');

window.addEventListener('scroll', () => {
    // Header effect
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    // Scroll progress
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    scrollProgress.style.width = scrolled + "%";

    // Update active nav link
    updateActiveNavLink();
});

// Update active navigation link
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a, .mobile-nav-links a');

    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;

        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = '#' + section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentSection) {
            link.classList.add('active');
        }
    });
}

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Initialize
updateActiveNavLink();