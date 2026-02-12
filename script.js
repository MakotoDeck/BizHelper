// ============================================
// АНИМАЦИИ И ИНТЕРАКТИВНОСТЬ
// ============================================

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    initScrollAnimations();
    initNavbarScroll();
    initSmoothScroll();
    initParallax();
});

// ============================================
// АНИМАЦИИ ПРИ СКРОЛЛЕ
// ============================================

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Наблюдаем за всеми элементами с атрибутом data-aos
    const animatedElements = document.querySelectorAll('[data-aos]');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// ============================================
// ИЗМЕНЕНИЕ НАВБАРА ПРИ СКРОЛЛЕ
// ============================================

function initNavbarScroll() {
    const header = document.querySelector('.header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            header.style.background = 'rgba(15, 17, 23, 0.95)';
            header.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
        } else {
            header.style.background = 'rgba(15, 17, 23, 0.8)';
            header.style.boxShadow = 'none';
        }

        lastScroll = currentScroll;
    });
}

// ============================================
// ПЛАВНАЯ ПРОКРУТКА К ЯКОРЯМ
// ============================================

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

// ============================================
// ПАРАЛЛАКС ЭФФЕКТ ДЛЯ HERO СЕКЦИИ
// ============================================

function initParallax() {
    const hero = document.querySelector('.hero-modern');
    if (!hero) return;

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.5;

        if (hero) {
            hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        }
    });
}

// ============================================
// АНИМАЦИЯ ЧИСЕЛ В СТАТИСТИКЕ
// ============================================

function animateNumbers() {
    const stats = document.querySelectorAll('.stat-number');

    stats.forEach(stat => {
        const target = parseInt(stat.textContent);
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const updateNumber = () => {
            current += increment;
            if (current < target) {
                stat.textContent = Math.floor(current);
                requestAnimationFrame(updateNumber);
            } else {
                stat.textContent = target;
            }
        };

        // Запускаем анимацию когда элемент видим
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateNumber();
                    observer.unobserve(entry.target);
                }
            });
        });

        observer.observe(stat);
    });
}

// Запускаем анимацию чисел
animateNumbers();

// ============================================
// КУРСОР С ЭФФЕКТОМ (ОПЦИОНАЛЬНО)
// ============================================

function initCustomCursor() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    // Увеличение курсора при наведении на кнопки
    const interactiveElements = document.querySelectorAll('a, button, .problem-card-modern, .target-card-modern');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(1.5)';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
        });
    });
}

// Раскомментируйте для кастомного курсора
// initCustomCursor();

// ============================================
// ПРЕДЗАГРУЗКА ИЗОБРАЖЕНИЙ
// ============================================

function preloadImages() {
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

preloadImages();

// ============================================
// МОБИЛЬНОЕ МЕНЮ (для будущего расширения)
// ============================================

function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }
}

// ============================================
// TYPING ЭФФЕКТ ДЛЯ ЗАГОЛОВКА (ОПЦИОНАЛЬНО)
// ============================================

function initTypingEffect() {
    const element = document.querySelector('[data-typing]');
    if (!element) return;

    const text = element.textContent;
    element.textContent = '';
    let i = 0;

    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, 50);
        }
    }

    type();
}

// ============================================
// ПОДСВЕТКА АКТИВНОГО РАЗДЕЛА В НАВИГАЦИИ
// ============================================

function highlightActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });
}

highlightActiveSection();

// ============================================
// ЭФФЕКТ RIPPLE ПРИ КЛИКЕ НА КНОПКИ
// ============================================

function initRippleEffect() {
    const buttons = document.querySelectorAll('.btn-primary-modern, .btn-secondary-modern, .btn-cta-modern');

    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            this.appendChild(ripple);

            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';

            setTimeout(() => ripple.remove(), 600);
        });
    });
}

initRippleEffect();

// ============================================
// ЛОГИРОВАНИЕ ДЛЯ ОТЛАДКИ
// ============================================

console.log('%c✨ BizHelper Website Loaded Successfully! ✨', 'color: #FF4582; font-size: 16px; font-weight: bold;');
console.log('%cDesigned for Infomatrix 2026', 'color: #6C5CE7; font-size: 12px;');