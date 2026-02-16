// =============================================
// Sweden Working Holiday - Interactive Features
// =============================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // =============================================
    // Navigation
    // =============================================
    
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Mobile menu toggle
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
    
    // Navbar scroll effect
    let lastScroll = 0;
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
    
    // =============================================
    // Smooth Scrolling and Active Navigation
    // =============================================
    
    // Smooth scroll for anchor links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navHeight = navbar.offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Update active navigation link on scroll
    const sections = document.querySelectorAll('section[id]');
    
    function updateActiveNav() {
        const scrollPosition = window.scrollY + 150;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNav);
    
    // =============================================
    // Intersection Observer for Animations
    // =============================================
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for fade-in animation
    const animateElements = document.querySelectorAll(
        '.destination-card, .food-category, .season-card, .about-text, .about-image'
    );
    
    animateElements.forEach(element => {
        observer.observe(element);
    });
    
    // =============================================
    // Destination Cards Hover Effect
    // =============================================
    
    const destinationCards = document.querySelectorAll('.destination-card');
    
    destinationCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // =============================================
    // Food Items Interactive Effect
    // =============================================
    
    const foodItems = document.querySelectorAll('.food-item');
    
    foodItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.food-icon');
            icon.style.transform = 'scale(1.1) rotate(5deg)';
        });
        
        item.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.food-icon');
            icon.style.transform = 'scale(1) rotate(0deg)';
        });
    });
    
    // =============================================
    // Season Cards Click to Expand (Mobile Friendly)
    // =============================================
    
    const seasonCards = document.querySelectorAll('.season-card');
    
    seasonCards.forEach(card => {
        const header = card.querySelector('.season-header');
        const content = card.querySelector('.season-content');
        
        // Add click handler for mobile devices
        if (window.innerWidth <= 768) {
            content.style.maxHeight = '0';
            content.style.overflow = 'hidden';
            content.style.transition = 'max-height 0.3s ease';
            
            header.style.cursor = 'pointer';
            header.addEventListener('click', function() {
                const isExpanded = card.classList.contains('expanded');
                
                if (isExpanded) {
                    content.style.maxHeight = '0';
                    card.classList.remove('expanded');
                } else {
                    content.style.maxHeight = content.scrollHeight + 'px';
                    card.classList.add('expanded');
                }
            });
        }
    });
    
    // =============================================
    // Scroll to Top on Logo Click
    // =============================================
    
    const navLogo = document.querySelector('.nav-logo');
    
    navLogo.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    navLogo.style.cursor = 'pointer';
    
    // =============================================
    // Stats Counter Animation
    // =============================================
    
    function animateValue(element, start, end, duration, suffix = '') {
        const range = end - start;
        const increment = range / (duration / 16);
        let current = start;
        
        const timer = setInterval(function() {
            current += increment;
            if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
                current = end;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current).toLocaleString() + suffix;
        }, 16);
    }
    
    // Animate stats when they come into view
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumbers = document.querySelectorAll('.stat-number');
                
                // Only animate once
                if (!entry.target.classList.contains('animated')) {
                    entry.target.classList.add('animated');
                    
                    // Example animations - adjust based on your content
                    if (statNumbers[0]) {
                        statNumbers[0].textContent = '1,000万';
                    }
                    if (statNumbers[1]) {
                        statNumbers[1].textContent = '24h';
                    }
                    if (statNumbers[2]) {
                        statNumbers[2].textContent = '-30°C';
                    }
                }
                
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
        statsObserver.observe(heroStats);
    }
    
    // =============================================
    // Parallax Effect for Hero Section
    // =============================================
    
    const hero = document.querySelector('.hero');
    
    if (hero) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const parallaxSpeed = 0.5;
            
            if (scrolled < hero.offsetHeight) {
                hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
            }
        });
    }
    
    // =============================================
    // Image Placeholder Click Handler (Optional)
    // =============================================
    
    const imagePlaceholders = document.querySelectorAll('.image-placeholder');
    
    imagePlaceholders.forEach(placeholder => {
        placeholder.addEventListener('click', function() {
            // You can add functionality here if needed
            // For example, opening a lightbox or modal
            console.log('Image placeholder clicked');
        });
    });
    
    // =============================================
    // Responsive Menu - Window Resize Handler
    // =============================================
    
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            // Reset mobile menu on desktop
            if (window.innerWidth > 768) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
            
            // Reset season cards expansion on desktop
            seasonCards.forEach(card => {
                const content = card.querySelector('.season-content');
                if (window.innerWidth > 768) {
                    content.style.maxHeight = 'none';
                    card.classList.remove('expanded');
                }
            });
        }, 250);
    });
    
    // =============================================
    // Console Welcome Message
    // =============================================
    
    console.log('%cWelcome to Sweden Working Holiday! 🇸🇪', 
        'color: #667eea; font-size: 20px; font-weight: bold;');
    console.log('%cDiscover the beauty of Nordic life', 
        'color: #4a7c9e; font-size: 14px;');
    
    // =============================================
    // Performance Optimization - Lazy Loading
    // =============================================
    
    // Add loading="lazy" to images if browser supports it
    if ('loading' in HTMLImageElement.prototype) {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            img.loading = 'lazy';
        });
    }
    
    // =============================================
    // Accessibility Improvements
    // =============================================
    
    // Add keyboard navigation for cards
    const interactiveCards = document.querySelectorAll('.destination-card, .season-card');
    
    interactiveCards.forEach(card => {
        card.setAttribute('tabindex', '0');
        
        card.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                this.click();
            }
        });
    });
    
    // Announce page changes to screen readers
    const announcer = document.createElement('div');
    announcer.setAttribute('aria-live', 'polite');
    announcer.setAttribute('aria-atomic', 'true');
    announcer.className = 'sr-only';
    announcer.style.position = 'absolute';
    announcer.style.left = '-10000px';
    announcer.style.width = '1px';
    announcer.style.height = '1px';
    announcer.style.overflow = 'hidden';
    document.body.appendChild(announcer);
    
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            const sectionName = this.textContent;
            announcer.textContent = `${sectionName}セクションに移動しました`;
        });
    });
    
    // =============================================
    // Initial Load Animation
    // =============================================
    
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        // Trigger initial animations
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.animation = 'fadeIn 1s ease forwards';
        }
    });
    
});

// =============================================
// Utility Functions
// =============================================

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}