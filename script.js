/**
 * Skywalking.dev - Main JavaScript File
 * Modern, interactive website with smooth animations and accessibility
 */

class SkywalkingWebsite {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupIntersectionObserver();
        this.setupSmoothScrolling();
        this.setupMobileNavigation();
        this.setupContactForm();
        this.setupParallaxEffects();
        this.setupTypingAnimation();

        // Initialize once DOM is loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.initializeAnimations();
            });
        } else {
            this.initializeAnimations();
        }
    }

    /**
     * Setup main event listeners
     */
    setupEventListeners() {
        // Navigation scroll effect
        window.addEventListener('scroll', this.throttle(this.handleNavScroll.bind(this), 10));

        // Resize handler
        window.addEventListener('resize', this.debounce(this.handleResize.bind(this), 250));

        // Keyboard navigation
        document.addEventListener('keydown', this.handleKeyboardNavigation.bind(this));

        // Performance: Preload critical resources
        this.preloadResources();
    }

    /**
     * Navigation scroll effect with performance optimization
     */
    handleNavScroll() {
        const nav = document.querySelector('.nav');
        const scrollY = window.scrollY;

        if (scrollY > 50) {
            nav.classList.add('nav-scrolled');
            nav.style.background = 'rgba(0, 10, 21, 0.95)';
            nav.style.backdropFilter = 'blur(25px)';
        } else {
            nav.classList.remove('nav-scrolled');
            nav.style.background = 'rgba(0, 10, 21, 0.9)';
            nav.style.backdropFilter = 'blur(20px)';
        }
    }

    /**
     * Intersection Observer for scroll animations
     */
    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');

                    // Animate child elements with stagger effect
                    this.animateChildren(entry.target);
                }
            });
        }, observerOptions);

        // Observe elements for animation
        const animateElements = document.querySelectorAll(`
            .value-card, .service-card, .process-step, .case-card,
            .hero-stats, .stack-category, .founder-card
        `);

        animateElements.forEach(el => {
            el.classList.add('animate-element');
            observer.observe(el);
        });
    }

    /**
     * Animate child elements with stagger effect
     */
    animateChildren(parent) {
        const children = parent.querySelectorAll('.stack-item, .service-features li, .step-deliverables li');

        children.forEach((child, index) => {
            setTimeout(() => {
                child.style.opacity = '1';
                child.style.transform = 'translateY(0) scale(1)';
            }, index * 100);
        });
    }

    /**
     * Smooth scrolling for navigation links
     */
    setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));

                if (target) {
                    const offsetTop = target.offsetTop - 80; // Account for fixed nav

                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });

                    // Update active nav item
                    this.updateActiveNavItem(anchor.getAttribute('href'));
                }
            });
        });
    }

    /**
     * Update active navigation item
     */
    updateActiveNavItem(href) {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });

        const activeLink = document.querySelector(`a[href="${href}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }

    /**
     * Mobile navigation functionality
     */
    setupMobileNavigation() {
        const mobileToggle = document.getElementById('navMobile');
        const navLinks = document.querySelector('.nav-links');

        if (mobileToggle) {
            mobileToggle.addEventListener('click', () => {
                mobileToggle.classList.toggle('active');
                navLinks.classList.toggle('mobile-active');

                // Animate mobile menu
                if (navLinks.classList.contains('mobile-active')) {
                    navLinks.style.display = 'flex';
                    navLinks.style.position = 'fixed';
                    navLinks.style.top = '70px';
                    navLinks.style.left = '0';
                    navLinks.style.right = '0';
                    navLinks.style.background = 'var(--bg-secondary)';
                    navLinks.style.flexDirection = 'column';
                    navLinks.style.padding = '2rem';
                    navLinks.style.zIndex = '999';
                    navLinks.style.animation = 'slideDown 0.3s ease-out';
                } else {
                    navLinks.style.animation = 'slideUp 0.3s ease-out';
                    setTimeout(() => {
                        navLinks.style.display = '';
                        navLinks.style.position = '';
                        navLinks.style.top = '';
                        navLinks.style.left = '';
                        navLinks.style.right = '';
                        navLinks.style.background = '';
                        navLinks.style.flexDirection = '';
                        navLinks.style.padding = '';
                        navLinks.style.zIndex = '';
                    }, 300);
                }
            });

            // Close mobile menu on link click
            navLinks.addEventListener('click', (e) => {
                if (e.target.classList.contains('nav-link')) {
                    mobileToggle.classList.remove('active');
                    navLinks.classList.remove('mobile-active');
                }
            });
        }
    }

    /**
     * Contact form functionality with validation
     */
    setupContactForm() {
        const form = document.getElementById('contactForm');

        if (form) {
            form.addEventListener('submit', async (e) => {
                e.preventDefault();

                const formData = new FormData(form);
                const data = Object.fromEntries(formData);

                if (this.validateForm(data)) {
                    await this.submitForm(data);
                }
            });

            // Real-time validation
            const inputs = form.querySelectorAll('input, select, textarea');
            inputs.forEach(input => {
                input.addEventListener('blur', () => {
                    this.validateField(input);
                });

                input.addEventListener('input', () => {
                    if (input.classList.contains('error')) {
                        this.validateField(input);
                    }
                });
            });
        }
    }

    /**
     * Form validation
     */
    validateForm(data) {
        let isValid = true;
        const errors = {};

        // Required fields validation
        const requiredFields = ['nombre', 'empresa', 'email', 'whatsapp', 'proceso'];

        requiredFields.forEach(field => {
            if (!data[field] || data[field].trim() === '') {
                errors[field] = 'Este campo es requerido';
                isValid = false;
            }
        });

        // Email validation
        if (data.email && !this.isValidEmail(data.email)) {
            errors.email = 'Email inválido';
            isValid = false;
        }

        // Phone validation
        if (data.whatsapp && !this.isValidPhone(data.whatsapp)) {
            errors.whatsapp = 'Formato de teléfono inválido';
            isValid = false;
        }

        this.displayErrors(errors);
        return isValid;
    }

    /**
     * Validate individual field
     */
    validateField(input) {
        const value = input.value.trim();
        let isValid = true;
        let errorMessage = '';

        // Remove existing error styles
        input.classList.remove('error');
        const existingError = input.parentNode.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }

        // Validation logic
        if (input.required && !value) {
            errorMessage = 'Este campo es requerido';
            isValid = false;
        } else if (input.type === 'email' && value && !this.isValidEmail(value)) {
            errorMessage = 'Email inválido';
            isValid = false;
        } else if (input.name === 'whatsapp' && value && !this.isValidPhone(value)) {
            errorMessage = 'Formato de teléfono inválido';
            isValid = false;
        }

        if (!isValid) {
            input.classList.add('error');
            const errorElement = document.createElement('span');
            errorElement.className = 'error-message';
            errorElement.textContent = errorMessage;
            errorElement.style.color = 'var(--accent-tertiary)';
            errorElement.style.fontSize = 'var(--font-size-xs)';
            errorElement.style.marginTop = '0.25rem';
            input.parentNode.appendChild(errorElement);
        }

        return isValid;
    }

    /**
     * Display form errors
     */
    displayErrors(errors) {
        // Clear previous errors
        document.querySelectorAll('.error-message').forEach(el => el.remove());
        document.querySelectorAll('.error').forEach(el => el.classList.remove('error'));

        // Display new errors
        Object.keys(errors).forEach(field => {
            const input = document.querySelector(`[name="${field}"]`);
            if (input) {
                input.classList.add('error');
                const errorElement = document.createElement('span');
                errorElement.className = 'error-message';
                errorElement.textContent = errors[field];
                errorElement.style.color = 'var(--accent-tertiary)';
                errorElement.style.fontSize = 'var(--font-size-xs)';
                errorElement.style.marginTop = '0.25rem';
                input.parentNode.appendChild(errorElement);
            }
        });
    }

    /**
     * Submit form (placeholder for actual implementation)
     */
    async submitForm(data) {
        const submitButton = document.querySelector('.form-submit');
        const originalText = submitButton.innerHTML;

        // Show loading state
        submitButton.innerHTML = 'Enviando... <div class="spinner"></div>';
        submitButton.disabled = true;

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Success message
            this.showNotification('¡Formulario enviado exitosamente! Te contactaremos pronto.', 'success');
            document.getElementById('contactForm').reset();

        } catch (error) {
            this.showNotification('Error al enviar el formulario. Inténtalo de nuevo.', 'error');
        } finally {
            // Restore button
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
        }
    }

    /**
     * Show notification
     */
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;

        // Styling
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '1rem 1.5rem',
            borderRadius: 'var(--radius-md)',
            color: 'white',
            fontSize: 'var(--font-size-sm)',
            zIndex: '10000',
            maxWidth: '400px',
            boxShadow: 'var(--shadow-lg)',
            animation: 'slideInRight 0.3s ease-out'
        });

        if (type === 'success') {
            notification.style.background = 'linear-gradient(135deg, #10b981, #059669)';
        } else if (type === 'error') {
            notification.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
        } else {
            notification.style.background = 'var(--gradient-primary)';
        }

        document.body.appendChild(notification);

        // Auto remove
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }, 5000);
    }

    /**
     * Parallax effects for orbs
     */
    setupParallaxEffects() {
        const orbs = document.querySelectorAll('.gradient-orb');

        window.addEventListener('scroll', this.throttle(() => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;

            orbs.forEach((orb, index) => {
                const speed = 0.5 + (index * 0.2);
                orb.style.transform = `translateY(${rate * speed}px) rotate(${scrolled * 0.05}deg)`;
            });
        }, 16)); // 60fps
    }

    /**
     * Typing animation for hero title
     */
    setupTypingAnimation() {
        const highlight = document.querySelector('.hero-title .highlight');
        if (highlight) {
            const text = highlight.textContent;
            highlight.textContent = '';
            highlight.style.borderRight = '2px solid var(--accent-primary)';

            let i = 0;
            const typeWriter = () => {
                if (i < text.length) {
                    highlight.textContent += text.charAt(i);
                    i++;
                    setTimeout(typeWriter, 100);
                } else {
                    // Remove cursor after typing
                    setTimeout(() => {
                        highlight.style.borderRight = 'none';
                    }, 1000);
                }
            };

            // Start typing after a delay
            setTimeout(typeWriter, 1000);
        }
    }

    /**
     * Initialize animations and effects
     */
    initializeAnimations() {
        // Add CSS for animations
        this.addAnimationStyles();

        // Counter animations
        this.animateCounters();

        // Stagger animations for hero stats
        this.staggerHeroStats();
    }

    /**
     * Add dynamic CSS animations
     */
    addAnimationStyles() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideDown {
                from { opacity: 0; transform: translateY(-20px); }
                to { opacity: 1; transform: translateY(0); }
            }

            @keyframes slideUp {
                from { opacity: 1; transform: translateY(0); }
                to { opacity: 0; transform: translateY(-20px); }
            }

            @keyframes slideInRight {
                from { opacity: 0; transform: translateX(100px); }
                to { opacity: 1; transform: translateX(0); }
            }

            @keyframes slideOutRight {
                from { opacity: 1; transform: translateX(0); }
                to { opacity: 0; transform: translateX(100px); }
            }

            .animate-element {
                opacity: 0;
                transform: translateY(30px);
                transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
            }

            .animate-element.animate-in {
                opacity: 1;
                transform: translateY(0);
            }

            .spinner {
                display: inline-block;
                width: 12px;
                height: 12px;
                border: 2px solid transparent;
                border-top: 2px solid currentColor;
                border-radius: 50%;
                animation: spin 1s linear infinite;
                margin-left: 8px;
            }

            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }

            .nav-mobile.active span:nth-child(1) {
                transform: rotate(45deg) translate(6px, 6px);
            }

            .nav-mobile.active span:nth-child(2) {
                opacity: 0;
            }

            .nav-mobile.active span:nth-child(3) {
                transform: rotate(-45deg) translate(6px, -6px);
            }

            .form-group input.error,
            .form-group select.error,
            .form-group textarea.error {
                border-color: var(--accent-tertiary);
                box-shadow: 0 0 0 2px rgba(245, 158, 11, 0.2);
            }
        `;
        document.head.appendChild(style);
    }

    /**
     * Animate counters/numbers
     */
    animateCounters() {
        const counters = document.querySelectorAll('.stat-number, .metric-value');

        const observerOptions = {
            threshold: 0.7
        };

        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                    entry.target.classList.add('counted');
                    this.animateNumber(entry.target);
                }
            });
        }, observerOptions);

        counters.forEach(counter => {
            counterObserver.observe(counter);
        });
    }

    /**
     * Animate individual number
     */
    animateNumber(element) {
        const text = element.textContent;
        const number = parseFloat(text.replace(/[^\d.-]/g, ''));

        if (isNaN(number)) return;

        const suffix = text.replace(/[\d.-]/g, '');
        const duration = 2000;
        const steps = 60;
        const increment = number / steps;

        let current = 0;
        let step = 0;

        const timer = setInterval(() => {
            current += increment;
            step++;

            if (step >= steps) {
                current = number;
                clearInterval(timer);
            }

            element.textContent = Math.floor(current) + suffix;
        }, duration / steps);
    }

    /**
     * Stagger hero stats animation
     */
    staggerHeroStats() {
        const stats = document.querySelectorAll('.stat-item');

        stats.forEach((stat, index) => {
            stat.style.opacity = '0';
            stat.style.transform = 'translateY(20px)';
            stat.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';

            setTimeout(() => {
                stat.style.opacity = '1';
                stat.style.transform = 'translateY(0)';
            }, 1500 + (index * 200));
        });
    }

    /**
     * Keyboard navigation support
     */
    handleKeyboardNavigation(e) {
        // ESC key closes mobile menu
        if (e.key === 'Escape') {
            const mobileToggle = document.getElementById('navMobile');
            const navLinks = document.querySelector('.nav-links');

            if (navLinks.classList.contains('mobile-active')) {
                mobileToggle.classList.remove('active');
                navLinks.classList.remove('mobile-active');
            }
        }

        // Tab navigation enhancement
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    }

    /**
     * Handle window resize
     */
    handleResize() {
        // Reset mobile menu on desktop
        if (window.innerWidth > 768) {
            const mobileToggle = document.getElementById('navMobile');
            const navLinks = document.querySelector('.nav-links');

            if (mobileToggle && navLinks) {
                mobileToggle.classList.remove('active');
                navLinks.classList.remove('mobile-active');
            }
        }
    }

    /**
     * Preload critical resources
     */
    preloadResources() {
        // Preload hero background image if any
        const criticalImages = [];

        criticalImages.forEach(src => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = src;
            document.head.appendChild(link);
        });
    }

    /**
     * Utility functions
     */

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    isValidPhone(phone) {
        const phoneRegex = /^\+\d{1,3}\s?\d{1,3}\s?\d{2,4}\s?\d{4,8}$/;
        return phoneRegex.test(phone.replace(/[-\s()]/g, ''));
    }

    throttle(func, limit) {
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

    debounce(func, wait) {
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
}

// Initialize website functionality
new SkywalkingWebsite();

// Performance monitoring
if ('performance' in window) {
    window.addEventListener('load', () => {
        const perfData = performance.getEntriesByType('navigation')[0];
        const loadTime = perfData.loadEventEnd - perfData.loadEventStart;

        // Log performance data (for development)
        console.log(`Page load time: ${loadTime}ms`);
        console.log(`DOM content loaded: ${perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart}ms`);

        // Track Core Web Vitals if supported
        if ('PerformanceObserver' in window) {
            try {
                const observer = new PerformanceObserver((entryList) => {
                    const entries = entryList.getEntries();
                    entries.forEach((entry) => {
                        console.log(`${entry.name}: ${entry.value}`);
                    });
                });

                observer.observe({ entryTypes: ['paint', 'largest-contentful-paint'] });
            } catch (e) {
                // Fallback for older browsers
            }
        }
    });
}

// Service Worker registration for PWA capabilities (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment when you create a service worker
        // navigator.serviceWorker.register('/sw.js')
        //     .then((registration) => {
        //         console.log('SW registered: ', registration);
        //     })
        //     .catch((registrationError) => {
        //         console.log('SW registration failed: ', registrationError);
        //     });
    });
}