/**
 * MARGARETA Portfolio - Interactive Scripts
 * Creates floating photos animation with even distribution
 */

// Photo file names from the fotky folder
const photoFiles = [
    '000023790004.jpg',
    '000023790007.jpg',
    '000023790008.jpg',
    '000023790010.jpg',
    '000023790017.jpg',
    '000023790027.jpg',
    '000023790029.jpg',
    '000023800020.jpg',
    '000023800026.jpg',
    '000023800027.jpg',
    '000023800029.jpg',
    '000023800031.jpg',
    '000023800032.jpg',
    '000023800035.jpg',
    '000023800036.jpg',
    '000059750002.jpg',
    '000059750003.jpg',
    '000059750004.jpg',
    '000059750005.jpg',
    '000059750007.jpg',
    '000059750009.jpg',
    '000059750011.jpg',
    '000059750013.jpg',
    '000059750021.jpg',
    '000059750023.jpg',
    '000059750025.jpg',
    '000059750026.jpg',
    '000059750029.jpg',
    '000059750031.jpg',
    '000059770004.jpg',
    '000059770006.jpg',
    '000059770007.jpg',
    '000059770008.jpg',
    '000059770010.jpg',
    '000059770012.jpg',
    '000059770014.jpg',
    '000059770015.jpg',
    '000059770016.jpg',
    '000059770018.jpg',
    '000059770019.jpg',
    '000059770020.jpg',
    '000059770021.jpg',
    '000059770025.jpg',
    '000059770027.jpg',
    '000059770034.jpg'
];

// Configuration
const CONFIG = {
    rows: 4,           // Number of rows for distribution
    cols: 6,           // Number of columns for timing waves
    photoWidth: 130,
    photoHeight: 170,
    baseSpeed: 32,     // Base animation duration in seconds
    speedVariation: 6  // Small variation for consistent movement
};

/**
 * Initialize floating photos with even distribution across viewport
 */
function initFloatingPhotos() {
    const container = document.getElementById('floatingPhotos');
    if (!container) return;

    const viewportHeight = window.innerHeight;

    // Calculate row height for even vertical distribution
    const rowHeight = viewportHeight / CONFIG.rows;

    let photoIndex = 0;

    // Create photos distributed evenly in rows with staggered timing
    for (let row = 0; row < CONFIG.rows; row++) {
        for (let col = 0; col < CONFIG.cols; col++) {
            // Skip roughly 25% of positions for natural spacing
            if ((row + col) % 4 === 3) continue;

            createFloatingPhoto(container, row, col, rowHeight, photoIndex);
            photoIndex = (photoIndex + 1) % photoFiles.length;
        }
    }
}

/**
 * Create a single floating photo element with even distribution
 */
function createFloatingPhoto(container, row, col, rowHeight, photoIndex) {
    const photo = document.createElement('div');
    photo.className = 'floating-photo';

    const viewportHeight = window.innerHeight;

    // Calculate vertical position - center in the row with slight randomness
    const rowCenter = row * rowHeight + (rowHeight / 2) - (CONFIG.photoHeight / 2);
    const maxOffset = rowHeight * 0.25; // Allow 25% variation within the row
    const randomOffset = (Math.random() - 0.5) * maxOffset;
    const top = Math.max(20, Math.min(viewportHeight - CONFIG.photoHeight - 20, rowCenter + randomOffset));

    // Stagger animation delays - each column starts at different time
    // This creates a wave effect from right to left
    const baseDelay = col * 5.5; // 5.5 seconds between each wave
    const rowOffset = row * 1.2; // Slight offset between rows
    const randomDelay = Math.random() * 2; // Small random variation
    const delay = baseDelay + rowOffset + randomDelay;

    // Consistent animation duration with small variation
    const duration = CONFIG.baseSpeed + (Math.random() * CONFIG.speedVariation);

    // Slight size variation for natural look
    const sizeScale = 0.85 + Math.random() * 0.3;
    const width = CONFIG.photoWidth * sizeScale;
    const height = CONFIG.photoHeight * sizeScale;

    // Subtle rotation
    const rotation = (Math.random() - 0.5) * 6;

    // Alternate z-index based on row for depth effect
    const zIndex = row % 2 === 0 ? 1 : 2;

    // Set styles
    photo.style.cssText = `
        top: ${top}px;
        width: ${width}px;
        height: ${height}px;
        animation: floatRight ${duration}s linear infinite;
        animation-delay: -${delay}s;
        transform: rotate(${rotation}deg);
        z-index: ${zIndex};
    `;

    // Create image element
    const img = document.createElement('img');
    img.src = `fotky/${photoFiles[photoIndex]}`;
    img.alt = 'Portfolio photo';
    img.loading = 'lazy';

    photo.appendChild(img);
    container.appendChild(photo);
}

/**
 * Handle window resize
 */
function handleResize() {
    const container = document.getElementById('floatingPhotos');
    if (container) {
        container.innerHTML = '';
        initFloatingPhotos();
    }
}

/**
 * Smooth scroll for navigation
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/**
 * Parallax effect for hero content
 */
function initParallax() {
    const heroContent = document.querySelector('.hero-content');

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroHeight = document.querySelector('.hero').offsetHeight;

        if (scrolled < heroHeight) {
            const opacity = 1 - (scrolled / heroHeight) * 1.5;
            const translateY = scrolled * 0.3;

            heroContent.style.opacity = Math.max(0, opacity);
            heroContent.style.transform = `translateY(${translateY}px)`;
        }
    });
}

/**
 * Intersection Observer for scroll animations
 */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe sections
    document.querySelectorAll('.section-title, .about-description, .gallery-item, .service-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Add CSS for animation class
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);

/**
 * Initialize everything when DOM is ready
 */
document.addEventListener('DOMContentLoaded', () => {
    initFloatingPhotos();
    initSmoothScroll();
    initParallax();
    initScrollAnimations();
});

// Debounced resize handler
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(handleResize, 250);
});
